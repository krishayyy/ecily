import { Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"
import { sponsorMailto } from "../config"

const TIERS = [
  { name: "Seedling", price: "$500", perks: ["Logo on the site", "Stickers in every bag", "Named at opening", "Send engineers as mentors"] },
  { name: "Branch", price: "$1,000", perks: ["Everything in Seedling", "Logo on the event shirts", "Dedicated table on site", "Host a 30-minute workshop"] },
  { name: "Tree", price: "$2,500", perks: ["Everything in Branch", "Seat on the judging panel", "Sponsor a named award", "Resumes from opted-in hackers"] },
  { name: "Orchard", price: "$3,500", perks: ["Everything in Tree", "Your own project track", "10-minute keynote slot", "First pick of mentor sessions"], top: true },
]

export function Sponsors() {
  return (
    <section id="sponsor" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-4xl font-semibold text-cream md:text-5xl">
          Put your name on a room full of builders.
        </h2>
        <p className="mt-4 max-w-2xl text-white/70">
          Two hundred and fifty students spend twelve and a half hours with your tools, your
          engineers, and your logo. Every tier is negotiable, and we are happy to build a package
          around the one or two things that matter to your team.
        </p>

        <div className="mt-10 flex h-1.5 overflow-hidden rounded-full" aria-hidden="true">
          <div className="flex-1 bg-leaf/50" />
          <div className="flex-1 bg-leaf" />
          <div className="flex-1 bg-mango/70" />
          <div className="flex-1 bg-mango" />
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TIERS.map((t) => (
            <Card
              key={t.name}
              className={`flex flex-col ${t.top ? "border-cream bg-cream text-night" : ""}`}
            >
              <CardTitle>{t.name}</CardTitle>
              <div className="mt-2 font-display text-3xl font-semibold">{t.price}</div>
              <ul className={`mt-5 flex-1 space-y-2 text-sm ${t.top ? "text-night/80" : "text-white/70"}`}>
                {t.perks.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <Button asChild variant={t.top ? "default" : "outline"} className="mt-6 w-full">
                <a href={sponsorMailto(t.name)}>Choose {t.name}</a>
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-6 flex items-start gap-4 rounded-2xl border border-white/10 p-6">
          <Gift className="mt-0.5 h-5 w-5 shrink-0 text-mango" aria-hidden="true" />
          <div>
            <h3 className="font-display font-semibold text-cream">In-kind counts too</h3>
            <p className="mt-1 text-sm text-white/70">
              API credits, hardware, food, prizes, printing, and services all count toward a tier at
              fair value. If none of the four fit, tell us what you need and we will build the
              package around it.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
