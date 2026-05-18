"use client"

import { motion } from "framer-motion"

const words = ["Level", "up", "your", "money", "game."]

const particles = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  size: Math.random() * 3 + 1,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: Math.random() * 6 + 8,
  delay: Math.random() * 4,
}))

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#080808]">
      {/* Particle field */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-white/10 animate-float"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Nav */}
      <motion.nav
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-6"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <span className="text-white font-semibold tracking-tight text-lg">ecily</span>
        <a
          href="#waitlist"
          className="text-sm text-white/60 hover:text-white transition-colors duration-200"
        >
          Get early access
        </a>
      </motion.nav>

      {/* Hero text */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">
        <motion.p
          className="text-xs tracking-[0.2em] text-white/40 uppercase mb-6 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Financial literacy for the next generation
        </motion.p>

        <h1 className="text-[clamp(3rem,8vw,6rem)] font-bold leading-[1.05] tracking-tight text-white mb-8 flex flex-wrap justify-center gap-x-[0.3em]">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5 + i * 0.08,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="text-base text-white/50 max-w-md leading-relaxed mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5, ease: "easeOut" }}
        >
          8 worlds. Real lessons. Zero boring. Ecily teaches teens how money actually works — through a game you actually want to play.
        </motion.p>

        <motion.a
          href="#waitlist"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors duration-200"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5, ease: "easeOut" }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Join the waitlist
        </motion.a>
      </div>

      {/* Scroll prompt */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <span className="text-[10px] tracking-[0.25em] uppercase text-white/30 font-mono">
          Scroll to explore
        </span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4 }}
        />
      </motion.div>
    </section>
  )
}
