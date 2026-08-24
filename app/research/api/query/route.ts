import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { searchSemanticScholar } from "@/lib/research/semanticScholar"
import { searchOpenAlex } from "@/lib/research/openAlex"
import { searchCredibleWeb } from "@/lib/research/webSearch"
import { synthesizeAnswerStream, synthesisUnavailableReason } from "@/lib/research/synthesize"
import { dedupeSources, type Source } from "@/lib/research/types"
import { getCachedSources, setCachedSources, isRateLimited } from "@/lib/research/cache"
import { createSupabaseServerClient } from "@/lib/supabase/server"

function sseFrame(event: string, data: unknown) {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`
}

function clientIdFor(request: NextRequest) {
  return request.headers.get("x-nf-client-connection-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
}

async function getSources(question: string): Promise<Source[]> {
  const cached = getCachedSources<Source[]>(question)
  if (cached) return cached

  const [openAlex, semanticScholar, web] = await Promise.all([
    searchOpenAlex(question),
    searchSemanticScholar(question),
    searchCredibleWeb(question),
  ])

  const sources = [...dedupeSources([...openAlex, ...semanticScholar]), ...web]
  setCachedSources(question, sources)
  return sources
}

export async function POST(request: NextRequest) {
  if (isRateLimited(clientIdFor(request))) {
    return NextResponse.json({ error: "Too many questions in a short window — try again in a few minutes." }, { status: 429 })
  }

  const { question, history } = await request.json()

  if (typeof question !== "string" || question.trim().length < 4) {
    return NextResponse.json({ error: "Ask a real question — a few words at least." }, { status: 400 })
  }
  if (question.length > 500) {
    return NextResponse.json({ error: "Keep the question under 500 characters." }, { status: 400 })
  }

  const priorTurns = Array.isArray(history)
    ? history.filter((t: any) => typeof t?.question === "string" && typeof t?.answer === "string").slice(-3)
    : []

  const sources = await getSources(question)
  const unavailableReason = synthesisUnavailableReason(sources)

  const supabase = createSupabaseServerClient()

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder()
      const send = (event: string, data: unknown) => controller.enqueue(encoder.encode(sseFrame(event, data)))

      send("sources", { sources })

      let fullAnswer = ""
      try {
        if (unavailableReason) {
          fullAnswer = unavailableReason
          send("token", { text: unavailableReason })
        } else {
          for await (const delta of synthesizeAnswerStream(question, sources, priorTurns)) {
            fullAnswer += delta
            send("token", { text: delta })
          }
        }
      } catch {
        send("error", { message: "Synthesis failed midway — try asking again." })
        controller.close()
        return
      }

      if (supabase && !unavailableReason) {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (user) {
          await supabase.from("research_searches").insert({ user_id: user.id, question, answer: fullAnswer, sources })
        }
      }

      send("done", {})
      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}
