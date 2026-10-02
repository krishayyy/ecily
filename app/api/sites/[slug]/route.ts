import { timingSafeEqual } from "crypto"
import { NextResponse } from "next/server"
import { bearer, jsonError, readSiteBody } from "@/lib/siteApi"
import { SLUG_RE, clientIp, deleteSite, getSite, overLimit, saveSite, storeConfigured, tokenMatches } from "@/lib/siteStore"

export const dynamic = "force-dynamic"

type Ctx = { params: { slug: string } }

function isAdmin(token: string): boolean {
  const admin = process.env.SITES_ADMIN_TOKEN
  if (!admin || !token) return false
  const a = Buffer.from(token)
  const b = Buffer.from(admin)
  return a.length === b.length && timingSafeEqual(a, b)
}

/** The editable site JSON, used when someone opens their edit link. Same content the public page shows. */
export async function GET(_req: Request, { params }: Ctx) {
  if (!storeConfigured) return jsonError("Publishing isn't switched on yet.", 503)
  if (!SLUG_RE.test(params.slug)) return jsonError("Not found.", 404)
  const record = await getSite(params.slug)
  if (!record) return jsonError("That site doesn't exist anymore.", 404)
  return NextResponse.json(
    { site: record.site, updatedAt: record.updatedAt },
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
    await saveSite(params.slug, { ...record, site: parsed.site, updatedAt })
    return NextResponse.json({ slug: params.slug, updatedAt })
  } catch (e) {
    console.error("[sites] update failed", e)
    return jsonError("Couldn't update right now. Try again in a minute.", 500)
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
