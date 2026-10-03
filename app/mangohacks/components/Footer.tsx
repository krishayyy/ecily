import { APPLY_URL, CONTACT_EMAIL } from "../config"

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#tracks", label: "Tracks" },
  { href: "#schedule", label: "Schedule" },
  { href: "#venue", label: "Venue" },
  { href: "#sponsor", label: "Sponsors" },
  { href: "#faq", label: "FAQ" },
]

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-12">
      <div className="mx-auto grid max-w-6xl items-center gap-8 text-center md:grid-cols-3 md:text-left">
        <div>
          <div className="flex items-center justify-center gap-2 font-display text-lg font-semibold text-cream md:justify-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/mangohacks/images/felt/mango-body.webp" alt="" width={27} height={31} />
            Mango Hacks
          </div>
          <p className="mt-2 text-sm text-white/60">Dec 5, 2026 at Zoho Corporation, Pleasanton, CA</p>
        </div>
        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-white/70">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-white">{l.label}</a>
          ))}
          <a href={APPLY_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white">Apply</a>
        </nav>
        <div className="text-sm md:text-right">
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-white/70 hover:text-white">{CONTACT_EMAIL}</a>
          <p className="mt-2 text-white/60">
            Run by{" "}
            <a href="https://ecily.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Ecily</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
