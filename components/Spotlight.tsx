"use client"

import { motion, useMotionValue, useSpring, type MotionValue } from "framer-motion"
import type { MouseEvent } from "react"

/** Track cursor position within whatever element spreads `onMouseMove` onto
 *  itself. Pass the returned x/y into <Spotlight> to render the glow. */
export function useSpotlight() {
  const x = useMotionValue(-9999)
  const y = useMotionValue(-9999)

  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left)
    y.set(e.clientY - rect.top)
  }

  return { x, y, onMouseMove }
}

/** A soft radial glow that follows the cursor. Render inside a `relative`
 *  section whose root element spreads the `onMouseMove` from useSpotlight. */
export default function Spotlight({
  x,
  y,
  color = "#C9A96E",
}: {
  x: MotionValue<number>
  y: MotionValue<number>
  color?: string
}) {
  const sx = useSpring(x, { stiffness: 60, damping: 20, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 60, damping: 20, mass: 0.5 })

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute h-[480px] w-[480px] rounded-full blur-[90px]"
        style={{
          left: sx,
          top: sy,
          x: "-50%",
          y: "-50%",
          background: `radial-gradient(circle, ${color}3d, transparent 70%)`,
        }}
      />
    </div>
  )
}
