import { Hammer, Utensils, Users } from "lucide-react"

const ITEMS = [
  { Icon: Hammer, h: "Built for first-timers", p: "Workshops start from zero and mentors stay on the floor all day." },
  { Icon: Utensils, h: "Everything is covered", p: "Meals, snacks, stickers, and hardware to borrow. Free." },
  { Icon: Users, h: "Judged by builders", p: "Working engineers and founders give feedback and judge demos." },
]

export function About() {
  return (
    <section id="about" className="scroll-mt-20 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl font-bold text-cream md:text-5xl">About</h2>
          <p className="mt-6 max-w-lg text-xl text-cream/90">
            Show up with nothing. Leave with something that works.
          </p>
          <p className="mt-4 max-w-lg text-cream/70">
            Mango Hacks is a free, one-day hackathon for high-school and early-college students across the Bay Area.
          </p>
          <ul className="mt-8 space-y-5">
            {ITEMS.map(({ Icon, h, p }) => (
              <li key={h} className="flex gap-4">
                <Icon className="mt-1 h-5 w-5 shrink-0 text-mango" aria-hidden />
                <div>
                  <h3 className="font-display font-semibold text-cream">{h}</h3>
                  <p className="text-cream/70">{p}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center">
          <img
            src="/mangohacks/images/felt/mango-laptop.webp"
            alt="Mango mascot working on a laptop"
            loading="lazy"
            className="w-64 md:w-80"
          />
        </div>
      </div>
    </section>
  )
}
