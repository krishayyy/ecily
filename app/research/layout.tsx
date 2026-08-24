import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ecily Research — a research copilot for students",
  description:
    "Ask a question, get a synthesized answer grounded in real academic and credible sources — not a copy-paste essay.",
}

export default function ResearchLayout({ children }: { children: React.ReactNode }) {
  return <div className="h-screen w-full bg-[#FAF9F5] text-[#2B2A27]">{children}</div>
}
