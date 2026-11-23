"use client"

import { useRef, useState } from "react"
import { motion, useMotionValueEvent, useScroll } from "framer-motion"
import {
  ChalkboardTeacher,
  Confetti,
  Lifebuoy,
  Microphone,
  Presentation,
  Trophy,
} from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import { Heading, Section, useReducedMotionSafe } from "./shared"

const SCHEDULE = [
  { Icon: Microphone, t: "Morning", h: "Opening ceremony", p: "Rules, prizes, and the ten minutes that make everyone want to start." },
  { Icon: ChalkboardTeacher, t: "Morning", h: "Beginner workshops", p: "Start-from-zero sessions plus workshops run by our sponsors." },
  { Icon: Lifebuoy, t: "Midday", h: "Mentor check-ins", p: "Engineers drop in, unstick projects, and answer the dumb questions for free." },
  { Icon: Confetti, t: "Afternoon", h: "Submissions close", p: "Last push, then everything gets locked." },
  { Icon: Presentation, t: "Evening", h: "Demos", p: "Every team presents to real judges." },
  { Icon: Trophy, t: "Evening", h: "Awards and closing", p: "Trophies and the group chat that outlasts the day." },
]

export function Schedule() {
  const listRef = useRef<HTMLOListElement>(null)
  const [reached, setReached] = useState(-1)
  const reduce = useReducedMotionSafe()
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 55%", "end 55%"] })

  // An item lights up once the drawing line reaches it, and stays lit.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setReached(Math.floor(v * (SCHEDULE.length - 1) + 0.15))
  })

  return (
    <Section id="schedule" inner="grid gap-14 md:grid-cols-[1fr_1.4fr] md:gap-16">
      <div className="md:sticky md:top-28 md:self-start">
        <Heading title="The day" lede="One Saturday, online. Exact hours and the joining link go out to registered hackers before the day." />
      </div>

      <ol ref={listRef} className="relative">
        {/* rail + self-drawing progress line, centred on the 48px icon column */}
        <span className="absolute bottom-6 left-6 top-6 w-px -translate-x-1/2 bg-cream/15" aria-hidden />
        <motion.span
          className="absolute bottom-6 left-6 top-6 w-0.5 origin-top -translate-x-1/2 bg-mango"
          style={{ scaleY: reduce ? 1 : scrollYProgress }}
          aria-hidden
        />
        {SCHEDULE.map(({ Icon, t, h, p }, i) => {
          const on = reduce || i <= reached
          return (
            <li
              key={t}
              className="relative grid grid-cols-[48px_1fr] gap-5 pb-10 last:pb-0"
            >
              <span
                className={cn(
                  "relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-500",
                  on ? "scale-100 bg-mango text-night" : "scale-90 bg-night-2 text-cream/50",
                )}
              >
                <Icon weight="duotone" className="h-6 w-6" aria-hidden />
              </span>
              <div className={cn("pt-1 transition-opacity duration-500", on ? "opacity-100" : "opacity-45")}>
                <time className="text-sm font-semibold uppercase tracking-[0.12em] text-mango">{t}</time>
                <h3 className="mt-1 font-display text-xl font-semibold text-cream">{h}</h3>
                <p className="mt-1 text-cream/70">{p}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
