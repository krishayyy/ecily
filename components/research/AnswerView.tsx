import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import type { Source } from "@/lib/research/types"
import { SourceCard } from "./SourceCard"

/** Turns bare "[1]" citation markers into anchor links the markdown renderer
 *  can style distinctly from a normal link. */
function linkifyCitations(answer: string, sourceCount: number) {
  return answer.replace(/\[(\d+)\]/g, (match, num) => {
    const n = Number(num)
    if (n < 1 || n > sourceCount) return match
    return `[${match}](#source-${n})`
  })
}

export function AnswerView({ answer, sources }: { answer: string; sources: Source[] }) {
  return (
    <div className="space-y-4">
      <div className="prose prose-sm max-w-none prose-p:leading-relaxed prose-p:text-[#2B2A27] prose-li:text-[#2B2A27] prose-strong:text-[#2B2A27]">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ href, children }) => {
              const isCitation = href?.startsWith("#source-")
              return (
                <a
                  href={href}
                  className={
                    isCitation
                      ? "no-underline rounded bg-[#F0EBD8] px-1 py-0.5 text-xs font-medium text-[#8A5A2C] hover:bg-[#E4DABE]"
                      : "text-[#8A5A2C] underline"
                  }
                  target={isCitation ? undefined : "_blank"}
                  rel={isCitation ? undefined : "noopener noreferrer"}
                >
                  {children}
                </a>
              )
            },
          }}
        >
          {linkifyCitations(answer, sources.length)}
        </ReactMarkdown>
      </div>

      {sources.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[#8A8577]">Sources</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {sources.map((s, i) => (
              <div key={s.id} id={`source-${i + 1}`} className="scroll-mt-24">
                <SourceCard source={s} index={i} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
