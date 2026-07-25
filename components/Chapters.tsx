"use client"

import { motion } from "framer-motion"
import { pillars, ladder } from "@/lib/program"
import ChapterForm from "@/components/ChapterForm"

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
}

export default function Chapters() {
  return (
    <section id="chapters" className="relative bg-[#FBF6EC] py-32 px-6">
      {/* warm glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,169,110,0.14),transparent_55%)]" />

      <div className="relative max-w-5xl mx-auto">
        {/* Heading */}
        <motion.div {...fadeUp} className="text-center mb-6">
          <p className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#B0813A] mb-4">
            Ecily Chapters
          </p>
          <h2 className="text-[clamp(2.2rem,5.5vw,4rem)] font-extrabold text-[#1C1A16] leading-[1.05] tracking-tight">
            Become a State Delegate.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#1C1A16]/60 max-w-xl mx-auto leading-relaxed">
            Found your school&apos;s chapter of Ecily. You teach your classmates the
            curriculum we provide and represent your school as a State Delegate.
          </p>
        </motion.div>

        {/* Pillars */}
        <motion.div {...fadeUp} className="mt-24">
          <p className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#1C1A16]/35 mb-8 text-center">
            What every member gets
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillars.map((p) => (
              <div
                key={p.key}
                className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_4px_16px_rgba(28,26,22,0.04)]"
              >
                <span className="text-[#B0813A] font-bold text-lg">{p.title}</span>
                <p className="mt-2 text-sm text-[#1C1A16]/55 leading-relaxed">{p.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* The ladder */}
        <motion.div {...fadeUp} className="mt-24">
          <div className="text-center mb-10">
            <p className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#1C1A16]/35 mb-3">
              The ladder
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#1C1A16] tracking-tight">
              Start a chapter. Climb from there.
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {ladder.map((rung) => (
              <div
                key={rung.title}
                className="relative rounded-2xl border border-black/[0.08] bg-white p-7 flex flex-col shadow-[0_4px_16px_rgba(28,26,22,0.04)]"
              >
                <span className="font-mono text-xs text-[#B0813A]">{rung.rank}</span>
                <h4 className="text-xl font-bold text-[#1C1A16] mt-1">{rung.title}</h4>
                <span className="text-[11px] tracking-wide uppercase font-mono text-[#1C1A16]/35 mt-1">
                  {rung.scope}
                </span>
                <p className="text-sm text-[#1C1A16]/55 leading-relaxed mt-3 mb-4">
                  {rung.summary}
                </p>
                <ul className="mt-auto space-y-2">
                  {rung.powers.map((power) => (
                    <li key={power} className="flex gap-2 text-[13px] text-[#1C1A16]/60">
                      <span className="text-[#B0813A] mt-[2px]">›</span>
                      <span>{power}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Apply */}
        <ChapterForm />
      </div>
    </section>
  )
}
