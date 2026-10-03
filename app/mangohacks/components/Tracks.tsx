import { Brain, HandHeart, PaintBrush, Plant, Trophy } from "@phosphor-icons/react/dist/ssr"
import { cn } from "@/lib/utils"
import { Heading, IconBadge, Reveal, Section } from "./shared"

const TRACKS = [
  { Icon: Trophy, h: "Best Overall", p: "The project that makes the whole room quiet down." },
  { Icon: Plant, h: "Best First Hack", p: "Only open to people at their first hackathon. Ever." },
  { Icon: Brain, h: "AI & Machine Learning", p: "Models, agents, and things that think a little." },
  { Icon: HandHeart, h: "Social Impact", p: "Something your own community would actually use." },
  { Icon: PaintBrush, h: "Design & Craft", p: "The one that looks and feels unreasonably good." },
]

export function Tracks() {
  return (
    <Section id="tracks">
      <Heading title="Tracks" lede="Build whatever you want. These are the buckets we hand trophies out of." />
      {/* 6-col grid: two wide cards on top, three on the bottom, so both rows fill edge to edge */}
      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
        {TRACKS.map(({ Icon, h, p }, i) => (
          <Reveal
            as="li"
            key={h}
            delay={i * 0.06}
            className={cn(
              "group flex flex-col rounded-3xl bg-cream p-7 text-night transition-transform duration-300 hover:-translate-y-1 motion-reduce:transition-none",
              i < 2 ? "lg:col-span-3" : "lg:col-span-2",
              i === 4 && "sm:col-span-2 lg:col-span-2",
            )}
          >
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
