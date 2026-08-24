export type SourceKind = "academic" | "web"

export interface Source {
  id: string
  kind: SourceKind
  title: string
  url: string
  snippet: string
  authors?: string
  year?: number
  venue?: string
}

export interface ResearchAnswer {
  answer: string
  sources: Source[]
}

/** Merges academic results from multiple providers (OpenAlex, Semantic
 *  Scholar), dropping duplicates that both surfaced for the same paper. */
export function dedupeSources(sources: Source[]): Source[] {
  const seen = new Set<string>()
  const result: Source[] = []
  for (const s of sources) {
    const key = s.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()
    if (key && seen.has(key)) continue
    if (key) seen.add(key)
    result.push(s)
  }
  return result
}
