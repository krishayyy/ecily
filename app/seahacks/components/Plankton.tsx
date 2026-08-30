"use client"

import { useEffect, useRef } from "react"

type Mote = {
  x: number
  y: number
  r: number
  rise: number
  swayAmp: number
  swayRate: number
  phase: number
  twinkleRate: number
  alpha: number
  sprite: number
  depth: number
}

const COLORS = ["#bfefff", "#7fe9ff", "#ffc4ec"]
const COUNT = 260

/** Pre-renders one soft radial dot per colour so the draw loop is a cheap
 *  drawImage rather than a per-particle gradient rebuild — the difference
 *  between 260 motes running smoothly and dropping frames. */
function makeSprites(): HTMLCanvasElement[] {
  return COLORS.map((color) => {
    const size = 64
    const c = document.createElement("canvas")
    c.width = c.height = size
    const g = c.getContext("2d")!
    const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    grad.addColorStop(0, color)
    grad.addColorStop(0.35, color + "80")
    grad.addColorStop(1, color + "00")
    g.fillStyle = grad
    g.fillRect(0, 0, size, size)
    return c
  })
}

/** Bioluminescent marine snow: motes drift upward on a slow sine sway and
 *  breathe in and out of visibility. Drawn additively so overlapping motes
 *  bloom the way real bioluminescence does against dark water. */
export function Plankton() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const sprites = makeSprites()
    let motes: Mote[] = []
    let w = 0
    let h = 0
    let raf = 0

    const seed = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      motes = Array.from({ length: COUNT }, () => {
        // Depth drives size, speed and brightness together, so nearer motes
        // read as nearer instead of just larger.
        const depth = Math.random()
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.6 + depth * 2.6,
          rise: (4 + depth * 16) / 60,
          swayAmp: 6 + depth * 26,
          swayRate: 0.12 + Math.random() * 0.3,
          phase: Math.random() * Math.PI * 2,
          twinkleRate: 0.4 + Math.random() * 1.1,
          alpha: 0.16 + depth * 0.5,
          sprite: Math.random() < 0.12 ? 2 : Math.random() < 0.55 ? 1 : 0,
          depth,
        }
      })
    }

    let t = 0
    const frame = () => {
      t += 1 / 60
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = "lighter"
      for (const m of motes) {
        if (!reduced) {
          m.y -= m.rise
          if (m.y < -20) {
            m.y = h + 20
            m.x = Math.random() * w
          }
        }
        const x = m.x + Math.sin(t * m.swayRate + m.phase) * m.swayAmp
        const twinkle = 0.55 + 0.45 * Math.sin(t * m.twinkleRate + m.phase)
        const size = m.r * 9
        ctx.globalAlpha = m.alpha * (reduced ? 0.8 : twinkle)
        ctx.drawImage(sprites[m.sprite], x - size / 2, m.y - size / 2, size, size)
      }
      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = "source-over"
      raf = requestAnimationFrame(frame)
    }

    seed()
    frame()
    const onResize = () => seed()
    window.addEventListener("resize", onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="sh-plankton" aria-hidden="true" />
}
