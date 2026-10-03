import { Button } from "@/components/ui/button"
import { APPLY_URL } from "../config"

export function BigCta() {
  return (
    <section id="apply" className="scroll-mt-20 px-6 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 rounded-3xl bg-night-2 p-8 md:grid-cols-[1fr_auto] md:p-14">
        <div>
          <h2 className="font-display text-4xl font-semibold text-cream md:text-6xl">
            Come build something.
          </h2>
          <p className="mt-4 max-w-xl text-white/70">
            December 5, 2026 at Zoho Corporation in Pleasanton.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <p className="text-white/70">Hackers, applications are open.</p>
            <Button asChild size="lg">
              <a href={APPLY_URL} target="_blank" rel="noopener noreferrer">Apply to hack</a>
            </Button>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <p className="text-white/70">Sponsors, shirt and food orders lock eight weeks out.</p>
            <Button asChild size="lg" variant="outline">
              <a href="#sponsor">Sponsor Mango Hacks</a>
            </Button>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/mangohacks/images/felt/mango-cheer.webp"
          alt=""
          className="mx-auto h-56 w-auto md:h-72"
          loading="lazy"
        />
      </div>
    </section>
  )
}
