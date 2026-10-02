import { NextResponse } from "next/server"
import { bearer, isAdmin, jsonError } from "@/lib/siteApi"
import { SLUG_RE, approve, deleteSite, getSite, listGallery, reject, storeConfigured } from "@/lib/siteStore"

export const dynamic = "force-dynamic"

/** Review queue / approved list for the gallery admin page. */
export async function GET(req: Request) {
  if (!storeConfigured) return jsonError("Publishing isn't switched on yet.", 503)
  if (!isAdmin(bearer(req))) return jsonError("Wrong admin key.", 403)
  const url = new URL(req.url)
  const which = url.searchParams.get("status") === "approved" ? "approved" : "pending"
  const offset = Math.max(0, Number(url.searchParams.get("offset")) || 0)
  const result = await listGallery(which, offset, 60)
  return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } })
}

/** Body: { slug, action: "approve" | "reject" | "takedown" } */
export async function POST(req: Request) {
  if (!storeConfigured) return jsonError("Publishing isn't switched on yet.", 503)
  if (!isAdmin(bearer(req))) return jsonError("Wrong admin key.", 403)
  try {
    const { slug, action } = (await req.json()) as { slug?: string; action?: string }
    if (!slug || !SLUG_RE.test(slug)) return jsonError("Not found.", 404)
    const record = await getSite(slug)
    if (!record) return jsonError("That site doesn't exist anymore.", 404)
    if (action === "approve") await approve(slug, record)
    else if (action === "reject") await reject(slug, record)
    else if (action === "takedown") await deleteSite(slug)
    else return jsonError("Unknown action.", 400)
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error("[gallery] admin action failed", e)
    return jsonError("Something went wrong. Try again.", 500)
  }
}
