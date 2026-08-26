"use client"

import Link from "next/link"
import { motion } from "framer-motion"

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
})

export default function Hero() {
  return (
    <section className="relative bg-white pt-48 pb-32 px-6">
      <div className="relative max-w-4xl mx-auto text-center">
        <motion.p
          {...fadeUp(0)}
          className="text-xs tracking-[0.3em] text-black/40 uppercase mb-10 font-mono"
        >
          Our initiative
        </motion.p>

        <motion.h1
          {...fadeUp(0.1)}
          className="font-serif italic font-light text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.08] text-black"
        >
          Teaching AI and CS
          <br />
          to the community.
        </motion.h1>

        <motion.p
          {...fadeUp(0.25)}
          className="mt-8 text-base text-black/55 max-w-lg mx-auto leading-relaxed"
        >
          Free hackathons that give teens the AI and coding skills school doesn&apos;t.
        </motion.p>
      </div>

      <div className="relative max-w-md mx-auto mt-16">
        <motion.div
          {...fadeUp(0.35)}
          className="text-left rounded-3xl border border-black/[0.08] bg-[#FAFAF8] p-8 flex flex-col"
        >
          <p className="text-[11px] tracking-[0.15em] uppercase font-mono text-[#C9A96E]">
            AI & Computer Science
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-black">
            Build at a hackathon.
          </h2>
          <p className="mt-3 text-sm text-black/55 leading-relaxed">
            Free, beginner-friendly hackathons where teens learn AI and code by
            shipping something real in a weekend.
          </p>
          <Link
            href="/hackathons"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-black group"
          >
            See hackathons
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
