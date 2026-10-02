import { NextResponse } from "next/server"
import { jsonError, readSiteBody } from "@/lib/siteApi"
import { clientIp, createSite, hashToken, newToken, overLimit, slugProblem, storeConfigured } from "@/lib/siteStore"

export const dynamic = "force-dynamic"

/** Publish a new site. Anyone can do this; no account, just a secret edit token back. */
export async function POST(req: Request) {
  if (!storeConfigured) return jsonError("Publishing isn't switched on yet. You can still download your site.", 503)
  try {
    const parsed = await readSiteBody(req)
    if ("error" in parsed) return parsed.error
    const { site, body } = parsed

    const slug = String(body.slug ?? "").trim().toLowerCase()
    const problem = slugProblem(slug)
    if (problem) return jsonError(problem, 400)

    // Per IP, and a whole classroom often shares one school IP, so keep this roomy.
    if (await overLimit("create", clientIp(req.headers), 60)) {
      return jsonError("You've published a lot of sites this hour. Try again later.", 429)
    }

    const token = newToken()
    const now = Date.now()
    const claimed = await createSite(slug, { site, tokenHash: hashToken(token), createdAt: now, updatedAt: now })
    if (!claimed) return jsonError("Someone already has that address. Try another.", 409)

    return NextResponse.json({ slug, token, path: `/s/${slug}` }, { status: 201 })
  } catch (e) {
    console.error("[sites] publish failed", e)
    return jsonError("Couldn't publish right now. Try again in a minute.", 500)
  }
}
