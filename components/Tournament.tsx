"use client"

import { motion } from "framer-motion"
import { tournamentRounds, tournamentTiers } from "@/lib/program"

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
}

export default function Tournament() {
  return (
    <section id="tournament" className="bg-[#0C0C0C] py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-16">
          <p className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#C9A96E]/70 mb-4">
            The Tournament
          </p>
          <h2 className="text-[clamp(2.2rem,5.5vw,4rem)] font-bold text-white leading-[1.05] tracking-tight">
            A competition worth winning.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-white/50 max-w-xl mx-auto leading-relaxed">
            Ecily hosts a national, solution-oriented financial literacy tournament.
            Chapter teams prove what they&apos;ve learned, then build and defend real
            solutions in front of judges.
          </p>
        </motion.div>

        {/* Format */}
        <motion.div {...fadeUp} className="grid sm:grid-cols-2 gap-4 mb-6">
          {tournamentRounds.map((r) => (
            <div key={r.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-white/30">
                Format
              </span>
              <h3 className="text-xl font-bold text-white mt-2 mb-2">{r.label}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{r.detail}</p>
            </div>
          ))}
        </motion.div>

        {/* Tiers / funnel */}
        <motion.div {...fadeUp} className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 sm:p-9">
          <p className="text-[10px] tracking-[0.2em] uppercase font-mono text-white/30 mb-6">
            The road to nationals
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {tournamentTiers.map((t, i) => (
              <div key={t.tier} className="relative">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xs text-[#C9A96E]/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-white font-semibold">{t.tier}</span>
                </div>
                <p className="text-[13px] text-white/45 leading-relaxed">{t.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Honest founding-year note */}
        <motion.p
          {...fadeUp}
          className="text-center text-xs text-white/30 font-mono mt-10 max-w-lg mx-auto leading-relaxed"
        >
          Inaugural tournament launching this winter. Rounds are built around the
          national standards for financial literacy. Exact dates, judges, and prizes are
          being finalized and announced as they&apos;re confirmed.
        </motion.p>
      </div>
    </section>
  )
}
