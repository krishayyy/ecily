"use client"

import { motion } from "framer-motion"

const words = ["Level", "up", "your", "money", "game."]

const blobs = [
  { color: "#F6C89B", size: 420, x: "8%", y: "12%", duration: 22 },
  { color: "#D7CBF7", size: 380, x: "78%", y: "8%", duration: 26 },
  { color: "#BFE3CC", size: 340, x: "82%", y: "62%", duration: 24 },
  { color: "#F7D9A8", size: 300, x: "6%", y: "66%", duration: 20 },
]

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#FBF6EC]">
      {/* Soft color blobs */}
      <div className="absolute inset-0 pointer-events-none">
        {blobs.map((b, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              width: b.size,
              height: b.size,
              left: b.x,
              top: b.y,
              background: b.color,
              opacity: 0.55,
            }}
            animate={{
              x: [0, 20, -10, 0],
              y: [0, -16, 12, 0],
            }}
            transition={{
              duration: b.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.6,
            }}
          />
        ))}
      </div>

      {/* Hero text */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">
        <motion.p
          className="text-xs tracking-[0.2em] text-[#1C1A16]/45 uppercase mb-6 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Financial literacy for the next generation
        </motion.p>

        <h1 className="text-[clamp(3rem,8vw,6rem)] font-extrabold leading-[1.05] tracking-tight text-[#1C1A16] mb-8 flex flex-wrap justify-center gap-x-[0.3em]">
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
          className="text-base text-[#1C1A16]/60 max-w-lg leading-relaxed mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5, ease: "easeOut" }}
        >
          A game that teaches teens how money actually works — across 8 worlds. Play it
          yourself, or start a chapter at your school and teach it forward.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5, ease: "easeOut" }}
        >
          <motion.a
            href="#start"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#1C1A16] text-white text-sm font-semibold hover:bg-[#33302A] transition-colors duration-200 w-full sm:w-auto"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Start a chapter
          </motion.a>
          <motion.a
            href="#waitlist"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-[#1C1A16]/20 text-[#1C1A16] text-sm font-semibold hover:bg-black/5 transition-colors duration-200 w-full sm:w-auto"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Get the app
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll prompt */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <span className="text-[10px] tracking-[0.25em] uppercase text-[#1C1A16]/35 font-mono">
          Scroll to explore
        </span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-[#1C1A16]/30 to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4 }}
        />
      </motion.div>
    </section>
  )
}
