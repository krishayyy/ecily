import { timingSafeEqual } from "crypto"
import { NextResponse } from "next/server"
import { LIMITS, sanitizeSite, type Site } from "@/lib/siteBuilder"

export function jsonError(error: string, status: number) {
  return NextResponse.json({ error }, { status, headers: { "Cache-Control": "no-store" } })
}

/** Reads and size-checks a JSON body, then rebuilds the site from it. */
export async function readSiteBody(req: Request): Promise<{ site: Site; body: Record<string, unknown> } | { error: NextResponse }> {
  const text = await req.text()
  if (text.length > LIMITS.siteBytes + 10_000) {
    return { error: jsonError("Your site is too big to publish. Try using fewer or smaller photos.", 413) }
  }
  let body: Record<string, unknown>
  try {
    body = JSON.parse(text)
  } catch {
    return { error: jsonError("That request didn't make sense.", 400) }
  }
  const site = sanitizeSite(body?.site)
  if (!site) return { error: jsonError("That doesn't look like a Website Maker site.", 400) }
  return { site, body }
}

export function bearer(req: Request): string {
  const h = req.headers.get("authorization") || ""
  return h.startsWith("Bearer ") ? h.slice(7).trim() : ""
}

/** SITES_ADMIN_TOKEN holder: can take sites down and review the gallery. */
export function isAdmin(token: string): boolean {
  const admin = process.env.SITES_ADMIN_TOKEN
  if (!admin || !token) return false
  const a = Buffer.from(token)
  const b = Buffer.from(admin)
  return a.length === b.length && timingSafeEqual(a, b)
}
