"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { APPLY_URL, daysUntilEvent } from "../config"

export function Hero() {
  const [days, setDays] = useState<number | null>(null)
  useEffect(() => setDays(daysUntilEvent()), [])

  return (
    <section id="top" className="relative -mt-16 overflow-hidden bg-night pt-16 text-cream">
      <div className="mx-auto grid min-h-[100svh] max-w-6xl items-center gap-8 px-5 py-24 md:grid-cols-2">
        <div className="relative z-10 text-center md:text-left">
          <h1 className="font-display text-5xl sm:text-7xl">Mango Hacks</h1>
          <p className="mt-4 text-lg text-cream/80">
            Dec 5, 2026 at Zoho, Pleasanton. Free for high schoolers.
          </p>
          <div className="mt-8 flex items-center justify-center gap-6 md:justify-start">
            <Button asChild size="lg" className="bg-mango text-night hover:bg-mango/90">
              <a href={APPLY_URL}>Apply</a>
            </Button>
            <a href="#sponsor" className="underline underline-offset-4 hover:text-mango">
              Sponsor
            </a>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-md">
          <img src="/mangohacks/images/felt/tree.webp" alt="" className="w-full" />
          <img
            src="/mangohacks/images/felt/mango-wave.webp"
            alt="Mango mascot waving"
            className="absolute bottom-0 left-0 w-2/5 origin-bottom animate-sway motion-reduce:animate-none"
          />
          <div className="absolute -bottom-4 right-0 w-2/5 animate-bob motion-reduce:animate-none">
            <img src="/mangohacks/images/felt/sign.webp" alt="" className="w-full" />
            <div className="absolute inset-0 flex flex-col items-center justify-center pb-[18%] text-night">
              <span className="font-display text-3xl leading-none sm:text-4xl">{days ?? ""}</span>
              <span className="font-hand text-sm">days left</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
