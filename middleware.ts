import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/** mangohacks.ecily.org and research.ecily.org are the same Next app and the
 *  same deploy as ecily.org — visitors on those hosts get transparently routed
 *  to /mangohacks/* or /research/* so the page lives at their root path
 *  instead of a subpath, with no visible redirect. */
const SUBDOMAIN_ROUTES: Record<string, string> = {
  "mangohacks.": "/mangohacks",
  "research.": "/research",
}

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || ""
  const prefix = Object.keys(SUBDOMAIN_ROUTES).find((p) => host.startsWith(p))
  if (!prefix) return NextResponse.next()

  const base = SUBDOMAIN_ROUTES[prefix]
  const { pathname } = request.nextUrl
  if (pathname.startsWith(base)) return NextResponse.next()

  const target = pathname === "/" ? base : `${base}${pathname}`
  return NextResponse.rewrite(new URL(target, request.url))
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
