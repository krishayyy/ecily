"use client"

import { useEffect, useRef } from "react"
import { useMotionValueEvent, useScroll } from "framer-motion"

/** Tall scroll runway with a pinned canvas. three.js is loaded only once the runway is near the viewport. */
export function Food3D() {
  const runway = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const progress = useRef(0)
  const api = useRef<{ render: () => void; dispose: () => void } | null>(null)
  const visible = useRef(false)
  const dinnerEl = useRef<HTMLParagraphElement>(null)
  const mangoEl = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: runway, offset: ["start start", "end end"] })

  useEffect(() => {
    const el = runway.current
    if (!el || !canvas.current) return
    let dead = false
    const io = new IntersectionObserver(
      ([e]) => {
        visible.current = e.isIntersecting
        if (e.isIntersecting && !api.current) {
          import("./FoodScene").then(({ startFoodScene }) => {
            if (dead || !canvas.current) return
            api.current = startFoodScene(canvas.current, progress)
            api.current.render()
          })
        }
        if (e.isIntersecting) api.current?.render()
      },
      { rootMargin: "200px 0px" },
    )
    io.observe(el)
    return () => {
      dead = true
      io.disconnect()
      api.current?.dispose()
      api.current = null
    }
  }, [])

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progress.current = v
    const fade = (a: number, b: number, c: number, d: number) => Math.max(0, Math.min(1, Math.min((v - a) / (b - a), (d - v) / (d - c))))
    if (dinnerEl.current) dinnerEl.current.style.opacity = String(fade(0.1, 0.2, 0.36, 0.46))
    if (mangoEl.current) mangoEl.current.style.opacity = String(Math.max(0, Math.min(1, (v - 0.5) / 0.08)))
    if (visible.current) api.current?.render()
  })


  return (
    <div ref={runway} className="relative h-[420vh]" aria-hidden>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
        <p ref={dinnerEl} style={{ opacity: 1 }} className="pointer-events-none absolute inset-x-0 top-20 text-center font-display text-3xl font-semibold text-cream md:text-5xl">
          Dinner is <span className="text-mango">pizza.</span>
        </p>
        <p ref={mangoEl} style={{ opacity: 0 }} className="pointer-events-none absolute inset-x-0 top-20 text-center font-display text-3xl font-semibold text-cream md:text-5xl">
          Stay <span className="text-mango">hydrated.</span>
        </p>
      </div>
    </div>
  )
}
