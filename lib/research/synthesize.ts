import Groq from "groq-sdk"
import type { Source } from "./types"

let groq: Groq | null = null
function getGroqClient() {
  if (!process.env.GROQ_API_KEY) return null
  if (!groq) groq = new Groq({ apiKey: process.env.GROQ_API_KEY })
  return groq
}

const SYSTEM_PROMPT = `You are a research assistant for students, not a homework-answering machine.

Rules:
- Write a synthesis in your own words that answers the student's question, grounded ONLY in the numbered sources given to you.
- Cite every factual claim inline with its source number in brackets, e.g. [1]. A claim with no matching source should not appear.
- Never invent a citation, a fact, or a source that isn't in the list.
- If the sources don't cover part of the question, say so plainly instead of filling the gap yourself.
- Write like you're briefing a curious student, not writing their essay for them: explain the key ideas and the disagreements between sources, but leave the argument and the wording for them to build. Do not produce a polished, submission-ready essay.
- 150-350 words. Use short paragraphs or a few bullet points where useful.`

export interface PriorTurn {
  question: string
  answer: string
}

/** Returns a fixed message instead of streaming when synthesis can't run at
 *  all (no sources found, or no Groq key configured) — lets the route short
 *  -circuit before opening a stream. */
export function synthesisUnavailableReason(sources: Source[]): string | null {
  if (sources.length === 0) {
    return "I couldn't find credible sources for this yet. Try rephrasing the question or narrowing the topic."
  }
  if (!getGroqClient()) {
    return "Research synthesis isn't configured yet — add a GROQ_API_KEY to enable it."
  }
  return null
}

function buildMessages(question: string, sources: Source[], history: PriorTurn[]) {
  const sourceList = sources
    .map((s, i) => {
      const meta = [s.authors, s.year, s.venue].filter(Boolean).join(", ")
      return `[${i + 1}] ${s.title}${meta ? ` (${meta})` : ""}\n${s.snippet.slice(0, 600)}`
    })
    .join("\n\n")

  const historyMessages = history.slice(-3).flatMap((turn) => [
    { role: "user" as const, content: turn.question },
    { role: "assistant" as const, content: turn.answer },
  ])

  return [
    { role: "system" as const, content: SYSTEM_PROMPT },
    ...historyMessages,
    {
      role: "user" as const,
      content: `Question: ${question}\n\nSources (renumbered for this question — cite using these numbers):\n${sourceList}`,
    },
  ]
}

/** Streams the synthesis token-by-token. Caller must have already checked
 *  synthesisUnavailableReason() returns null. */
export async function* synthesizeAnswerStream(
  question: string,
  sources: Source[],
  history: PriorTurn[] = [],
): AsyncGenerator<string> {
  const client = getGroqClient()
  if (!client) return

  const stream = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.3,
    max_tokens: 900,
    stream: true,
    messages: buildMessages(question, sources, history),
  })

  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content
    if (delta) yield delta
  }
}
