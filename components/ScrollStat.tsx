"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

/* The reveal sentence, split into words. Wrap a run of words in { emphasis: true }
   to render it in the gold accent instead of plain ink-on-dark. */
const segments: { text: string; emphasis?: boolean }[] = [
  { text: "82%", emphasis: true },
  { text: "of adults" },
  { text: "wish personal finance" },
  { text: "had been" },
  { text: "required" },
  { text: "in high school." },
  { text: "Ecily exists so this generation" },
  { text: "doesn't grow up" },
  { text: "with the same regret.", emphasis: true },
]

const words = segments.flatMap((s) =>
  s.text.split(" ").map((w) => ({ word: w, emphasis: s.emphasis }))
)

function Word({
  word,
  emphasis,
  index,
  total,
  progress,
}: {
  word: string
  emphasis?: boolean
  index: number
  total: number
  progress: import("framer-motion").MotionValue<number>
}) {
  // Spread word reveals across the first 85% of scroll, leaving a settled beat at the end.
  const start = (index / total) * 0.85
  const end = start + 0.85 / total
  const opacity = useTransform(progress, [start, end], [0.18, 1])

  return (
    <motion.span
      style={{ opacity }}
      className={emphasis ? "text-[#C9A96E]" : "text-white"}
    >
      {word}{" "}
    </motion.span>
  )
}

export default function ScrollStat() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  return (
    <section ref={ref} style={{ height: "250vh" }} className="relative bg-[#14130F]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden px-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,169,110,0.08),transparent_65%)]" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[10px] tracking-[0.25em] uppercase font-mono text-white/30 mb-8"
          >
            Why we exist
          </motion.p>

          <p className="font-display text-[clamp(1.8rem,4.5vw,3.4rem)] font-semibold leading-[1.25] tracking-tight">
            {words.map((w, i) => (
              <Word
                key={i}
                word={w.word}
                emphasis={w.emphasis}
                index={i}
                total={words.length}
                progress={scrollYProgress}
              />
            ))}
          </p>

          <motion.a
            href="https://www.nefe.org/news/2025/04/poll-majority-of-us-adults-want-financial-education-in-high-schools.aspx"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-10 inline-block font-mono text-[11px] uppercase tracking-wider text-white/25 hover:text-[#C9A96E] transition-colors duration-200"
          >
            NEFE National Poll, 2025 ↗
          </motion.a>
        </div>
      </div>
    </section>
  )
}
