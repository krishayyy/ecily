import type { Source } from "./types"

const API = "https://api.semanticscholar.org/graph/v1/paper/search"

/** Semantic Scholar's public search API — no key required at low volume. */
export async function searchSemanticScholar(query: string, limit = 5): Promise<Source[]> {
  const params = new URLSearchParams({
    query,
    limit: String(limit),
    fields: "title,abstract,url,year,venue,authors.name,openAccessPdf",
  })

  try {
    const res = await fetch(`${API}?${params.toString()}`, {
      headers: {
        Accept: "application/json",
        "User-Agent": "EcilyResearch/1.0 (https://ecily.org)",
      },
      next: { revalidate: 0 },
    })

    if (!res.ok) {
      console.error(`[semanticScholar] ${res.status} ${res.statusText}: ${(await res.text()).slice(0, 300)}`)
      return []
    }

    const data = await res.json()
    const papers: any[] = data?.data ?? []

    return papers
      .filter((p) => p.title)
      .map((p) => ({
        id: `s2-${p.paperId ?? crypto.randomUUID()}`,
        kind: "academic" as const,
        title: p.title as string,
        url: p.openAccessPdf?.url || p.url || `https://www.semanticscholar.org/search?q=${encodeURIComponent(p.title)}`,
        snippet: (p.abstract as string) || "",
        authors: Array.isArray(p.authors) ? p.authors.map((a: any) => a.name).slice(0, 3).join(", ") : undefined,
        year: p.year ?? undefined,
        venue: p.venue || undefined,
      }))
  } catch (err) {
    console.error("[semanticScholar] fetch failed:", err)
    return []
  }
}
