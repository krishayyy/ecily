"use client"

import { motion } from "framer-motion"

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
})

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream pt-32 pb-24 px-6">
      <div className="pointer-events-none absolute inset-0 warm-glow" />

      <motion.p
        {...fadeUp(0)}
        className="relative text-center text-xs tracking-[0.2em] text-ink/40 uppercase mb-10 font-mono"
      >
        Ecily &middot; A literacy organization
      </motion.p>

      {/* Photo-card row — left tilted photo, center callout, right photo */}
      <div className="relative max-w-5xl mx-auto grid grid-cols-3 gap-3 sm:gap-5 items-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 24, rotate: -6 }}
          animate={{ opacity: 1, y: 0, rotate: -4 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="photo-card hidden sm:block aspect-[3/4] rounded-[1.75rem] shadow-[0_20px_50px_rgba(22,21,15,0.12)]"
          style={{ backgroundImage: "linear-gradient(160deg, rgba(202,207,133,0.7), rgba(140,186,128,0.5)), url(/images/hero-friends.jpg)" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="col-span-3 sm:col-span-1 aspect-[3/4] rounded-[1.75rem] bg-ink text-cream p-6 flex flex-col justify-end shadow-[0_20px_50px_rgba(22,21,15,0.18)]"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-cream/40 mb-3">
            The gap
          </span>
          <p className="text-lg font-semibold leading-snug">
            &ldquo;Nobody taught me this before I needed it.&rdquo;
          </p>
          <p className="text-xs text-cream/40 mt-3 font-mono">Every teen, eventually</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, rotate: 6 }}
          animate={{ opacity: 1, y: 0, rotate: 4 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="photo-card hidden sm:block aspect-[3/4] rounded-[1.75rem] shadow-[0_20px_50px_rgba(22,21,15,0.12)]"
          style={{ backgroundImage: "linear-gradient(200deg, rgba(101,142,156,0.6), rgba(81,70,99,0.5)), url(/images/hero-chapter.jpg)" }}
        />
      </div>

      {/* Headline */}
      <div className="relative max-w-2xl mx-auto text-center">
        <motion.h1
          {...fadeUp(0.28)}
          className="text-[clamp(2.4rem,6vw,4rem)] font-extrabold leading-[1.02] tracking-tight text-ink text-balance"
        >
          Real life doesn&apos;t come with a syllabus.
          <span className="text-slate"> We&apos;re writing one.</span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.36)}
          className="mt-6 text-base text-ink/55 max-w-lg mx-auto leading-relaxed"
        >
          Ecily teaches the decisions that actually shape a life — starting with money,
          through a game teens love — and chapters that carry it into schools nationwide.
        </motion.p>

        <motion.div {...fadeUp(0.44)} className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <motion.a
            href="#start"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-ink text-cream text-sm font-semibold hover:bg-grape transition-colors duration-200"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Start a chapter
          </motion.a>
          <motion.a
            href="#waitlist"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-ink/15 text-ink text-sm font-semibold hover:bg-white transition-colors duration-200"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Get the app
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
