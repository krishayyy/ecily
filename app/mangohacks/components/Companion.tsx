"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, animate, motion, useMotionValue } from "framer-motion"
import { MangoSprite } from "./MangoSprite"
import { useReducedMotionSafe } from "./shared"

type Pose = "body" | "wave" | "laptop" | "cheer"
const BEATS: Record<string, { pose: Pose; lines: string[] }> = {
  about: { pose: "wave", lines: ["never coded? perfect.", "you don't need a team either"] },
  venue: { pose: "body", lines: ["real office chairs!!", "the good wifi, too"] },
  tracks: { pose: "laptop", lines: ["pick one. or don't.", "best first hack is my fave"] },
  schedule: { pose: "laptop", lines: ["lunch is at 12:30 btw", "3pm is when I get stuck"] },
  sponsor: { pose: "cheer", lines: ["psst, sponsors get a table", "your logo on my shirt?"] },
  organizers: { pose: "wave", lines: ["meet the people behind it!", "say hi at the event"] },
  faq: { pose: "body", lines: ["ask away", "it's free. really."] },
}
const ORDER = Object.keys(BEATS)
const POKES = ["hey!", "that tickles", "ok ok I'm up", "apply already :)", "boop"]
const SRC: Record<Pose, string> = {
  body: "/mangohacks/images/sprite/mango-idle.webp",
  wave: "/mangohacks/images/felt/mango-wave.webp",
  laptop: "/mangohacks/images/felt/mango-laptop.webp",
  cheer: "/mangohacks/images/felt/mango-cheer.webp",
}

type Drag = { id: number; clientX: number; clientY: number; x: number; y: number; moved: boolean }

/** A corner companion. Only a deliberate drag can move it; on release it walks home. */
export function Companion() {
  const reduce = useReducedMotionSafe()
  const [section, setSection] = useState<string | null>(null)
  const [line, setLine] = useState<string | null>(null)
  const [returning, setReturning] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [hop, setHop] = useState(0)
  const said = useRef<Set<string>>(new Set())
  const speechTimer = useRef<ReturnType<typeof setTimeout>>()
  const drag = useRef<Drag | null>(null)
  const animations = useRef<{ stop: () => void }[]>([])
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  useEffect(() => {
    const els = [...ORDER, "top", "apply"].map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting && setSection(entry.target.id))
    }, { rootMargin: "-50% 0px -50% 0px" })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  const beat = section ? BEATS[section] : undefined
  const visible = !!beat
  const say = (text: string, duration = 2800) => {
    clearTimeout(speechTimer.current)
    setLine(text)
    speechTimer.current = setTimeout(() => setLine(null), duration)
  }
  useEffect(() => {
    if (!section || !beat || said.current.has(section)) return
    said.current.add(section)
    const timer = setTimeout(() => say(beat.lines[0]), 450)
    return () => clearTimeout(timer)
  }, [section, beat])
  useEffect(() => () => {
    clearTimeout(speechTimer.current)
    animations.current.forEach(a => a.stop())
  }, [])

  const poke = () => {
    setHop(h => h + 1)
    const pool = beat ? [...beat.lines.slice(1), ...POKES] : POKES
    say(pool[Math.floor(Math.random() * pool.length)])
  }
  const onDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return
    animations.current.forEach(a => a.stop())
    setReturning(false)
    drag.current = { id: event.pointerId, clientX: event.clientX, clientY: event.clientY, x: x.get(), y: y.get(), moved: false }
    event.currentTarget.setPointerCapture(event.pointerId)
  }
  const onMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const start = drag.current
    if (!start || start.id !== event.pointerId) return
    const dx = event.clientX - start.clientX
    const dy = event.clientY - start.clientY
    if (Math.hypot(dx, dy) > 6) { start.moved = true; setDragging(true) }
    if (!start.moved) return
    const width = window.innerWidth < 768 ? 56 : 112
    const height = window.innerWidth < 768 ? 70 : 140
    x.set(Math.min(0, Math.max(-(window.innerWidth - width - 16), start.x + dx)))
    y.set(Math.min(0, Math.max(-(window.innerHeight - height - 16), start.y + dy)))
  }
  const onEnd = (event: React.PointerEvent<HTMLButtonElement>) => {
    const start = drag.current
    if (!start || start.id !== event.pointerId) return
    drag.current = null
    setDragging(false)
    if (!start.moved) { poke(); return }
    if (reduce) { x.set(0); y.set(0); return }
    setReturning(x.get() < -8)
    const duration = Math.max(0.45, Math.min(1.1, Math.hypot(x.get(), y.get()) / 340))
    animations.current = [
      animate(x, 0, { duration, ease: "easeInOut", onComplete: () => setReturning(false) }),
      animate(y, 0, { duration, ease: "easeInOut" }),
    ]
  }

  return (
    <div className="pointer-events-none fixed bottom-0 right-3 z-40 md:right-6">
      <motion.div style={{ x, y }} className="flex flex-col items-end">
        <AnimatePresence>
          {visible && line && <motion.div
            key={line}
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            className="mb-2 mr-3 max-w-[9.5rem] rounded-2xl rounded-br-sm bg-cream px-3 py-1.5 font-hand text-base leading-tight text-night shadow-lg shadow-black/20 md:mr-4 md:max-w-[12rem] md:px-3.5 md:py-2 md:text-lg"
          >{line}</motion.div>}
        </AnimatePresence>
        <AnimatePresence>
          {visible && <motion.button
            type="button"
            aria-label="Talk to the mango mascot"
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onEnd}
            onPointerCancel={onEnd}
            onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); poke() } }}
            initial={reduce ? { opacity: 0 } : { y: 140 }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            exit={reduce ? { opacity: 0 } : { y: 160 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className={`pointer-events-auto relative h-[70px] w-14 cursor-grab touch-none select-none md:h-[140px] md:w-28 ${dragging ? "cursor-grabbing" : ""}`}
          >
            <motion.span key={hop} className="block h-full w-full" animate={hop && !reduce && !dragging && !returning ? { y: [0, -22, 0] } : undefined} transition={{ duration: 0.45 }}>
              <span data-action={returning ? "walkRight" : beat.pose} className="block h-full w-full">
                {returning ? <MangoSprite action="walkRight" className="w-full drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)]" /> :
                  <img src={SRC[beat.pose]} alt="" draggable={false} className="h-full w-full object-contain object-bottom drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)]" />}
              </span>
            </motion.span>
          </motion.button>}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
