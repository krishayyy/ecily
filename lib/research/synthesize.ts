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

export async function synthesizeAnswer(
  question: string,
  sources: Source[],
  history: PriorTurn[] = [],
): Promise<string> {
  if (sources.length === 0) {
    return "I couldn't find credible sources for this yet. Try rephrasing the question or narrowing the topic."
  }

  const client = getGroqClient()
  if (!client) {
    return "Research synthesis isn't configured yet — add a GROQ_API_KEY to enable it."
  }

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

  const completion = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.3,
    max_tokens: 900,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      ...historyMessages,
      {
        role: "user",
        content: `Question: ${question}\n\nSources (renumbered for this question — cite using these numbers):\n${sourceList}`,
      },
    ],
  })

  return completion.choices[0]?.message?.content?.trim() || "Something went wrong generating a synthesis — try again."
}
