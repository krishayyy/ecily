import { EnvelopeSimple } from "@phosphor-icons/react/dist/ssr"
import { APPLY_URL, CONTACT_EMAIL } from "../config"

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#tracks", label: "Tracks" },
  { href: "#schedule", label: "Schedule" },
  { href: "#venue", label: "Venue" },
  { href: "#sponsor", label: "Sponsors" },
  { href: "/mangohacks/organizers", label: "Organizers" },
  { href: "#faq", label: "FAQ" },
]

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 text-center md:flex-row md:items-start md:justify-between md:text-left">
        <div>
          <div className="flex items-center justify-center gap-2 font-display text-lg font-bold tracking-tight text-cream md:justify-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/mangohacks/images/sprite/mango-idle.webp" alt="" width={21} height={28} />
            Mango Hacks
          </div>
          <p className="mt-2 text-sm text-white/60">Dec 5, 2026 at Zoho Corporation, Pleasanton, CA</p>
        </div>
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/70 md:pt-1">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-mango">{l.label}</a>
          ))}
          <a href={APPLY_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-mango">Apply</a>
        </nav>
        <div className="text-sm md:pt-1 md:text-right">
          <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-2 text-white/70 transition-colors hover:text-mango">
            <EnvelopeSimple weight="duotone" className="h-4 w-4" aria-hidden />
            {CONTACT_EMAIL}
          </a>
          <p className="mt-2 text-white/60">
            Run by{" "}
            <a href="https://ecily.org" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-mango">Ecily</a>
            {" "}and{" "}
            <a href="https://mangoembedded.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-mango">MangoEmbedded</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
