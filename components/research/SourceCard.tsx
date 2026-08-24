import { BookOpen, Globe } from "lucide-react"
import type { Source } from "@/lib/research/types"

export function SourceCard({ source, index }: { source: Source; index: number }) {
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-3 rounded-lg border border-[#E4E0D6] bg-white p-3 transition hover:border-[#8A5A2C]/50 hover:shadow-sm"
    >
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F7F5EF] text-[11px] font-medium text-[#8A5A2C]">
        {index + 1}
      </span>
      <div className="min-w-0">
        <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-[#8A8577]">
          {source.kind === "academic" ? <BookOpen className="h-3 w-3" /> : <Globe className="h-3 w-3" />}
          {source.kind === "academic" ? "Academic" : "Web"}
          {source.year && <span>· {source.year}</span>}
        </div>
        <p className="mt-0.5 truncate text-sm font-medium text-[#2B2A27]">{source.title}</p>
        {source.authors && <p className="truncate text-xs text-[#8A8577]">{source.authors}</p>}
      </div>
    </a>
  )
}
