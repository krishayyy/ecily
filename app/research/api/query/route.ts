import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { searchSemanticScholar } from "@/lib/research/semanticScholar"
import { searchCredibleWeb } from "@/lib/research/webSearch"
import { synthesizeAnswer } from "@/lib/research/synthesize"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  const { question, history } = await request.json()

  if (typeof question !== "string" || question.trim().length < 4) {
    return NextResponse.json({ error: "Ask a real question — a few words at least." }, { status: 400 })
  }
  if (question.length > 500) {
    return NextResponse.json({ error: "Keep the question under 500 characters." }, { status: 400 })
  }

  const priorTurns = Array.isArray(history)
    ? history
        .filter((t: any) => typeof t?.question === "string" && typeof t?.answer === "string")
        .slice(-3)
    : []

  const [academic, web] = await Promise.all([
    searchSemanticScholar(question),
    searchCredibleWeb(question),
  ])

  const sources = [...academic, ...web]
  const answer = await synthesizeAnswer(question, sources, priorTurns)

  // Best-effort save — signed-out users, or a DB hiccup, shouldn't block the answer.
  const supabase = createSupabaseServerClient()
  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user) {
      await supabase.from("research_searches").insert({
        user_id: user.id,
        question,
        answer,
        sources,
      })
    }
  }

  return NextResponse.json({ answer, sources })
}
