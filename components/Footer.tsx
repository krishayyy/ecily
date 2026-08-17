import Link from "next/link"
import { CONTACT_EMAIL, SOCIAL } from "@/lib/program"

export default function Footer() {
  return (
    <footer className="bg-[#FBF6EC] border-t border-black/[0.07] px-8 py-10">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
        <span className="text-[#1C1A16]/70 font-semibold tracking-tight">ecily</span>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[#1C1A16]/40 font-mono">
        <Link href="/#delegate-program" className="hover:text-[#1C1A16]/70 transition-colors duration-200">Delegate Program</Link>
          <Link href="/team" className="hover:text-[#1C1A16]/70 transition-colors duration-200">National Board</Link>
          <Link href="/privacy" className="hover:text-[#1C1A16]/70 transition-colors duration-200">Privacy</Link>
          <Link href="/terms" className="hover:text-[#1C1A16]/70 transition-colors duration-200">Terms</Link>
          <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-[#1C1A16]/70 transition-colors duration-200">Contact</a>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            {SOCIAL.instagram && (
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ecily on Instagram"
                className="text-[#1C1A16]/40 hover:text-[#1C1A16] transition-colors duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
                </svg>
              </a>
            )}
            {SOCIAL.linkedin && (
              <a
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ecily on LinkedIn"
                className="text-[#1C1A16]/40 hover:text-[#1C1A16] transition-colors duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                </svg>
              </a>
            )}
          </div>
          <span className="text-xs text-[#1C1A16]/35 font-mono">© 2026 Ecily</span>
        </div>
      </div>
    </footer>
  )
}
