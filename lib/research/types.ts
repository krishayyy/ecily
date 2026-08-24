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
