"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { APPLY_URL } from "../config"

export function BigCta() {
  const reduce = useReducedMotion()
  return (
    <section id="apply" className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-20 md:pb-28">
      <div className="relative grid items-end overflow-hidden rounded-[2rem] bg-mango text-night md:grid-cols-[1.4fr_1fr]">
        <div className="p-8 md:p-14">
          <p className="font-hand text-2xl">see you there?</p>
          <h2 className="mt-1 font-display text-5xl font-bold leading-[0.95] tracking-[-0.03em] [font-stretch:88%] md:text-7xl">
            Come build something.
          </h2>
          <p className="mt-5 max-w-md text-lg text-night/75">
            Saturday, December 5 at Zoho in Pleasanton. Applications are open now.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button asChild size="lg" className="group bg-night text-cream hover:bg-night/90">
              <a href={APPLY_URL} target="_blank" rel="noopener noreferrer">
                Apply to hack
                <ArrowRight
                  weight="bold"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </a>
            </Button>
            <a
              href="#sponsor"
              className="font-display font-semibold underline decoration-night/30 underline-offset-[6px] hover:decoration-night"
            >
              Sponsor Mango Hacks
            </a>
          </div>
        </div>
        <motion.div
          className="flex justify-center px-8 md:justify-end md:pr-14"
          initial={reduce ? false : { y: 120, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/mangohacks/images/felt/mango-cheer.webp"
            alt=""
            loading="lazy"
            className="h-56 w-auto translate-y-3 md:h-80"
          />
        </motion.div>
      </div>
    </section>
  )
}
