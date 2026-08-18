"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

type Chip = { label: string; icon: ReactNode }

/* Shared stroke style so every icon reads as one family */
const s = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
}

const icon = {
  globe: (
    <svg {...s}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.6 2.6 2.6 15.4 0 18M12 3c-2.6 2.6-2.6 15.4 0 18" />
    </svg>
  ),
  chart: (
    <svg {...s}>
      <path d="M4 19V5M4 19h16M8 15l3-4 3 2 4-6" />
    </svg>
  ),
  spark: (
    <svg {...s}>
      <path d="M12 3l1.8 5.2L19 11l-5.2 1.8L12 18l-1.8-5.2L5 11l5.2-1.8z" />
    </svg>
  ),
  shield: (
    <svg {...s}>
      <path d="M12 3l7 3v5c0 4.6-3 7.7-7 9-4-1.3-7-4.4-7-9V6z" />
      <path d="M9.2 12l2 2 3.6-4.2" />
    </svg>
  ),
  flag: (
    <svg {...s}>
      <path d="M5 21V4M5 4h11l-2 4 2 4H5" />
    </svg>
  ),
  target: (
    <svg {...s}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  ),
  book: (
    <svg {...s}>
      <path d="M4 5a2 2 0 0 1 2-2h6v16H6a2 2 0 0 0-2 2zM20 5a2 2 0 0 0-2-2h-6v16h6a2 2 0 0 1 2 2z" />
    </svg>
  ),
  lock: (
    <svg {...s}>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  ),
  ban: (
    <svg {...s}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M6.2 6.2l11.6 11.6" />
    </svg>
  ),
  users: (
    <svg {...s}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.6 19a5.4 5.4 0 0 1 10.8 0M16 6.2a3 3 0 0 1 0 5.6M20.4 19a5 5 0 0 0-3.4-4.7" />
    </svg>
  ),
  cycle: (
    <svg {...s}>
      <path d="M4 9a8 8 0 0 1 13.7-3.3L20 8M20 4v4h-4M20 15a8 8 0 0 1-13.7 3.3L4 16M4 20v-4h4" />
    </svg>
  ),
}

/* Every chip is true today and stands on its own — no fabricated third-party proof.
   As real proof arrives (beta quotes, an educator's name, App Store rating, school
   names), swap the weakest self-claims here for those — the structure stays. */
const rowOne: Chip[] = [
  { label: "8 interactive worlds", icon: icon.globe },
  { label: "Paper trading, no real money at risk", icon: icon.chart },
  { label: "An AI coach that explains the why", icon: icon.spark },
  { label: "Sign in with Apple", icon: icon.shield },
  { label: "Student-led chapters", icon: icon.flag },
  { label: "Learn by doing, not memorizing", icon: icon.target },
]

const rowTwo: Chip[] = [
  { label: "Real personal finance, not theory", icon: icon.book },
  { label: "Private by design", icon: icon.lock },
  { label: "We never sell your data", icon: icon.ban },
  { label: "Built for how teens actually learn", icon: icon.users },
  { label: "Teaches it forward, school by school", icon: icon.cycle },
]

function Row({
  chips,
  duration,
  reverse = false,
}: {
  chips: Chip[]
  duration: number
  reverse?: boolean
}) {
  // Duplicate the set so translateX(-50%) lands exactly on the seam = seamless loop
  const doubled = [...chips, ...chips]
  return (
    <div className="marquee-row marquee-mask relative overflow-hidden">
      <div
        className={`marquee-track gap-3 ${reverse ? "reverse" : ""}`}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {doubled.map((c, i) => (
          <span
            key={i}
            aria-hidden={i >= chips.length}
            className="inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-full border border-black/[0.08] bg-white px-5 py-2.5 shadow-[0_2px_10px_rgba(28,26,22,0.05)]"
          >
            <span className="shrink-0 text-[#B0813A]">{c.icon}</span>
            <span className="text-[13px] font-medium text-[#1C1A16]/75 sm:text-sm">
              {c.label}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function CredibilityMarquee() {
  return (
    <section className="relative overflow-hidden bg-[#F7E9D3] py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.4),transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-10 px-6 text-center"
      >
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#B0813A]">
          Why Ecily
        </p>
        <h2 className="font-display text-[clamp(1.4rem,3vw,2rem)] font-semibold tracking-tight text-[#1C1A16]">
          No gimmicks. Just the fundamentals, done right.
        </h2>
      </motion.div>

      <div className="relative flex flex-col gap-3">
        <Row chips={rowOne} duration={64} />
        <Row chips={rowTwo} duration={78} reverse />
      </div>
    </section>
  )
}
