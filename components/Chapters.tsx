"use client"

import { motion } from "framer-motion"
import { programPhases, reportSections, delegateBenefits, awardCriteria, DELEGATE_APPLY_URL } from "@/lib/program"

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
}

export default function Chapters() {
  return (
    <section id="delegate-program" className="relative bg-[#FBF6EC] py-32 px-6 scroll-mt-24">
      {/* warm glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,169,110,0.14),transparent_55%)]" />

      <div className="relative max-w-5xl mx-auto">
        {/* Heading */}
        <motion.div {...fadeUp} className="text-center mb-6">
          <p className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#B0813A] mb-4">
            National Delegate Program
          </p>
          <h2 className="font-display text-[clamp(2.2rem,5.5vw,4rem)] font-semibold text-[#1C1A16] leading-[1.05] tracking-tight">
            A research fellowship on how young people learn about money.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#1C1A16]/60 max-w-xl mx-auto leading-relaxed">
            High school delegates design a study, collect real data from their state, and
            publish a report with their name on it — cited in Ecily&apos;s National Youth
            Financial Insights Report.
          </p>
        </motion.div>

        {/* Why it exists */}
        <motion.div {...fadeUp} className="mt-20 max-w-2xl mx-auto text-center">
          <p className="text-sm sm:text-base text-[#1C1A16]/55 leading-relaxed">
            Most teenagers file a tax return, sign a lease, apply for financial aid, or get
            targeted by a predatory loan before anyone teaches them how any of it works. This
            program exists to document that gap — state by state, with real data — and turn it
            into research that schools, families, and policymakers can use.{" "}
            <span className="text-[#1C1A16]/80">This isn&apos;t a marketing internship.</span> It&apos;s
            a research fellowship.
          </p>
        </motion.div>

        {/* Curriculum */}
        <motion.div {...fadeUp} className="mt-24">
          <p className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#1C1A16]/35 mb-8 text-center">
            The 12-week curriculum
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {programPhases.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_4px_16px_rgba(28,26,22,0.04)]"
              >
                <span className="font-mono text-[11px] text-[#B0813A] tracking-wide">{p.weeks}</span>
                <h3 className="text-[#1C1A16] font-bold text-lg mt-2">{p.title}</h3>
                <p className="mt-2 text-sm text-[#1C1A16]/55 leading-relaxed">{p.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* What you'll publish */}
        <motion.div {...fadeUp} className="mt-24">
          <div className="text-center mb-10">
            <p className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#1C1A16]/35 mb-3">
              What you&apos;ll publish
            </p>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C1A16] tracking-tight">
              A standalone State Youth Financial Literacy Report.
            </h3>
          </div>

          <div className="divide-y divide-black/[0.07] border-y border-black/[0.07]">
            {reportSections.map((s) => (
              <div
                key={s.tag}
                className="py-5 flex flex-col sm:flex-row sm:items-baseline gap-x-6 gap-y-1"
              >
                <span className="font-mono text-[11px] text-[#B0813A] tracking-wide sm:w-32 shrink-0">
                  {s.tag}
                </span>
                <div>
                  <span className="text-[#1C1A16] font-semibold text-sm sm:text-base">{s.label}</span>
                  <span className="text-[#1C1A16]/55 text-sm"> — {s.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* What you get */}
        <motion.div {...fadeUp} className="mt-24">
          <p className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#1C1A16]/35 mb-8 text-center">
            What every delegate gets
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {delegateBenefits.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_4px_16px_rgba(28,26,22,0.04)]"
              >
                <span className="text-[#B0813A] font-bold text-base">{b.title}</span>
                <p className="mt-2 text-sm text-[#1C1A16]/55 leading-relaxed">{b.detail}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Ecily National Research Award */}
        <motion.div
          {...fadeUp}
          className="mt-16 rounded-3xl border border-[#C9A96E]/30 bg-gradient-to-b from-[#C9A96E]/[0.12] to-white p-8 sm:p-12"
        >
          <p className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#B0813A] mb-3">
            Ecily National Research Award
          </p>
          <p className="text-sm sm:text-base text-[#1C1A16]/60 max-w-2xl leading-relaxed mb-6">
            Presented each cohort to 5 delegates nationally, selected against published criteria:
          </p>
          <div className="flex flex-wrap gap-2.5">
            {awardCriteria.map((c) => (
              <span
                key={c}
                className="font-mono text-[11.5px] text-[#1C1A16]/65 border border-black/10 bg-white rounded-full px-4 py-2"
              >
                {c}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Apply */}
        <motion.div {...fadeUp} className="mt-16 text-center scroll-mt-24" id="apply">
          <a
            href={DELEGATE_APPLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-[#C9A96E] text-black text-sm font-semibold px-7 py-3.5 hover:bg-[#B8965A] transition-colors duration-200"
          >
            Apply to become your state&apos;s delegate →
          </a>
          <p className="text-[#1C1A16]/40 text-xs font-mono mt-4">
            No prior research experience required. Just follow-through.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
