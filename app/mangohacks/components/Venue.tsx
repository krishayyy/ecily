import { CalendarBlank } from "@phosphor-icons/react/dist/ssr"
import { IconBadge, Reveal, Section } from "./shared"

export function Venue() {
  return (
    <Section id="venue" inner="grid items-center gap-10 md:grid-cols-2 md:gap-16">
      <Reveal className="md:order-2">
        <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-cream [font-stretch:92%] md:text-[3.5rem]">
          Bay Area
        </h2>
        <dl className="mt-10 space-y-6">
          <div className="group flex items-start gap-4">
            <IconBadge>
              <CalendarBlank weight="duotone" aria-hidden />
            </IconBadge>
            <div>
              <dt className="font-display text-lg font-semibold text-cream">When</dt>
              <dd className="mt-0.5 text-cream/70">Saturday, December 5, 2026, 8:00 AM to 8:30 PM</dd>
            </div>
          </div>
        </dl>
      </Reveal>
      <Reveal delay={0.1} className="md:order-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/mangohacks/images/felt/mango-wave.webp"
          alt="Mango mascot waving"
          loading="lazy"
          className="w-full -rotate-1 rounded-3xl transition-transform duration-500 hover:rotate-0 motion-reduce:transition-none"
        />
      </Reveal>
    </Section>
  )
}
