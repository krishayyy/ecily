import Link from "next/link"
import { CONTACT_EMAIL } from "@/lib/program"

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/[0.06] px-8 py-10">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
        <span className="text-white/60 font-semibold tracking-tight">ecily</span>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/30 font-mono">
          <Link href="/#chapters" className="hover:text-white/60 transition-colors duration-200">Chapters</Link>
          <Link href="/#tournament" className="hover:text-white/60 transition-colors duration-200">Tournament</Link>
          <Link href="/#sponsors" className="hover:text-white/60 transition-colors duration-200">Sponsors</Link>
          <Link href="/people" className="hover:text-white/60 transition-colors duration-200">People</Link>
          <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white/60 transition-colors duration-200">Contact</a>
        </div>
        <span className="text-xs text-white/25 font-mono">© 2026 Ecily</span>
      </div>
    </footer>
  )
}
