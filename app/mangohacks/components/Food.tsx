import { Coffee, ForkKnife, Pizza } from "@phosphor-icons/react/dist/ssr"
import { Food3D } from "./Food3D"
import { IconBadge, Reveal, Section } from "./shared"

const MEALS = [
  { Icon: Coffee, h: "Lunch", p: "12:30 PM, the first wall most people hit." },
  { Icon: ForkKnife, h: "Dinner", p: "6:00 PM, right before submissions lock." },
  { Icon: Pizza, h: "Snacks", p: "All day, so nobody builds hungry." },
]

export function Food() {
  return (
    <Section id="food">
      <Food3D />
      <Reveal className="mt-12 rounded-3xl bg-mango p-8 text-night md:p-12">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-night/70">On the menu</p>
        <h3 className="mt-3 font-display text-5xl font-bold leading-[0.95] tracking-[-0.02em] [font-stretch:92%] md:text-7xl">
          Mango Arizona.
          <br />
          Baja Blast.
        </h3>
        <p className="mt-5 max-w-xl text-lg font-medium text-night/80">
          Yes, Mango Arizona. It is the mascot's drink and there will be plenty of it. Mountain Dew Baja Blast too, and
          likely Costco pizza.
        </p>
      </Reveal>
      <ul className="mt-5 grid gap-5 sm:grid-cols-3">
        {MEALS.map(({ Icon, h, p }, i) => (
          <Reveal as="li" key={h} delay={i * 0.06} className="rounded-3xl bg-cream p-7 text-night">
            <IconBadge tone="night" className="bg-mango/25 text-night">
              <Icon weight="duotone" aria-hidden />
            </IconBadge>
            <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight">{h}</h3>
            <p className="mt-2 text-night/70">{p}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
