"use client"

import { useEffect, useState } from "react"
import { useReducedMotionSafe } from "./shared"

export type MangoAction = "walkRight" | "walkLeft" | "idle" | "jump" | "sit" | "wave" | "turn"
const ANIMS: Record<MangoAction, { row: number; frames: number; fps: number }> = {
  walkRight: { row: 0, frames: 12, fps: 12 },
  walkLeft: { row: 1, frames: 12, fps: 12 },
  idle: { row: 2, frames: 8, fps: 4 },
  jump: { row: 3, frames: 5, fps: 8 },
  sit: { row: 4, frames: 6, fps: 4 },
  wave: { row: 5, frames: 4, fps: 6 },
  turn: { row: 6, frames: 6, fps: 6 },
}

/** Frame-by-frame felt character. Pause entirely under reduced motion. */
export function MangoSprite({ action, className = "" }: { action: MangoAction; className?: string }) {
  const reduce = useReducedMotionSafe()
  const [frame, setFrame] = useState(0)
  const { row, frames, fps } = ANIMS[action]
  useEffect(() => {
    setFrame(0)
    if (reduce) return
    const id = window.setInterval(() => setFrame(f => (f + 1) % frames), 1000 / fps)
    return () => clearInterval(id)
  }, [action, reduce, frames, fps])
  return <span className={`block overflow-hidden ${className}`} style={{ aspectRatio: "112 / 140", backgroundImage: "url('/mangohacks/images/sprite/mango-atlas.webp')", backgroundSize: "1200% 700%", backgroundPosition: `${frame * 100 / 11}% ${row * 100 / 6}%` }} />
}
