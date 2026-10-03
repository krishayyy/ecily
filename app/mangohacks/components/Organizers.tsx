import { InstagramLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr"
import { organizers } from "../organizers"
import { Heading, Reveal, Section } from "./shared"

const linkClass = "text-cream/70 transition-colors hover:text-mango"

// Renders a mono PNG as a mask so it inherits the current text color (and hover color).
function MaskIcon({ src }: { src: string }) {
  return <span aria-hidden className="block h-[22px] w-[22px] bg-current" style={{ maskImage: `url("${src}")`, WebkitMaskImage: `url("${src}")`, maskSize: "contain", WebkitMaskSize: "contain", maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat", maskPosition: "center", WebkitMaskPosition: "center" }} />
}

export function Organizers() {
  return (
    <Section id="organizers" className="bg-night-2">
      <Heading title={<>Meet the <span className="text-mango">organizers.</span></>} lede="The people putting Mango Hacks together." />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {organizers.map((person, i) => (
          <Reveal key={person.name} delay={i * 0.07} className="flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-night">
            <div className="aspect-[4/4.5] overflow-hidden bg-night-3">
              <img src={person.photo} alt={person.name} className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-105" />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <p className="font-hand text-lg text-mango">{person.focus}</p>
              <h3 className="mt-1 font-display text-2xl font-semibold text-cream">{person.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/70">{person.bio}</p>
              {(person.linkedin || person.instagram || person.affiliation) && <div className="mt-auto flex items-center gap-3 pt-5">
                {person.linkedin && <a href={person.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${person.name} on LinkedIn`} className={linkClass}><LinkedinLogo weight="duotone" size={22} /></a>}
                {person.instagram && <a href={person.instagram} target="_blank" rel="noopener noreferrer" aria-label={`${person.name} on Instagram`} className={linkClass}><InstagramLogo weight="duotone" size={22} /></a>}
                {person.affiliation && <a href={person.affiliation.href} {...(person.affiliation.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} aria-label={person.affiliation.name} title={person.affiliation.name} className={linkClass}><MaskIcon src={person.affiliation.icon} /></a>}
              </div>}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
