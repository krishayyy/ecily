import { Check, Gift, Leaf, Plant, Tree, TreeEvergreen } from "@phosphor-icons/react/dist/ssr"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { sponsorMailto } from "../config"
import { Heading, IconBadge, Reveal, Section } from "./shared"

const TIERS = [
  { Icon: Plant, name: "Seedling", price: "$500", perks: ["Logo on the site", "Stickers in every bag", "Named at opening", "Send engineers as mentors"] },
  { Icon: Leaf, name: "Branch", price: "$1,000", perks: ["Everything in Seedling", "Logo on the event shirts", "Dedicated table on site", "Host a 30-minute workshop"] },
  { Icon: Tree, name: "Tree", price: "$2,500", perks: ["Everything in Branch", "Seat on the judging panel", "Sponsor a named award", "Resumes from opted-in hackers"] },
  { Icon: TreeEvergreen, name: "Orchard", price: "$3,500", perks: ["Everything in Tree", "Your own project track", "10-minute keynote slot", "First pick of mentor sessions"], top: true },
]

export function Sponsors() {
  return (
    <Section id="sponsor">
      <Heading
        title="Put your name on a room full of builders."
        lede="Two hundred and fifty students spend twelve and a half hours with your tools, your engineers, and your logo. Every tier is negotiable."
        className="max-w-3xl"
      />

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {TIERS.map(({ Icon, name, price, perks, top }, i) => (
          <Reveal
            as="li"
            key={name}
            delay={i * 0.06}
            className={cn(
              "group flex flex-col rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-1 motion-reduce:transition-none",
              top ? "bg-cream text-night" : "border border-cream/10 bg-night-2 text-cream",
            )}
          >
            <div className="flex items-center justify-between">
              <IconBadge tone={top ? "night" : "leaf"} className={top ? "bg-mango/25" : undefined}>
                <Icon weight="duotone" aria-hidden />
              </IconBadge>
              {top && (
                <span className="rounded-full bg-night px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-cream">
                  Title sponsor
                </span>
              )}
            </div>
            <h3 className="mt-6 font-display text-xl font-semibold">{name}</h3>
            <div className="mt-1 font-display text-4xl font-bold tracking-tight [font-stretch:90%]">{price}</div>
            <ul className={cn("mt-6 flex-1 space-y-3 text-sm", top ? "text-night/80" : "text-cream/70")}>
              {perks.map((p) => (
                <li key={p} className="flex items-start gap-2.5">
                  <Check weight="bold" className={cn("mt-0.5 h-4 w-4 shrink-0", top ? "text-night" : "text-leaf")} aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
            <Button asChild variant={top ? "default" : "outline"} className={cn("mt-8 w-full", top && "cta-shine")}>
              <a href={sponsorMailto(name)}>Choose {name}</a>
            </Button>
          </Reveal>
        ))}
      </ul>

      <Reveal className="group mt-5 flex items-start gap-4 rounded-3xl border border-cream/10 p-7">
        <IconBadge>
          <Gift weight="duotone" aria-hidden />
        </IconBadge>
        <div>
          <h3 className="font-display text-lg font-semibold text-cream">In-kind counts too</h3>
          <p className="mt-1 text-cream/70">
            API credits, hardware, food, prizes, printing, and services all count toward a tier at fair value. If none
            of the four fit, tell us what you need and we will build the package around it.
          </p>
        </div>
      </Reveal>
    </Section>
  )
}
