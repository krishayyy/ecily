"use client"

import { useEffect, useRef, useState } from "react"

const STATS = [
  { value: 250, suffix: "", label: "hackers" },
  { value: 12.5, suffix: "", label: "hours" },
  { value: 5, suffix: "", label: "tracks" },
  { value: 100, suffix: "%", label: "free" },
]

function Count({ to, run }: { to: number; run: boolean }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!run) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setN(to)
    const start = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1200)
      setN(to * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, to])
  return <>{Number.isInteger(to) ? Math.round(n) : n.toFixed(1)}</>
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setSeen(true)
        io.disconnect()
      }
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section className="bg-night-2 text-cream">
      <div ref={ref} className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 py-16 text-center md:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label}>
            <div className="font-display text-5xl text-mango">
              <Count to={s.value} run={seen} />
              {s.suffix}
            </div>
            <div className="mt-2 text-cream/80">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
