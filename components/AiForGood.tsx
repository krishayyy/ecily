"use client"

import { motion } from "framer-motion"

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
}

export default function AiForGood() {
  return (
    <section className="relative bg-[#080808] py-32 px-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,169,110,0.08),transparent_60%)]" />

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.p
          {...fadeUp}
          className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#C9A96E]/70 mb-6"
        >
          AI for good
        </motion.p>

        <motion.h2
          {...fadeUp}
          className="text-[clamp(1.9rem,4.5vw,3.2rem)] font-bold text-white leading-[1.15] tracking-tight text-balance"
        >
          Learn how to use AI to build deliverables for
          <span className="text-white/40"> small businesses and nonprofit organizations.</span>
        </motion.h2>

        <motion.p
          {...fadeUp}
          className="mt-7 text-base sm:text-lg text-white/55 leading-relaxed max-w-xl mx-auto"
        >
          Free lessons, taught live, where you learn to use AI tools to ship real
          work for real organizations — no experience required.
        </motion.p>

        <motion.div {...fadeUp} className="mt-10">
          <a
            href="https://classroom.google.com/c/ODc0NDE4NzAzODQy?cjc=getjt3ix"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#C9A96E] text-black text-sm font-semibold hover:bg-[#B8965A] transition-colors duration-200"
          >
            Join the class
          </a>
        </motion.div>
      </div>
    </section>
  )
}
