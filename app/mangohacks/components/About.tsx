import { ForkKnife, Plant, UsersThree } from "@phosphor-icons/react/dist/ssr"
import { IconBadge, Reveal, Section } from "./shared"

const ITEMS = [
  { Icon: Plant, h: "Built for first-timers", p: "Workshops start from zero and mentors stay on the floor all day." },
  { Icon: ForkKnife, h: "Everything is covered", p: "Meals, snacks, stickers, and hardware to borrow. Free." },
  { Icon: UsersThree, h: "Judged by builders", p: "Working engineers and founders give feedback and judge demos." },
]

export function About() {
  return (
    <Section id="about" inner="grid items-center gap-10 md:grid-cols-2 md:gap-16">
      <div>
        <Reveal>
          <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-cream [font-stretch:92%] md:text-[3.5rem]">
            Show up with nothing.
            <br />
            <span className="text-mango">Leave with something that works.</span>
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-cream/70">
            Mango Hacks is a free, one-day hackathon for high-school and early-college students across the Bay Area.
          </p>
        </Reveal>
        <ul className="mt-10 space-y-6">
          {ITEMS.map(({ Icon, h, p }, i) => (
            <Reveal as="li" key={h} delay={i * 0.08} className="group flex items-start gap-4">
              <IconBadge>
                <Icon weight="duotone" aria-hidden />
              </IconBadge>
              <div>
                <h3 className="font-display text-lg font-semibold text-cream">{h}</h3>
                <p className="mt-0.5 text-cream/70">{p}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
      <Reveal delay={0.1} className="flex justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/mangohacks/images/felt/mango-laptop.webp"
          alt="Mango mascot working on a laptop"
          loading="lazy"
          className="w-52 animate-bob motion-reduce:animate-none sm:w-64 md:w-80"
        />
      </Reveal>
    </Section>
  )
}
