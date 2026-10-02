// Storage for sites published from the Website Maker.
//
// Uses Upstash Redis over its REST API (plain fetch, no SDK), which works on
// both Vercel and Netlify. Set either pair of env vars:
//   UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN   (Upstash console)
//   KV_REST_API_URL        + KV_REST_API_TOKEN          (Vercel's Upstash integration)
//
// Without them, `next dev` keeps sites in memory so the feature can be tried
// locally; production refuses to publish rather than silently losing sites.

import { createHash, randomBytes, timingSafeEqual } from "crypto"
import type { Site } from "@/lib/siteBuilder"

export type StoredSite = {
  site: Site
  /** sha256 of the owner's edit token; the token itself is never stored. */
  tokenHash: string
  createdAt: number
  updatedAt: number
}

const REST_URL = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL
const REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN

export const storeConfigured = Boolean(REST_URL && REST_TOKEN) || process.env.NODE_ENV !== "production"

// ── Redis (or the dev stand-in) ──

type Cmd = (string | number)[]

const g = globalThis as unknown as { __ecilySites?: Map<string, { v: string; exp?: number }> }
const mem = (g.__ecilySites ??= new Map())

async function redis<T = unknown>(cmd: Cmd): Promise<T> {
  if (REST_URL && REST_TOKEN) {
    const res = await fetch(REST_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${REST_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify(cmd),
      cache: "no-store",
    })
    const data = (await res.json()) as { result?: T; error?: string }
    if (!res.ok || data.error) throw new Error(`redis ${cmd[0]}: ${data.error ?? res.status}`)
    return data.result as T
  }
  return memRedis(cmd) as T
}

/** Just the handful of commands this file uses. */
function memRedis([op, key, ...args]: Cmd): unknown {
  const k = String(key)
  const now = Date.now()
  const hit = mem.get(k)
  const live = hit && (!hit.exp || hit.exp > now) ? hit : undefined
  switch (op) {
    case "GET":
      return live?.v ?? null
    case "SET": {
      const flag = args[1]
      if (flag === "NX" && live) return null
      if (flag === "XX" && !live) return null
      mem.set(k, { v: String(args[0]) })
      return "OK"
    }
    case "DEL":
      return mem.delete(k) ? 1 : 0
    case "INCR": {
      const n = Number(live?.v ?? 0) + 1
      mem.set(k, { v: String(n), exp: live?.exp })
      return n
    }
    case "EXPIRE":
      if (live) live.exp = now + Number(args[0]) * 1000
      return live ? 1 : 0
  }
  throw new Error(`unsupported ${op}`)
}

// ── Tokens ──

export function newToken(): string {
  return randomBytes(24).toString("base64url")
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex")
}

export function tokenMatches(token: string, hash: string): boolean {
  const a = Buffer.from(hashToken(token), "hex")
  const b = Buffer.from(hash, "hex")
  return a.length === b.length && timingSafeEqual(a, b)
}

// ── Sites ──

const key = (slug: string) => `site:${slug}`

export async function getSite(slug: string): Promise<StoredSite | null> {
  const raw = await redis<string | null>(["GET", key(slug)])
  if (!raw) return null
  try {
    return JSON.parse(raw) as StoredSite
  } catch {
    return null
  }
}

/** Claims the slug. Returns false if someone already has it. */
export async function createSite(slug: string, record: StoredSite): Promise<boolean> {
  return (await redis(["SET", key(slug), JSON.stringify(record), "NX"])) === "OK"
}

export async function saveSite(slug: string, record: StoredSite): Promise<void> {
  await redis(["SET", key(slug), JSON.stringify(record), "XX"])
}

export async function deleteSite(slug: string): Promise<void> {
  await redis(["DEL", key(slug)])
}

// ── Slugs ──

export const SLUG_RE = /^[a-z0-9](?:[a-z0-9-]{1,38}[a-z0-9])$/

/** Names that could pass for official Ecily pages, or are just confusing. */
const RESERVED = new Set([
  "admin", "api", "app", "build", "chapter", "chapters", "contact", "donate", "ecily", "ecily-org",
  "help", "login", "mangohacks", "official", "privacy", "security", "signin", "signup", "staff",
  "support", "team", "terms", "verify", "www",
])

export function slugProblem(slug: string): string | null {
  if (!SLUG_RE.test(slug)) return "Use 3–40 lowercase letters, numbers, or dashes."
  if (RESERVED.has(slug) || slug.startsWith("ecily")) return "That address is reserved. Try another."
  return null
}

// ── Rate limiting (fixed one-hour window per IP) ──

export async function overLimit(bucket: string, ip: string, max: number): Promise<boolean> {
  const k = `rl:${bucket}:${ip}:${Math.floor(Date.now() / 3_600_000)}`
  const n = await redis<number>(["INCR", k])
  if (n === 1) await redis(["EXPIRE", k, 3600])
  return n > max
}

export function clientIp(headers: Headers): string {
  return (
    headers.get("x-nf-client-connection-ip") ||
    headers.get("x-real-ip") ||
    headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    "unknown"
  )
}
