"use client"

import { useState, useRef, useEffect } from "react"
import { GraduationCap } from "lucide-react"
import { Sidebar, type SavedSearch } from "@/components/research/Sidebar"
import { ChatInput } from "@/components/research/ChatInput"
import { AnswerView } from "@/components/research/AnswerView"
import { consumeSSE } from "@/lib/research/sse"
import type { Source } from "@/lib/research/types"

interface Turn {
  id: string
  question: string
  answer: string
  sources: Source[]
  loading: boolean
}

const STARTERS = [
  "What caused the fall of the Roman Empire?",
  "How does CRISPR gene editing actually work?",
  "What are the leading theories on why we dream?",
  "How did the Cold War shape the space race?",
]

export default function ResearchPage() {
  const [turns, setTurns] = useState<Turn[]>([])
  const [activeSavedId, setActiveSavedId] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [turns])

  async function ask(question: string) {
    setError(null)
    setActiveSavedId(null)
    const id = crypto.randomUUID()
    const priorTurns = turns.filter((t) => !t.loading)
    setTurns((prev) => [...prev, { id, question, answer: "", sources: [], loading: true }])

    try {
      const res = await fetch("/research/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          history: priorTurns.map((t) => ({ question: t.question, answer: t.answer })),
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error || "Something went wrong.")
        setTurns((prev) => prev.filter((t) => t.id !== id))
        return
      }

      let sawToken = false
      await consumeSSE(res, {
        onSources: (sources) => {
          setTurns((prev) => prev.map((t) => (t.id === id ? { ...t, sources: sources as Source[] } : t)))
        },
        onToken: (text) => {
          sawToken = true
          setTurns((prev) =>
            prev.map((t) => (t.id === id ? { ...t, answer: t.answer + text, loading: false } : t)),
          )
        },
        onError: (message) => {
          setError(message)
        },
        onDone: () => {
          setRefreshKey((k) => k + 1)
        },
      })

      if (!sawToken) {
        setTurns((prev) => prev.map((t) => (t.id === id ? { ...t, loading: false } : t)))
      }
    } catch {
      setError("Couldn't reach the server. Try again.")
      setTurns((prev) => prev.filter((t) => t.id !== id))
    }
  }

  function startNew() {
    setTurns([])
    setActiveSavedId(null)
    setError(null)
  }

  function selectSaved(search: SavedSearch) {
    setTurns([
      {
        id: search.id,
        question: search.question,
        answer: search.answer,
        sources: (search.sources as Source[]) ?? [],
        loading: false,
      },
    ])
    setActiveSavedId(search.id)
  }

  return (
    <div className="flex h-full">
      <Sidebar onSelect={selectSaved} onNew={startNew} activeId={activeSavedId} refreshKey={refreshKey} />

      <main className="flex min-w-0 flex-1 flex-col">
        {turns.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6">
            <GraduationCap className="mb-4 h-10 w-10 text-[#8A5A2C]" />
            <h1 className="mb-2 text-2xl font-semibold tracking-tight">What are you researching today?</h1>
            <p className="mb-8 max-w-md text-center text-sm text-[#8A8577]">
              Ask a question and get a synthesized answer grounded in real academic papers and credible sources —
              cited, not copy-pasted.
            </p>
            <div className="w-full max-w-xl">
              <ChatInput onSubmit={ask} loading={false} />
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {STARTERS.map((s) => (
                  <button
                    key={s}
                    onClick={() => ask(s)}
                    className="rounded-full border border-[#E4E0D6] bg-white px-3 py-1.5 text-xs text-[#5C5848] transition hover:border-[#8A5A2C]/50"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div ref={scrollRef} className="flex-1 overflow-y-auto">
              <div className="mx-auto max-w-3xl space-y-8 px-6 py-8">
                {turns.map((t) => (
                  <div key={t.id} className="space-y-3">
                    <h2 className="text-lg font-semibold tracking-tight">{t.question}</h2>
                    {t.loading ? (
                      <div className="space-y-2 animate-pulse">
                        <div className="h-3 w-full rounded bg-[#E4E0D6]" />
                        <div className="h-3 w-5/6 rounded bg-[#E4E0D6]" />
                        <div className="h-3 w-2/3 rounded bg-[#E4E0D6]" />
                      </div>
                    ) : (
                      <AnswerView answer={t.answer} sources={t.sources} />
                    )}
                  </div>
                ))}
                {error && <p className="text-sm text-red-600">{error}</p>}
              </div>
            </div>
            <div className="mx-auto w-full max-w-3xl px-6 pb-6">
              <ChatInput onSubmit={ask} loading={turns.some((t) => t.loading)} placeholder="Ask a follow-up…" />
            </div>
          </>
        )}
      </main>
    </div>
  )
}
