import type { Source } from "./types"

const API = "https://api.openalex.org/works"

/** OpenAlex is free, keyless, and has a far more generous rate limit than
 *  Semantic Scholar (~100k/day vs ~1/sec) — it's the primary academic source,
 *  with Semantic Scholar layered in for coverage it misses. Setting
 *  OPENALEX_MAILTO puts requests in OpenAlex's faster "polite pool". */
function reconstructAbstract(index: Record<string, number[]> | undefined): string {
  if (!index) return ""
  const words: string[] = []
  for (const [word, positions] of Object.entries(index)) {
    for (const pos of positions) words[pos] = word
  }
  return words.filter(Boolean).join(" ")
}

export async function searchOpenAlex(query: string, limit = 6): Promise<Source[]> {
  const params = new URLSearchParams({
    search: query,
    per_page: String(limit),
    select: "id,title,abstract_inverted_index,publication_year,primary_location,authorships",
  })
  const mailto = process.env.OPENALEX_MAILTO
  if (mailto) params.set("mailto", mailto)

  const res = await fetch(`${API}?${params.toString()}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 0 },
  })

  if (!res.ok) return []

  const data = await res.json()
  const works: any[] = data?.results ?? []

  return works
    .filter((w) => w.title)
    .map((w) => {
      const location = w.primary_location
      const url = location?.landing_page_url || location?.pdf_url || `https://openalex.org/${w.id?.split("/").pop()}`
      return {
        id: `oa-${w.id ?? crypto.randomUUID()}`,
        kind: "academic" as const,
        title: w.title as string,
        url,
        snippet: reconstructAbstract(w.abstract_inverted_index),
        authors: Array.isArray(w.authorships)
          ? w.authorships.map((a: any) => a.author?.display_name).filter(Boolean).slice(0, 3).join(", ")
          : undefined,
        year: w.publication_year ?? undefined,
        venue: location?.source?.display_name || undefined,
      }
    })
}
