import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code")
  const supabase = createSupabaseServerClient()

  if (code && supabase) {
    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect(new URL("/research", request.url))
}
