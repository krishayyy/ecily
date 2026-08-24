import { NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export async function GET() {
  const supabase = createSupabaseServerClient()
  if (!supabase) return NextResponse.json({ searches: [] })

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ searches: [] })

  const { data, error } = await supabase
    .from("research_searches")
    .select("id, question, answer, sources, created_at")
    .order("created_at", { ascending: false })
    .limit(50)

  if (error) return NextResponse.json({ searches: [] })

  return NextResponse.json({ searches: data })
}
