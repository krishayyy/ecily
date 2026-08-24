"use client"

import { motion } from "framer-motion"
import { SOCIAL } from "@/lib/program"

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
}

export default function Mission() {
  return (
    <section id="mission" className="relative bg-cream py-24 px-6 scroll-mt-24">
      <div className="relative max-w-2xl mx-auto text-center">
        <motion.p
          {...fadeUp}
          className="text-[10px] tracking-[0.25em] uppercase font-mono text-slate mb-6"
        >
          Our mission
        </motion.p>

        <motion.h2
          {...fadeUp}
          className="text-[clamp(1.8rem,4.2vw,2.8rem)] font-extrabold text-ink leading-[1.12] tracking-tight text-balance"
        >
          Increase AI literacy across the nation
          <span className="text-ink/35"> for everyone, not just the technical.</span>
        </motion.h2>

        <motion.p
          {...fadeUp}
          className="mt-6 text-base text-ink/55 leading-relaxed max-w-xl mx-auto"
        >
          Ecily is a student-run organization closing that gap, starting with the people
          furthest from it, meeting them where they already spend time.
        </motion.p>

        <motion.div {...fadeUp} className="mt-9 flex items-center justify-center gap-3">
          {SOCIAL.instagram && (
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ecily on Instagram"
              className="w-10 h-10 rounded-full border border-ink/12 flex items-center justify-center text-ink/60 hover:text-ink hover:border-slate/50 transition-colors duration-200"
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
              className="w-10 h-10 rounded-full border border-ink/12 flex items-center justify-center text-ink/60 hover:text-ink hover:border-slate/50 transition-colors duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
              </svg>
            </a>
          )}
        </motion.div>
      </div>
    </section>
  )
}
