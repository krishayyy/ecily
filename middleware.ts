import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/** mangohacks.ecily.org is the same Next app and the same deploy as ecily.org —
 *  visitors on that host get transparently routed to /mangohacks/* so the page
 *  lives at their root path instead of a subpath, with no visible redirect. */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || ""
  if (!host.startsWith("mangohacks.")) return NextResponse.next()

  const { pathname } = request.nextUrl
  if (pathname.startsWith("/mangohacks")) return NextResponse.next()

  const target = pathname === "/" ? "/mangohacks" : `/mangohacks${pathname}`
  return NextResponse.rewrite(new URL(target, request.url))
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
