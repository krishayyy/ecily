"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, CalendarBlank, MapPin, Ticket } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { APPLY_URL, daysUntilEvent } from "../config"
import { useReducedMotionSafe } from "./shared"

const FACTS = [
  { Icon: CalendarBlank, label: "Sat, Dec 5, 2026" },
  { Icon: MapPin, label: "Zoho, Pleasanton" },
  { Icon: Ticket, label: "Free for high schoolers" },
]

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const [days, setDays] = useState<number | null>(null)
  useEffect(() => setDays(daysUntilEvent()), [])
  const reduce = useReducedMotionSafe()

  const { scrollY } = useScroll()
  const treeY = useTransform(scrollY, [0, 600], [0, reduce ? 0 : 60])
  const mangoY = useTransform(scrollY, [0, 600], [0, reduce ? 0 : 140])

  const up = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease },
  })

  return (
    <section id="top" className="relative -mt-16 overflow-hidden pt-16 text-cream">
      <div className="mx-auto grid min-h-[100svh] max-w-6xl items-center gap-12 px-6 pb-20 pt-10 md:grid-cols-[1.05fr_1fr] md:gap-8">
        <div className="relative z-10 text-center md:text-left">
          <motion.p {...up(0)} className="font-hand text-2xl text-mango">
            a one-day hackathon
          </motion.p>
          <motion.h1
            {...up(0.08)}
            className="mt-2 font-display text-[clamp(3.5rem,9vw,7rem)] font-bold leading-[0.9] tracking-[-0.035em] [font-stretch:88%]"
          >
            Mango
            <br />
            Hacks
            <span className="text-mango">.</span>
          </motion.h1>

          <motion.ul
            {...up(0.18)}
            className="mt-8 flex flex-col items-center gap-3 text-cream/80 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 md:justify-start"
          >
            {FACTS.map(({ Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon weight="duotone" className="h-5 w-5 text-mango" aria-hidden />
                {label}
              </li>
            ))}
          </motion.ul>

          <motion.div {...up(0.28)} className="mt-10 flex items-center justify-center gap-6 md:justify-start">
            <Button asChild size="lg" className="group">
              <a href={APPLY_URL} target="_blank" rel="noopener noreferrer">
                Apply now
                <ArrowRight
                  weight="bold"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </a>
            </Button>
            <a
              href="#sponsor"
              className="font-display font-semibold text-cream/80 underline decoration-cream/30 underline-offset-[6px] transition-colors hover:text-mango hover:decoration-mango"
            >
              Become a sponsor
            </a>
          </motion.div>
        </div>

        {/* Scene: tree, mascot, and a countdown sign hanging off the branch */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="relative mx-auto aspect-[771/706] w-full max-w-[34rem]"
        >
          <motion.img
            style={{ y: treeY }}
            src="/mangohacks/images/felt/tree.webp"
            alt=""
            className="absolute inset-0 h-full w-full object-contain"
          />

          {/* Sign: rope tops tie onto the branch, swings from there */}
          <motion.div style={{ y: treeY }} className="absolute left-[60%] top-[54.5%] w-[38%]">
            <div className="origin-[52%_0%] animate-swing [container-type:inline-size] motion-reduce:animate-none">
              <img src="/mangohacks/images/felt/sign.webp" alt="" className="w-full" />
              {/* Overlay sized to the light wood panel (measured from the image) */}
              <div
                className="absolute flex flex-col items-center justify-center text-night"
                style={{ left: "14.5%", right: "7.4%", top: "35.6%", bottom: "17%" }}
                aria-label={days === null ? undefined : `${days} days left`}
              >
                <span className="font-display text-[19cqw] font-bold leading-none tracking-tight tabular-nums">
                  {days ?? "\u00a0"}
                </span>
                <span className="mt-[1.5cqw] font-hand text-[8.5cqw] leading-none">days left</span>
              </div>
            </div>
          </motion.div>

          {/* Branch drawn again on top so the ropes loop over it instead of ending in mid-air */}
          <motion.img
            style={{ y: treeY }}
            src="/mangohacks/images/felt/branch.webp"
            alt=""
            className="pointer-events-none absolute left-[68.74%] top-[51.27%] w-[31.26%]"
          />

          <motion.div style={{ y: mangoY }} className="absolute -bottom-[4%] left-[2%] w-[30%]">
            <img
              src="/mangohacks/images/felt/mango-wave.webp"
              alt="Mango mascot waving"
              className="w-full origin-bottom animate-sway motion-reduce:animate-none"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
