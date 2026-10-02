import { CONTACT_EMAIL } from "@/lib/program"
import { renderSite } from "@/lib/siteBuilder"
import { SLUG_RE, getSite } from "@/lib/siteStore"

export const dynamic = "force-dynamic"

// Published pages are user content on our domain, so lock them down hard:
// no scripts, no forms, no framing elsewhere. The renderer already escapes
// everything; this is the second wall.
const HEADERS = {
  "Content-Type": "text/html; charset=utf-8",
  "Content-Security-Policy": [
    "default-src 'none'",
    "img-src https: data:",
    "style-src 'unsafe-inline' https://fonts.googleapis.com",
    "font-src https://fonts.gstatic.com",
    "base-uri 'none'",
    "form-action 'none'",
    "frame-ancestors 'self'",
  ].join("; "),
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  // Keeps spammers from using ecily.org's reputation for search ranking.
  "X-Robots-Tag": "noindex",
}

function notFound(): Response {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Site not found</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#080808;color:#f5f3ee;font:16px/1.6 system-ui,sans-serif;text-align:center;padding:24px}a{color:#c9a96e}</style></head>
<body><div><h1 style="font-weight:600">There's no site here.</h1><p>It may have been unpublished.</p><p><a href="/build">Make your own website →</a></p></div></body></html>`
  return new Response(html, { status: 404, headers: { ...HEADERS, "Cache-Control": "no-store" } })
}

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  if (!SLUG_RE.test(params.slug)) return notFound()
  let record
  try {
    record = await getSite(params.slug)
  } catch (e) {
    console.error("[sites] load failed", e)
    return new Response("Something went wrong loading this site. Try again in a minute.", { status: 503 })
  }
  if (!record) return notFound()

  const subject = encodeURIComponent(`Report: ecily.org/s/${params.slug}`)
  const html = renderSite(record.site, { reportHref: `mailto:${CONTACT_EMAIL}?subject=${subject}` })
  return new Response(html, {
    headers: {
      ...HEADERS,
      // Short CDN cache: updates show up within ~30s without hitting Redis on every view.
      "Cache-Control": "public, max-age=0, s-maxage=30",
    },
  })
}
