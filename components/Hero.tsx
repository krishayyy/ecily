"use client"

import { motion } from "framer-motion"

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
})

export default function Hero() {
  return (
    <section className="relative bg-[#F7F6F3] pt-48 pb-40 px-6">
      <div className="relative max-w-4xl mx-auto text-center">
        <motion.p
          {...fadeUp(0)}
          className="text-xs tracking-[0.3em] text-black/40 uppercase mb-10 font-mono"
        >
          Financial literacy for the next generation
        </motion.p>

        <motion.h1
          {...fadeUp(0.1)}
          className="font-serif italic font-light text-[clamp(2.75rem,8vw,6.5rem)] leading-[1.05] text-black"
        >
          Introducing
          <br />
          Ecily
        </motion.h1>

        <motion.p
          {...fadeUp(0.3)}
          className="mt-10 text-base text-black/55 max-w-lg mx-auto leading-relaxed"
        >
          A game that teaches teens how money actually works — across 8 worlds. Play it
          yourself, or start a chapter at your school and teach it forward.
        </motion.p>

        <motion.div {...fadeUp(0.4)} className="mt-10">
          <motion.a
            href="#start"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#C9A96E] text-black text-sm font-semibold hover:bg-[#B8965A] transition-colors duration-200 shadow-[0_8px_24px_rgba(201,169,110,0.35)]"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Play now
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
