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
    <section id="mission" className="relative bg-[#EAE3F8] py-32 px-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.5),transparent_60%)]" />

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.p
          {...fadeUp}
          className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#7B5FC7] mb-6"
        >
          Our mission
        </motion.p>

        <motion.h2
          {...fadeUp}
          className="font-display text-[clamp(1.9rem,4.5vw,3.2rem)] font-semibold text-[#1C1A16] leading-[1.15] tracking-tight text-balance"
        >
          Build personal financial literacy
          <span className="text-[#1C1A16]/45"> — for every teenager.</span>
        </motion.h2>

        <motion.p
          {...fadeUp}
          className="mt-7 text-base sm:text-lg text-[#1C1A16]/65 leading-relaxed max-w-xl mx-auto"
        >
          Most people leave high school never taught how money actually works. We&apos;re
          changing that — teaching real, personal finance through a game teens want to
          play, and a student movement that teaches it forward, school by school.
        </motion.p>

        <motion.div {...fadeUp} className="mt-10 flex items-center justify-center gap-3">
          <span className="text-xs text-[#1C1A16]/40 font-mono mr-1">Follow along</span>

          {SOCIAL.instagram && (
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ecily on Instagram"
              className="w-10 h-10 rounded-full border border-black/10 bg-white/60 flex items-center justify-center text-[#1C1A16]/60 hover:text-[#1C1A16] hover:border-[#7B5FC7]/50 transition-colors duration-200"
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
              className="w-10 h-10 rounded-full border border-black/10 bg-white/60 flex items-center justify-center text-[#1C1A16]/60 hover:text-[#1C1A16] hover:border-[#7B5FC7]/50 transition-colors duration-200"
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
