"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Spotlight, { useSpotlight } from "./Spotlight"

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
}

const cubes = [
  { label: "AI", color: "#C9A96E" },
  { label: "CS", color: "#5EA88A" },
  { label: "HC", color: "#EC3750" },
]

function Cube({
  label,
  color,
  floatDelay,
}: {
  label: string
  color: string
  floatDelay: number
}) {
  const [spins, setSpins] = useState(0)
  const size = 84

  const faces = [
    { transform: `rotateY(0deg) translateZ(${size / 2}px)` },
    { transform: `rotateY(90deg) translateZ(${size / 2}px)` },
    { transform: `rotateY(180deg) translateZ(${size / 2}px)` },
    { transform: `rotateY(-90deg) translateZ(${size / 2}px)` },
    { transform: `rotateX(90deg) translateZ(${size / 2}px)` },
    { transform: `rotateX(-90deg) translateZ(${size / 2}px)` },
  ]

  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3.4, delay: floatDelay, repeat: Infinity, ease: "easeInOut" }}
    >
      <button
        type="button"
        onClick={() => setSpins((n) => n + 1)}
        aria-label={`Spin the ${label} cube`}
        className="group cursor-pointer select-none"
        style={{ width: size, height: size, perspective: 800 }}
      >
        <motion.div
          className="relative"
          style={{ width: size, height: size, transformStyle: "preserve-3d" }}
          animate={{ rotateY: spins * 360, rotateX: spins * 360 }}
          transition={{ type: "spring", stiffness: 60, damping: 12 }}
          whileHover={{ scale: 1.06 }}
        >
          {faces.map((f, i) => (
            <div
              key={i}
              className="absolute inset-0 flex items-center justify-center rounded-lg border text-xs font-mono font-semibold tracking-wide"
              style={{
                transform: f.transform,
                backfaceVisibility: "hidden",
                background: `${color}1A`,
                borderColor: `${color}55`,
                color,
              }}
            >
              {label}
            </div>
          ))}
        </motion.div>
      </button>
    </motion.div>
  )
}

export default function HackClubSponsor() {
  const spot = useSpotlight()

  return (
    <section
      onMouseMove={spot.onMouseMove}
      className="relative bg-[#080808] py-28 px-6 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,169,110,0.06),transparent_60%)]" />
      <Spotlight x={spot.x} y={spot.y} />

      <div className="relative max-w-2xl mx-auto text-center">
        <motion.p
          {...fadeUp}
          className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#C9A96E]/70 mb-6"
        >
          Fiscal sponsorship
        </motion.p>

        <motion.h2
          {...fadeUp}
          className="text-[clamp(1.6rem,4vw,2.6rem)] font-bold text-white leading-[1.15] tracking-tight"
        >
          Fiscally sponsored by Hack Club.
        </motion.h2>

        <motion.p
          {...fadeUp}
          className="mt-5 text-sm sm:text-base text-white/50 leading-relaxed max-w-md mx-auto"
        >
          Hack Club, a 501(c)(3) nonprofit, sponsors Ecily so every donation is
          tax-deductible and every dollar goes straight to teaching teens.
        </motion.p>

        <motion.div {...fadeUp} className="mt-12 flex items-center justify-center gap-10">
          {cubes.map((c, i) => (
            <Cube key={c.label} label={c.label} color={c.color} floatDelay={i * 0.3} />
          ))}
        </motion.div>

        <motion.p {...fadeUp} className="mt-8 text-[11px] text-white/25 font-mono">
          click a cube
        </motion.p>
      </div>
    </section>
  )
}
