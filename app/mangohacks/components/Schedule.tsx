"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const SCHEDULE = [
  { t: "8:00 AM", h: "Doors and breakfast", p: "Check in, grab food, find people to build with." },
  { t: "9:00 AM", h: "Opening ceremony", p: "Rules, prizes, and the ten minutes that make everyone want to start." },
  { t: "10:00 AM", h: "Beginner workshops", p: "Start-from-zero sessions plus workshops run by our sponsors." },
  { t: "12:30 PM", h: "Lunch", p: "Food, and the first wall almost everybody hits." },
  { t: "3:00 PM", h: "Mentor sweep", p: "Engineers walk the floor, unstick projects, and answer the dumb questions for free." },
  { t: "6:00 PM", h: "Dinner and submissions", p: "Last push, then everything gets locked." },
  { t: "7:00 PM", h: "Demos", p: "Every team presents to real judges." },
  { t: "8:30 PM", h: "Awards and closing", p: "Trophies, photos, and the group chat that outlasts the day." },
]

export function Schedule() {
  const refs = useRef<(HTMLLIElement | null)[]>([])
  const [seen, setSeen] = useState<Set<number>>(new Set())

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        setSeen((prev) => {
          const next = new Set(prev)
          entries.forEach((e) => {
            if (e.isIntersecting) next.add(Number((e.target as HTMLElement).dataset.i))
          })
          return next
        })
      },
      { rootMargin: "-45% 0px -45% 0px" },
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="schedule" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="font-display text-4xl font-bold text-cream md:text-5xl">The day</h2>
        <ol className="mt-12 border-l border-white/20">
          {SCHEDULE.map((s, i) => (
            <li
              key={s.t}
              data-i={i}
              ref={(el) => {
                refs.current[i] = el
              }}
              className={cn(
                "relative pb-10 pl-8 transition-opacity duration-500 last:pb-0",
                seen.has(i) ? "opacity-100" : "opacity-50",
              )}
            >
              <span
                className={cn(
                  "absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full transition-colors duration-500",
                  seen.has(i) ? "bg-mango" : "bg-white/30",
                )}
              />
              <time className="font-display text-sm font-semibold text-mango">{s.t}</time>
              <h3 className="font-display text-xl font-semibold text-cream">{s.h}</h3>
              <p className="mt-1 text-cream/70">{s.p}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
