"use client"

import { useEffect, useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion"
import { useReducedMotionSafe } from "./shared"

type Pose = "body" | "wave" | "laptop" | "cheer"

/** What the mango does and says in each section. */
const BEATS: Record<string, { pose: Pose; lines: string[] }> = {
  about: { pose: "wave", lines: ["never coded? perfect.", "you don't need a team either"] },
  venue: { pose: "body", lines: ["real office chairs!!", "the good wifi, too"] },
  tracks: { pose: "laptop", lines: ["pick one. or don't.", "best first hack is my fave"] },
  schedule: { pose: "laptop", lines: ["lunch is at 12:30 btw", "3pm is when I get stuck"] },
  sponsor: { pose: "cheer", lines: ["psst, sponsors get a table", "your logo on my shirt?"] },
  faq: { pose: "body", lines: ["ask away", "it's free. really."] },
}
const ORDER = Object.keys(BEATS)
const POKES = ["hey!", "that tickles", "ok ok I'm up", "apply already :)", "boop"]

const SRC: Record<Pose, string> = {
  body: "/mangohacks/images/felt/mango-body.webp",
  wave: "/mangohacks/images/felt/mango-wave.webp",
  laptop: "/mangohacks/images/felt/mango-laptop.webp",
  cheer: "/mangohacks/images/felt/mango-cheer.webp",
}

/** A small mango that follows you down the page from the bottom-right corner.
 *  It swaps pose per section, says something when you arrive, leans with scroll
 *  speed, glances toward the cursor, and hops when poked. It hides over the hero
 *  and the final CTA, which already have their own mascot. */
export function Companion() {
  const reduce = useReducedMotionSafe()
  const [section, setSection] = useState<string | null>(null)
  const [line, setLine] = useState<string | null>(null)
  const [hop, setHop] = useState(0)
  const said = useRef<Set<string>>(new Set())
  const timer = useRef<ReturnType<typeof setTimeout>>()

  // Which section is under the middle of the viewport
  useEffect(() => {
    const els = [...ORDER, "top", "apply"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setSection(e.target.id))
      },
      { rootMargin: "-50% 0px -50% 0px" },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const beat = section ? BEATS[section] : undefined
  const visible = !!beat

  const say = (text: string, ms = 2800) => {
    clearTimeout(timer.current)
    setLine(text)
    timer.current = setTimeout(() => setLine(null), ms)
  }

  // Speak once on first arrival in each section
  useEffect(() => {
    if (!section || !beat || said.current.has(section)) return
    said.current.add(section)
    const t = setTimeout(() => say(beat.lines[0]), 450)
    return () => clearTimeout(t)
  }, [section, beat])

  useEffect(() => () => clearTimeout(timer.current), [])

  // Lean into the scroll: fast scrolling tilts it, it springs back when you stop
  const { scrollY } = useScroll()
  const vel = useVelocity(scrollY)
  const lean = useSpring(useTransform(vel, [-2500, 0, 2500], [10, 0, -10]), { stiffness: 140, damping: 18 })

  // Glance toward the cursor
  const mx = useMotionValue(0)
  const glance = useSpring(useTransform(mx, [-1, 1], [-6, 6]), { stiffness: 80, damping: 14 })
  useEffect(() => {
    if (reduce) return
    const onMove = (e: PointerEvent) => {
      // cursor relative to the mango sitting at the bottom-right
      const dx = (e.clientX - (window.innerWidth - 60)) / window.innerWidth
      mx.set(Math.max(-1, Math.min(1, dx * 2)))
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [mx, reduce])

  const rotate = useTransform([lean, glance] as const, ([l, g]: number[]) => (reduce ? 0 : l + g))

  const poke = () => {
    setHop((h) => h + 1)
    const pool = beat ? [...beat.lines.slice(1), ...POKES] : POKES
    say(pool[Math.floor(Math.random() * pool.length)])
  }

  const pose = beat?.pose ?? "body"

  return (
    <div className="pointer-events-none fixed bottom-0 right-3 z-40 flex flex-col items-end md:right-6" aria-hidden>
      <AnimatePresence>
        {visible && line && (
          <motion.div
            key={line}
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 26 }}
            className="relative mb-1.5 mr-3 max-w-[9.5rem] origin-bottom-right rounded-2xl rounded-br-sm bg-cream px-3 py-1.5 font-hand text-base leading-tight text-night shadow-lg shadow-black/20 md:mb-2 md:mr-4 md:max-w-[12rem] md:px-3.5 md:py-2 md:text-lg"
          >
            {line}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {visible && (
          <motion.button
            type="button"
            tabIndex={-1}
            onClick={poke}
            initial={reduce ? { opacity: 0 } : { y: 140 }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            exit={reduce ? { opacity: 0 } : { y: 160 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="pointer-events-auto relative h-16 w-14 cursor-pointer md:h-32 md:w-28"
          >
            <motion.div
              key={hop}
              className="h-full w-full origin-bottom"
              style={{ rotate }}
              animate={hop && !reduce ? { y: [0, -26, 0], scaleY: [1, 1.06, 0.94, 1] } : undefined}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.img
                  key={pose}
                  src={SRC[pose]}
                  alt=""
                  draggable={false}
                  initial={{ opacity: 0, scale: 0.85, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: 10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="absolute inset-0 h-full w-full select-none object-contain object-bottom drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)]"
                />
              </AnimatePresence>
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
