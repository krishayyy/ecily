import { Card, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const TRACKS = [
  { h: "Best Overall", p: "The project that makes the whole room quiet down." },
  { h: "Best First Hack", p: "Only open to people at their first hackathon. Ever." },
  { h: "AI & Machine Learning", p: "Models, agents, and things that think a little." },
  { h: "Social Impact", p: "Something your own community would actually use." },
  { h: "Design & Craft", p: "The one that looks and feels unreasonably good." },
]

export function Tracks() {
  return (
    <section id="tracks" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-4xl font-bold text-cream md:text-5xl">Tracks</h2>
        <p className="mt-4 max-w-xl text-cream/70">
          Build whatever you want. These are the buckets we hand trophies out of.
        </p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TRACKS.map((t, i) => (
            <Card
              key={t.h}
              className={cn(
                "border-transparent bg-cream text-night",
                i === 0 && "lg:col-span-2",
              )}
            >
              <CardTitle>{t.h}</CardTitle>
              <p className="mt-2 text-night/70">{t.p}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
