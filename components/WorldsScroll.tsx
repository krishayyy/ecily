"use client"

import { useRef, useState } from "react"
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion"
import { worlds, type World } from "@/lib/worlds"

/* ------------------------------------------------------------------ */
/*  Per-world animated scenes — a small illustration that lives in     */
/*  each world, drawn in that world's accent color.                    */
/* ------------------------------------------------------------------ */

function WorldScene({ id, accent }: { id: number; accent: string }) {
  const common = {
    width: "100%",
    height: "100%",
    viewBox: "0 0 200 200",
    fill: "none" as const,
    stroke: accent,
    strokeWidth: 2.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  }
  const soft = `${accent}22`

  switch (id) {
    // 1 — Budget City: budget category bars that breathe + a coin
    case 1:
      return (
        <svg {...common}>
          <line x1="40" y1="150" x2="170" y2="150" stroke={soft} />
          {[
            { x: 52, h: 55 },
            { x: 86, h: 90 },
            { x: 120, h: 40 },
          ].map((b, i) => (
            <motion.rect
              key={i}
              x={b.x}
              width="22"
              rx="4"
              fill={soft}
              stroke={accent}
              animate={{
                height: [b.h * 0.7, b.h, b.h * 0.7],
                y: [150 - b.h * 0.7, 150 - b.h, 150 - b.h * 0.7],
              }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            />
          ))}
          <motion.circle
            cx="150" cy="60" r="13" fill={soft}
            animate={{ cy: [52, 64, 52] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.text
            x="150" y="65" fontSize="14" fill={accent} stroke="none" textAnchor="middle"
            animate={{ y: [57, 69, 57] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          >
            $
          </motion.text>
        </svg>
      )

    // 2 — Wall Street: an upward trend line that draws itself
    case 2:
      return (
        <svg {...common}>
          {[60, 100, 140].map((y) => (
            <line key={y} x1="36" y1={y} x2="172" y2={y} stroke={soft} />
          ))}
          <motion.polyline
            points="40,140 70,120 95,128 120,86 150,64 172,44"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }}
          />
          <motion.circle
            cx="172" cy="44" r="6" fill={accent} stroke="none"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      )

    // 3 — Tax Town: a document with a deduction line that highlights
    case 3:
      return (
        <svg {...common}>
          <rect x="58" y="36" width="84" height="128" rx="8" fill={soft} />
          {[58, 74, 90, 106].map((y, i) => (
            <line key={i} x1="74" y1={y + 18} x2={i === 2 ? 110 : 126} y2={y + 18} stroke={soft} />
          ))}
          <motion.rect
            x="70" y="118" width="60" height="12" rx="3" fill={accent} stroke="none"
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      )

    // 4 — Credit City: a credit-score gauge that fills
    case 4:
      return (
        <svg {...common}>
          <path d="M50 150 A55 55 0 1 1 150 150" stroke={soft} strokeWidth="10" />
          <motion.path
            d="M50 150 A55 55 0 1 1 150 150"
            strokeWidth="10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0.2, 0.82, 0.55, 0.82] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.text
            x="100" y="138" fontSize="30" fill={accent} stroke="none" textAnchor="middle"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            740
          </motion.text>
        </svg>
      )

    // 5 — First Job: a paycheck stub that floats
    case 5:
      return (
        <svg {...common}>
          <motion.g
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <rect x="44" y="56" width="112" height="88" rx="8" fill={soft} />
            <rect x="44" y="56" width="112" height="24" rx="8" fill={soft} stroke={accent} />
            <text x="56" y="73" fontSize="11" fill={accent} stroke="none">PAYCHECK</text>
            <line x1="58" y1="98" x2="120" y2="98" stroke={soft} />
            <line x1="58" y1="114" x2="104" y2="114" stroke={soft} />
            <line x1="58" y1="130" x2="112" y2="130" stroke={soft} />
            <text x="120" y="135" fontSize="16" fill={accent} stroke="none">$</text>
          </motion.g>
        </svg>
      )

    // 6 — Crypto Zone: a volatile line that keeps morphing
    case 6:
      return (
        <svg {...common}>
          <motion.polyline
            animate={{
              points: [
                "36,110 60,70 84,130 108,60 132,120 156,80 176,108",
                "36,96 60,130 84,72 108,124 132,66 156,128 176,84",
                "36,110 60,70 84,130 108,60 132,120 156,80 176,108",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle cx="100" cy="100" r="26" stroke={soft} />
          <motion.text
            x="100" y="108" fontSize="22" fill={accent} stroke="none" textAnchor="middle"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            ₿
          </motion.text>
        </svg>
      )

    // 7 — Real Estate: a house that gently floats
    case 7:
      return (
        <svg {...common}>
          <motion.g
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M58 100 L100 62 L142 100" fill={soft} />
            <rect x="68" y="100" width="64" height="52" fill={soft} />
            <rect x="90" y="120" width="20" height="32" fill="none" stroke={accent} />
            <rect x="76" y="108" width="14" height="12" fill="none" stroke={accent} />
          </motion.g>
        </svg>
      )

    // 8 — Money Mindset: a head with orbiting thoughts
    default:
      return (
        <svg {...common}>
          <circle cx="100" cy="100" r="64" stroke={soft} />
          <circle cx="100" cy="100" r="30" stroke={accent} fill={soft} />
          <motion.text
            x="100" y="108" fontSize="22" fill={accent} stroke="none" textAnchor="middle"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.4, repeat: Infinity }}
          >
            $
          </motion.text>
          <motion.g
            style={{ transformOrigin: "100px 100px" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          >
            {[0, 120, 240].map((deg) => {
              const r = (deg * Math.PI) / 180
              const cx = 100 + Math.cos(r) * 64
              const cy = 100 + Math.sin(r) * 64
              return <circle key={deg} cx={cx} cy={cy} r="7" fill={accent} stroke="none" />
            })}
          </motion.g>
        </svg>
      )
  }
}

/* ------------------------------------------------------------------ */
/*  A single world panel, crossfaded by scroll progress                */
/* ------------------------------------------------------------------ */

function WorldPanel({
  world,
  index,
  total,
  progress,
}: {
  world: World
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const start = index / total
  const end = (index + 1) / total
  const fade = 0.4 / total

  // First panel is visible at the very top; last stays visible at the bottom.
  // Fade windows must NEVER cross a slot boundary: the outgoing panel reaches
  // opacity 0 exactly at `end` and the incoming one only starts rising at its
  // own `start`. Overlapping windows double-expose two worlds' text mid-scroll,
  // which discrete mouse wheels (big smoothed glides) sit inside long enough
  // to read as broken. A brief dip to dark between worlds is intentional.
  const inputs =
    index === 0
      ? [start, start, end - fade, end]
      : index === total - 1
        ? [start, start + fade, end, end]
        : [start, start + fade, end - fade, end]
  const outputs = index === 0 ? [1, 1, 1, 0] : index === total - 1 ? [0, 1, 1, 1] : [0, 1, 1, 0]

  const opacity = useTransform(progress, inputs, outputs)
  const y = useTransform(progress, [start, end], [50, -50])
  const sceneScale = useTransform(progress, [start, end], [0.92, 1.08])

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      {/* color block for this world */}
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(70% 70% at 50% 45%, ${world.accent}3D, ${world.accent}14 55%, transparent 85%)` }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-[clamp(1.5rem,7vw,6rem)] grid md:grid-cols-2 items-center gap-10">
        {/* Text column */}
        <motion.div style={{ y }} className="order-2 md:order-1">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#1C1A16]/55 font-mono mb-5 block">
            {world.label}
          </span>
          <h2 className="font-display text-[clamp(2.8rem,8vw,6.5rem)] font-semibold leading-[0.95] tracking-tight text-[#1C1A16] mb-5">
            {world.name}
          </h2>
          <p className="text-lg sm:text-xl text-[#1C1A16]/70 mb-9 max-w-md font-medium">
            {world.tagline}
          </p>
          <div
            className="rounded-2xl bg-white/70 backdrop-blur-sm border px-6 py-5 max-w-sm shadow-[0_8px_30px_rgba(28,26,22,0.08)]"
            style={{ borderColor: `${world.accent}55` }}
          >
            <span className="text-[10px] tracking-[0.2em] uppercase font-mono block mb-2" style={{ color: world.accent }}>
              {world.feature}
            </span>
            <p className="text-sm text-[#1C1A16]/80 leading-relaxed">{world.detail}</p>
          </div>
        </motion.div>

        {/* Scene column */}
        <motion.div style={{ scale: sceneScale }} className="order-1 md:order-2 flex justify-center">
          <div className="w-[clamp(180px,40vw,320px)] aspect-square">
            <WorldScene id={world.id} accent={world.accent} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  The pinned, scroll-driven worlds story                             */
/* ------------------------------------------------------------------ */

export default function WorldsScroll() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const total = worlds.length

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  // Smooth the raw scroll position with a spring. Mac trackpads scroll in tiny
  // continuous steps (already smooth), but Windows mouse wheels fire big discrete
  // chunks — feeding those straight into useTransform makes the panels jump.
  //
  // Tuning notes (this is the "feel"):
  //  - low mass (0.45) → responds fast, so it tracks the scrollbar tightly with
  //    no laggy rubber-band trailing behind your scroll.
  //  - damping ratio ~1.9 (overdamped) → zero overshoot/bounce, which on scroll
  //    would feel broken; it glides to rest instead.
  //  - stiffness 130 → enough spring to absorb the big Windows wheel steps.
  // Net: identical buttery feel on a Mac trackpad and a Windows mouse wheel.
  const progress = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 30,
    mass: 0.45,
    restDelta: 0.0004,
  })

  useMotionValueEvent(progress, "change", (v) => {
    const i = Math.min(total - 1, Math.max(0, Math.floor(v * total)))
    setActive((prev) => (prev === i ? prev : i))
  })

  const barScaleX = useTransform(progress, [0, 1], [0, 1])

  return (
    <section id="worlds" ref={ref} style={{ height: `${total * 100}vh` }} className="relative bg-[#FBF6EC]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* base vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(28,26,22,0.08)_100%)] pointer-events-none z-20" />

        {/* top progress bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-black/10 z-30">
          <motion.div className="h-full origin-left" style={{ scaleX: barScaleX, backgroundColor: worlds[active].accent }} />
        </div>

        {/* section eyebrow */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30">
          <span className="text-[10px] tracking-[0.3em] uppercase font-mono text-[#1C1A16]/40">
            8 Worlds · One Story
          </span>
        </div>

        {/* panels */}
        {worlds.map((w, i) => (
          <WorldPanel key={w.id} world={w} index={i} total={total} progress={progress} />
        ))}

        {/* world index + dots */}
        <div className="absolute right-5 sm:right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3">
          <span className="font-mono text-xs text-[#1C1A16]/55">{String(active + 1).padStart(2, "0")}</span>
          <div className="flex flex-col gap-2">
            {worlds.map((w, i) => (
              <motion.span
                key={w.id}
                className="block w-1.5 h-1.5 rounded-full"
                animate={{
                  backgroundColor: i === active ? w.accent : "rgba(28,26,22,0.18)",
                  scale: i === active ? 1.5 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
          <span className="font-mono text-xs text-[#1C1A16]/30">{String(total).padStart(2, "0")}</span>
        </div>
      </div>
    </section>
  )
}
