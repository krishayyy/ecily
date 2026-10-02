import { NextResponse } from "next/server"
import { bearer, isAdmin, jsonError, readSiteBody } from "@/lib/siteApi"
import {
  SLUG_RE,
  clientIp,
  deleteSite,
  getSite,
  overLimit,
  requestedStatus,
  saveSite,
  storeConfigured,
  syncGallery,
  tokenMatches,
} from "@/lib/siteStore"

export const dynamic = "force-dynamic"

type Ctx = { params: { slug: string } }

/** The editable site JSON, used when someone opens their edit link. Same content the public page shows. */
export async function GET(req: Request, { params }: Ctx) {
  if (!storeConfigured) return jsonError("Publishing isn't switched on yet.", 503)
  if (!SLUG_RE.test(params.slug)) return jsonError("Not found.", 404)
  const record = await getSite(params.slug)
  if (!record) return jsonError("That site doesn't exist anymore.", 404)
  // Gallery review status is only the owner's business.
  const owner = tokenMatches(bearer(req), record.tokenHash)
  return NextResponse.json(
    { site: record.site, updatedAt: record.updatedAt, ...(owner ? { gallery: record.gallery ?? null } : {}) },
    { headers: { "Cache-Control": "no-store" } },
  )
}

/** Update a published site. Needs the edit token handed out at publish time. */
export async function PUT(req: Request, { params }: Ctx) {
  if (!storeConfigured) return jsonError("Publishing isn't switched on yet.", 503)
  try {
    if (!SLUG_RE.test(params.slug)) return jsonError("Not found.", 404)
    const parsed = await readSiteBody(req)
    if ("error" in parsed) return parsed.error

    if (await overLimit("update", clientIp(req.headers), 600)) {
      return jsonError("Too many updates this hour. Take a break and try again soon.", 429)
    }

    const record = await getSite(params.slug)
    if (!record) return jsonError("That site doesn't exist anymore. Publish it again to get a new link.", 404)
    if (!tokenMatches(bearer(req), record.tokenHash)) return jsonError("This browser can't edit that site.", 403)

    const updatedAt = Date.now()
    const next = { ...record, site: parsed.site, updatedAt }
    await saveSite(params.slug, next)
    await syncGallery(params.slug, next)
    return NextResponse.json({ slug: params.slug, updatedAt, gallery: next.gallery ?? null })
  } catch (e) {
    console.error("[sites] update failed", e)
    return jsonError("Couldn't update right now. Try again in a minute.", 500)
  }
}

/** Opt in to (or out of) the community gallery. Body: { gallery: boolean } */
export async function PATCH(req: Request, { params }: Ctx) {
  if (!storeConfigured) return jsonError("Publishing isn't switched on yet.", 503)
  try {
    if (!SLUG_RE.test(params.slug)) return jsonError("Not found.", 404)
    let want: unknown
    try {
      want = (await req.json())?.gallery
    } catch {
      /* handled below */
    }
    if (typeof want !== "boolean") return jsonError("That request didn't make sense.", 400)
    const record = await getSite(params.slug)
    if (!record) return jsonError("That site doesn't exist anymore.", 404)
    if (!tokenMatches(bearer(req), record.tokenHash)) return jsonError("This browser can't edit that site.", 403)

    const next = { ...record, gallery: requestedStatus(record.gallery, want) }
    await saveSite(params.slug, next)
    await syncGallery(params.slug, next)
    return NextResponse.json({ slug: params.slug, gallery: next.gallery ?? null })
  } catch (e) {
    console.error("[sites] gallery toggle failed", e)
    return jsonError("Couldn't change that right now. Try again in a minute.", 500)
  }
}

/** Unpublish. The owner's edit token works, and so does SITES_ADMIN_TOKEN for takedowns. */
export async function DELETE(req: Request, { params }: Ctx) {
  if (!storeConfigured) return jsonError("Publishing isn't switched on yet.", 503)
  try {
    if (!SLUG_RE.test(params.slug)) return jsonError("Not found.", 404)
    const record = await getSite(params.slug)
    if (!record) return NextResponse.json({ ok: true })
    const token = bearer(req)
    if (!isAdmin(token) && !tokenMatches(token, record.tokenHash)) return jsonError("Not allowed.", 403)
    await deleteSite(params.slug)
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error("[sites] delete failed", e)
    return jsonError("Couldn't unpublish right now. Try again in a minute.", 500)
  }
}
