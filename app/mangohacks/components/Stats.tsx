"use client"

import { useEffect, useRef, useState } from "react"
import { Clock, Gift, Trophy, UsersThree } from "@phosphor-icons/react"

const STATS = [
  { Icon: UsersThree, value: 250, suffix: "", label: "hackers" },
  { Icon: Clock, value: 12.5, suffix: "", label: "hours" },
  { Icon: Trophy, value: 5, suffix: "", label: "tracks" },
  { Icon: Gift, value: 100, suffix: "%", label: "free" },
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
    <section className="mx-auto max-w-6xl px-6">
      <div
        ref={ref}
        className="grid grid-cols-2 divide-cream/10 rounded-3xl bg-night-2 md:grid-cols-4 md:divide-x"
      >
        {STATS.map(({ Icon, value, suffix, label }) => (
          <div key={label} className="group flex flex-col items-center px-4 py-10 text-center">
            <Icon
              weight="duotone"
              className="h-7 w-7 text-mango/80 group-hover:animate-wiggle motion-reduce:group-hover:animate-none"
              aria-hidden
            />
            <div className="mt-3 font-display text-5xl font-bold tracking-tight text-cream tabular-nums [font-stretch:90%]">
              <Count to={value} run={seen} />
              {suffix}
            </div>
            <div className="mt-1 text-sm uppercase tracking-[0.14em] text-cream/60">{label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
