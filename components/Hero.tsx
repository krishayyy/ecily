"use client"

import { motion } from "framer-motion"

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
})

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F7F6F3] pt-40 pb-28 px-6">
      {/* soft background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,169,110,0.14),transparent_60%)]" />

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.p
          {...fadeUp(0)}
          className="text-xs tracking-[0.2em] text-black/40 uppercase mb-6 font-mono"
        >
          Financial literacy for the next generation
        </motion.p>

        <motion.h1
          {...fadeUp(0.08)}
          className="text-[clamp(2.5rem,6vw,4.25rem)] font-bold leading-[1.08] tracking-tight text-black"
        >
          Learn money by playing.
        </motion.h1>
        <motion.h2
          {...fadeUp(0.16)}
          className="text-[clamp(2.5rem,6vw,4.25rem)] font-bold leading-[1.08] tracking-tight text-black/35 mb-8"
        >
          Earn XP. Level up for life.
        </motion.h2>

        <motion.p
          {...fadeUp(0.24)}
          className="text-base text-black/55 max-w-lg mx-auto leading-relaxed mb-10"
        >
          A game that teaches teens how money actually works — across 8 worlds. Play it
          yourself, or start a chapter at your school and teach it forward.
        </motion.p>

        <motion.div {...fadeUp(0.32)}>
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

      {/* Product showcase — device mockup with overlapping stat cards */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-4xl mx-auto mt-20"
      >
        <div className="relative flex justify-center">
          {/* Phone mockup */}
          <div className="relative w-[300px] sm:w-[340px] rounded-[2.75rem] border-[10px] border-black bg-black shadow-[0_30px_70px_rgba(0,0,0,0.25)]">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-28 h-6 bg-black rounded-b-2xl z-10" />
            <div className="rounded-[2.15rem] overflow-hidden bg-[#0B0B0B] aspect-[9/19.5] p-5 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[11px] text-white/40 font-mono">Welcome back,</p>
                  <p className="text-sm font-semibold text-white">Alex M.</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 text-xs">
                  🔔
                </div>
              </div>

              <div className="rounded-2xl bg-white/[0.06] border border-white/[0.08] p-4 mb-4">
                <p className="text-3xl font-bold text-white">Level 4</p>
                <p className="text-[11px] text-white/40 font-mono mt-1">World: Investing Basics</p>
                <div className="h-1.5 rounded-full bg-white/10 mt-3 overflow-hidden">
                  <div className="h-full w-2/3 rounded-full bg-[#C9A96E]" />
                </div>
              </div>

              <div className="rounded-2xl bg-white/[0.06] border border-white/[0.08] p-4 flex-1">
                <p className="text-[11px] text-white/40 font-mono mb-1">Next lesson</p>
                <p className="text-sm text-white font-medium">Compound Interest</p>
                <p className="text-[11px] text-white/40 font-mono mt-1">+50 XP</p>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {["🏠", "🎮", "🏆"].map((icon, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-sm"
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Overlapping card — top right, like a payment-detail card */}
          <motion.div
            initial={{ opacity: 0, x: 24, y: -10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="hidden md:block absolute right-[-2rem] top-24 w-52 rounded-2xl bg-white shadow-[0_16px_36px_rgba(0,0,0,0.10)] p-4 border border-black/5"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] font-mono text-black/40">Lesson</p>
              <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 rounded-full px-2 py-0.5">
                Completed
              </span>
            </div>
            <p className="text-sm font-semibold text-black">Compound Interest</p>
            <div className="mt-3 pt-3 border-t border-black/5 flex items-center justify-between">
              <p className="text-[11px] text-black/40 font-mono">XP earned</p>
              <p className="text-sm font-bold text-black">+50</p>
            </div>
          </motion.div>

          {/* Overlapping card — bottom left, like a card-list card */}
          <motion.div
            initial={{ opacity: 0, x: -24, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="hidden md:block absolute left-[-2rem] bottom-16 w-48 rounded-2xl bg-white shadow-[0_16px_36px_rgba(0,0,0,0.10)] p-4 border border-black/5"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#C9A96E]" />
              <p className="text-[11px] font-mono text-black/40">Badge earned</p>
            </div>
            <p className="text-sm font-semibold text-black">Budgeting Master</p>
            <p className="text-[11px] text-black/45 font-mono mt-1">+120 XP</p>
          </motion.div>

          {/* Small streak pill — bottom right */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="hidden md:block absolute right-2 bottom-[-1rem] rounded-2xl bg-white shadow-[0_16px_36px_rgba(0,0,0,0.10)] px-4 py-3 border border-black/5"
          >
            <p className="text-lg font-bold text-black leading-none">7 days</p>
            <p className="text-[11px] text-black/45 font-mono mt-1">Learning streak</p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
