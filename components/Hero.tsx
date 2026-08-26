"use client"

import Link from "next/link"
import { motion } from "framer-motion"

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
})

const initiatives = [
  {
    eyebrow: "Financial Literacy",
    title: "Learn money by playing.",
    body: "A game that teaches teens how money actually works, across 8 worlds. Play it yourself, or start a chapter at your school and teach it forward.",
    cta: "Play now",
    href: "#start",
  },
  {
    eyebrow: "AI & Computer Science",
    title: "Build at a hackathon.",
    body: "Free, beginner-friendly hackathons where teens learn AI and code by shipping something real in a weekend.",
    cta: "See hackathons",
    href: "/hackathons",
  },
]

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
          Two programs, one goal: give teens real financial and technical skills
          before they need them.
        </motion.p>
      </div>

      <div className="relative max-w-4xl mx-auto mt-16 grid sm:grid-cols-2 gap-5">
        {initiatives.map((item, i) => (
          <motion.div
            key={item.title}
            {...fadeUp(0.35 + i * 0.1)}
            className="text-left rounded-3xl border border-black/[0.08] bg-[#FAFAF8] p-8 flex flex-col"
          >
            <p className="text-[11px] tracking-[0.15em] uppercase font-mono text-[#C9A96E]">
              {item.eyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-black">
              {item.title}
            </h2>
            <p className="mt-3 text-sm text-black/55 leading-relaxed flex-1">
              {item.body}
            </p>
            <Link
              href={item.href}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-black group"
            >
              {item.cta}
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
