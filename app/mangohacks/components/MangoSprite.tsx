"use client"

import { useEffect, useRef, useState } from "react"
import { useReducedMotionSafe } from "./shared"

export type MangoAction = "walkRight" | "walkLeft" | "idle" | "jump" | "laptop" | "wave" | "turn"
// pingpong plays frames forward then back, so loops never visibly "pop" back to frame 0.
const ANIMS: Record<MangoAction, { row: number; frames: number; fps: number; pingpong?: boolean }> = {
  walkRight: { row: 0, frames: 12, fps: 14 },
  walkLeft: { row: 1, frames: 12, fps: 14 },
  idle: { row: 2, frames: 8, fps: 6, pingpong: true },
  jump: { row: 3, frames: 5, fps: 12 },
  laptop: { row: 4, frames: 6, fps: 5, pingpong: true },
  wave: { row: 5, frames: 4, fps: 7, pingpong: true },
  turn: { row: 6, frames: 6, fps: 8 },
}

/** Frame-by-frame felt character. With `once`, plays a single pass then calls onDone.
 *  Paused on the first frame under reduced motion. */
export function MangoSprite({ action, className = "", once = false, onDone }: { action: MangoAction; className?: string; once?: boolean; onDone?: () => void }) {
  const reduce = useReducedMotionSafe()
  const [frame, setFrame] = useState(0)
  const done = useRef(onDone)
  done.current = onDone
  const { row, frames, fps, pingpong } = ANIMS[action]
  useEffect(() => {
    setFrame(0)
    if (reduce) { if (once) done.current?.(); return }
    const cycle = pingpong ? frames * 2 - 2 : frames
    let step = 0
    const id = window.setInterval(() => {
      step++
      if (once && step >= cycle) { window.clearInterval(id); done.current?.(); return }
      const s = step % cycle
      setFrame(s < frames ? s : cycle - s)
    }, 1000 / fps)
    return () => window.clearInterval(id)
  }, [action, reduce, frames, fps, pingpong, once])
  return <span data-action={action} className={`block overflow-hidden ${className}`} style={{ aspectRatio: "112 / 140", backgroundImage: "url('/mangohacks/images/sprite/mango-atlas.webp')", backgroundSize: "1200% 700%", backgroundPosition: `${frame * 100 / 11}% ${row * 100 / 6}%` }} />
}
