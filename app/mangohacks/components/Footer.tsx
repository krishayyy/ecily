import { EnvelopeSimple } from "@phosphor-icons/react/dist/ssr"
import { APPLY_URL, CONTACT_EMAIL } from "../config"
import { MaskIcon } from "./shared"

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#tracks", label: "Tracks" },
  { href: "#schedule", label: "Schedule" },
  { href: "#venue", label: "Venue" },
  { href: "#food", label: "Food" },
  { href: "#sponsor", label: "Sponsors" },
  { href: "/mangohacks/organizers", label: "Organizers" },
  { href: "#faq", label: "FAQ" },
]

export function Footer() {
  return (
    <footer className="border-t border-white/10 pb-24 pt-14 md:pb-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 text-center md:grid-cols-[1fr_auto_1fr] md:items-start md:gap-12 md:text-left">
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2 font-display text-lg font-bold tracking-tight text-cream md:justify-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/mangohacks/images/sprite/mango-idle.webp" alt="" width={21} height={28} />
            Mango Hacks
          </div>
          <p className="text-sm leading-relaxed text-white/60">Dec 5, 2026 at Zoho Corporation,<br className="hidden md:inline" /> Pleasanton, CA</p>
        </div>
        <nav aria-label="Footer" className="mx-auto grid max-w-xs grid-cols-2 gap-x-10 gap-y-3 text-sm text-white/70 sm:max-w-none sm:grid-cols-4 md:pt-1">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-mango">{l.label}</a>
          ))}
          <a href={APPLY_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-mango">Apply</a>
        </nav>
        <div className="space-y-2 text-sm md:pt-1 md:text-right">
          <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-2 text-white/70 transition-colors hover:text-mango">
            <EnvelopeSimple weight="duotone" className="h-4 w-4" aria-hidden />
            {CONTACT_EMAIL}
          </a>
          <div className="flex items-center justify-center gap-3 text-white/60 md:justify-end">
            <span>Run by</span>
            <a href="/" aria-label="Ecily" title="Ecily" className="text-cream/80 transition-colors hover:text-mango"><MaskIcon src="/mangohacks/sponsors/ecily-mono.png" /></a>
            <span>and</span>
            <a href="https://mangoembedded.com/?=mangohacksorg" target="_blank" rel="noopener noreferrer" aria-label="MangoEmbedded" title="MangoEmbedded" className="text-cream/80 transition-colors hover:text-mango"><MaskIcon src="/mangohacks/sponsors/mangoembedded-mono.png" /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
