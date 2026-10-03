"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, animate, motion, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from "framer-motion"
import { MangoSprite, type MangoAction } from "./MangoSprite"
import { useReducedMotionSafe } from "./shared"

type Pose = Extract<MangoAction, "idle" | "wave" | "laptop">
const BEATS: Record<string, { pose: Pose; lines: string[] }> = {
  about: { pose: "wave", lines: ["never coded? perfect.", "you don't need a team either", "beginners are the whole point"] },
  venue: { pose: "idle", lines: ["real office chairs!!", "the good wifi, too", "zoho has snacks. probably."] },
  tracks: { pose: "laptop", lines: ["pick one. or don't.", "best first hack is my fave", "hardware counts too!"] },
  schedule: { pose: "laptop", lines: ["lunch is at 12:30 btw", "3pm is when I get stuck", "demos are my favorite part"] },
  sponsor: { pose: "wave", lines: ["psst, sponsors get a table", "your logo on my shirt?", "zoho is hosting us!"] },
  organizers: { pose: "wave", lines: ["meet the people behind it!", "say hi at the event", "they made me :)"] },
  faq: { pose: "idle", lines: ["ask away", "it's free. really.", "click a question!"] },
}
const ORDER = Object.keys(BEATS)
const POKES = ["hey!", "that tickles", "ok ok I'm up", "apply already :)", "boop", "wheee"]
const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)]

type Drag = { id: number; clientX: number; clientY: number; x: number; y: number; moved: boolean }

/** A corner companion built entirely from the sprite sheet so every pose matches.
 *  Talks when you reach a section and occasionally while you read, leans with scroll
 *  speed, hops when poked, and walks home after being dragged. */
export function Companion() {
  const reduce = useReducedMotionSafe()
  const [section, setSection] = useState<string | null>(null)
  const [line, setLine] = useState<{ text: string; id: number } | null>(null)
  const [oneShot, setOneShot] = useState<MangoAction | null>(null)
  const [walking, setWalking] = useState<"walkLeft" | "walkRight" | null>(null)
  const [dragging, setDragging] = useState(false)
  const speechTimer = useRef<ReturnType<typeof setTimeout>>()
  const lineIndex = useRef<Record<string, number>>({})
  const drag = useRef<Drag | null>(null)
  const animations = useRef<{ stop: () => void }[]>([])
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Lean slightly into fast scrolling, spring back upright when it stops.
  const { scrollY } = useScroll()
  const lean = useSpring(useTransform(useVelocity(scrollY), [-2000, 0, 2000], [6, 0, -6]), { stiffness: 120, damping: 16 })
  const rotate = useTransform(lean, v => (reduce || dragging ? 0 : v))

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

  const say = useCallback((text: string, duration = 3200) => {
    clearTimeout(speechTimer.current)
    setLine({ text, id: Date.now() })
    speechTimer.current = setTimeout(() => setLine(null), duration)
  }, [])
  const nextLine = useCallback((id: string) => {
    const lines = BEATS[id].lines
    const i = lineIndex.current[id] ?? 0
    lineIndex.current[id] = i + 1
    return lines[i % lines.length]
  }, [])

  // Speak on every arrival in a section (cycling through its lines), and wave hello.
  useEffect(() => {
    if (!section || !BEATS[section]) { setLine(null); return }
    const timer = setTimeout(() => {
      say(nextLine(section))
      if (BEATS[section].pose !== "laptop") setOneShot("wave")
    }, 500)
    return () => clearTimeout(timer)
  }, [section, say, nextLine])

  // Idle chatter while the reader lingers in a section.
  useEffect(() => {
    if (!section || !BEATS[section]) return
    const id = setInterval(() => { if (!document.hidden && !drag.current) say(nextLine(section)) }, 11000)
    return () => clearInterval(id)
  }, [section, say, nextLine])

  useEffect(() => () => {
    clearTimeout(speechTimer.current)
    animations.current.forEach(a => a.stop())
  }, [])

  const poke = () => {
    setOneShot("jump")
    say(pick(beat ? [...beat.lines, ...POKES] : POKES))
  }
  const onDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return
    animations.current.forEach(a => a.stop())
    setWalking(null)
    drag.current = { id: event.pointerId, clientX: event.clientX, clientY: event.clientY, x: x.get(), y: y.get(), moved: false }
    event.currentTarget.setPointerCapture(event.pointerId)
  }
  const onMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const start = drag.current
    if (!start || start.id !== event.pointerId) return
    const dx = event.clientX - start.clientX
    const dy = event.clientY - start.clientY
    if (!start.moved && Math.hypot(dx, dy) > 6) { start.moved = true; setDragging(true); say("whoa whoa", 1500) }
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
    // Walk home at a steady pace rather than easing like a UI element.
    const distance = Math.hypot(x.get(), y.get())
    const duration = Math.max(0.6, Math.min(2.2, distance / 260))
    setWalking(x.get() < -12 ? "walkRight" : null)
    animations.current = [
      animate(x, 0, { duration, ease: "linear", onComplete: () => { setWalking(null); say("home sweet corner", 1800) } }),
      animate(y, 0, { duration, ease: [0.3, 0, 0.3, 1] }),
    ]
  }

  const action: MangoAction = dragging ? "jump" : walking ?? oneShot ?? beat?.pose ?? "idle"
  const isOneShot = !dragging && !walking && !!oneShot

  return (
    <div className="pointer-events-none fixed bottom-0 right-3 z-40 md:right-6">
      <motion.div style={{ x, y }} className="flex flex-col items-end">
        <AnimatePresence mode="wait">
          {visible && line && <motion.div
            key={line.id}
            role="status"
            initial={{ opacity: 0, y: 10, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95, transition: { duration: 0.15 } }}
            transition={{ type: "spring", stiffness: 420, damping: 24 }}
            className="mb-2 mr-3 max-w-[9.5rem] origin-bottom-right rounded-2xl rounded-br-sm bg-cream px-3 py-1.5 font-hand text-base leading-tight text-night shadow-lg shadow-black/20 md:mr-4 md:max-w-[12rem] md:px-3.5 md:py-2 md:text-lg"
          >{line.text}</motion.div>}
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
            initial={reduce ? { opacity: 0 } : { y: 150 }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            exit={reduce ? { opacity: 0 } : { y: 170 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            className={`pointer-events-auto relative h-[70px] w-14 touch-none select-none md:h-[140px] md:w-28 ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
          >
            <motion.span style={{ rotate }} className="block h-full w-full origin-bottom">
              {/* Soft breathing when standing still; a little bounce while talking. */}
              <motion.span
                className="flex h-full w-full origin-bottom items-end"
                animate={reduce || walking || dragging ? { scaleY: 1, y: 0 } : line ? { y: [0, -3, 0], scaleY: [1, 0.98, 1] } : { scaleY: [1, 1.025, 1] }}
                transition={line ? { duration: 0.5, repeat: Infinity, ease: "easeInOut" } : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <MangoSprite
                  key={isOneShot ? `${action}-${line?.id}` : action}
                  action={action}
                  once={isOneShot}
                  onDone={() => setOneShot(null)}
                  className="w-full drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)]"
                />
              </motion.span>
            </motion.span>
          </motion.button>}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
