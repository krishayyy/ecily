import { ArrowUpRight, CalendarBlank, MapPin } from "@phosphor-icons/react/dist/ssr"
import { Button } from "@/components/ui/button"
import { IconBadge, Reveal, Section } from "./shared"

const MAPS =
  "https://www.google.com/maps/dir/?api=1&destination=" +
  encodeURIComponent("4141 Hacienda Drive, Pleasanton, CA")

const FACTS = [
  { Icon: MapPin, k: "Address", v: "4141 Hacienda Drive, Pleasanton, California" },
  { Icon: CalendarBlank, k: "When", v: "Saturday, December 5, 2026, 8:00 AM to 8:30 PM" },
]

export function Venue() {
  return (
    <Section id="venue" inner="grid items-center gap-10 md:grid-cols-2 md:gap-16">
      <Reveal className="md:order-2">
        <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-cream [font-stretch:92%] md:text-[3.5rem]">
          A real office, not a school gym.
        </h2>
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-cream/70">
          Zoho Corporation is hosting us in Pleasanton. One room, one day, and everything you need already in it.
        </p>
        <dl className="mt-10 space-y-6">
          {FACTS.map(({ Icon, k, v }) => (
            <div key={k} className="group flex items-start gap-4">
              <IconBadge>
                <Icon weight="duotone" aria-hidden />
              </IconBadge>
              <div>
                <dt className="font-display text-lg font-semibold text-cream">{k}</dt>
                <dd className="mt-0.5 text-cream/70">{v}</dd>
              </div>
            </div>
          ))}
        </dl>
        <Button asChild variant="outline" className="group mt-10">
          <a href={MAPS} target="_blank" rel="noopener noreferrer">
            Get directions
            <ArrowUpRight
              weight="bold"
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
          </a>
        </Button>
      </Reveal>
      <Reveal delay={0.1} className="md:order-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/mangohacks/images/felt/venue.webp"
          alt="The Zoho Corporation building in Pleasanton, rendered in felt"
          loading="lazy"
          className="w-full -rotate-1 rounded-3xl transition-transform duration-500 hover:rotate-0 motion-reduce:transition-none"
        />
      </Reveal>
    </Section>
  )
}
