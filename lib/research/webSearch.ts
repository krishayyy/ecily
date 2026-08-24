import type { Source } from "./types"

const API = "https://api.tavily.com/search"

/** Curated allowlist beyond .gov/.edu — major reference and public-health/science orgs
 *  students can cite without a credibility fight with their teacher. */
const CREDIBLE_ORGS = [
  "who.int",
  "un.org",
  "nih.gov",
  "cdc.gov",
  "nasa.gov",
  "nature.com",
  "sciencedirect.com",
  "pewresearch.org",
  "britannica.com",
  "loc.gov",
  "worldbank.org",
  "un-ilibrary.org",
  "nationalgeographic.com",
]

/** Tavily search restricted to .gov, .edu, and a curated credible-org allowlist.
 *  Returns [] (not throws) when no API key is configured, so the app degrades
 *  gracefully to academic-only results. */
export async function searchCredibleWeb(query: string, limit = 6): Promise<Source[]> {
  const apiKey = process.env.TAVILY_API_KEY
  if (!apiKey) return []

  try {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: apiKey,
        query: `${query} (site:.gov OR site:.edu OR ${CREDIBLE_ORGS.map((d) => `site:${d}`).join(" OR ")})`,
        search_depth: "advanced",
        max_results: limit,
      }),
    })

    if (!res.ok) {
      console.error(`[tavily] ${res.status} ${res.statusText}: ${(await res.text()).slice(0, 300)}`)
      return []
    }

    const data = await res.json()
    const results: any[] = data?.results ?? []

    return results
      .filter((r) => r.title && r.url)
      .map((r) => ({
        id: `web-${r.url}`,
        kind: "web" as const,
        title: r.title as string,
        url: r.url as string,
        snippet: (r.content as string) || "",
      }))
  } catch (err) {
    console.error("[tavily] fetch failed:", err)
    return []
  }
}
