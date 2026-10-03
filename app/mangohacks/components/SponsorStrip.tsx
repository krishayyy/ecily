import { sponsorMarks, type SponsorMark } from "../sponsorMarks"

function Mark({ item }: { item: SponsorMark }) {
  const content = <span className="flex min-w-[11rem] items-center justify-center gap-3 px-7 text-cream/75 transition-colors hover:text-cream">
    {item.image ? <img src={item.image} alt="" className="h-9 w-10 object-contain brightness-0 invert opacity-80" /> :
      <span className={`font-display text-4xl font-bold leading-none ${item.name === "Ecily" ? "font-serif italic" : ""}`}>{item.wordmark}</span>}
    <span className="font-display text-sm font-semibold tracking-wide">{item.name}</span>
  </span>
  return item.href ? <a href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.name}>{content}</a> : content
}

export function SponsorStrip() {
  return <section aria-label="Sponsors" className="overflow-hidden border-y border-white/10 bg-night-2 py-5">
    <div className="mx-auto flex max-w-6xl items-center gap-6 px-6">
      <p className="z-10 shrink-0 bg-night-2 pr-4 font-hand text-lg text-mango">supported by</p>
      <div className="relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-[sponsor-scroll_28s_linear_infinite] items-center motion-reduce:animate-none hover:[animation-play-state:paused]">
          {[0, 1].map(copy => <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {sponsorMarks.map(item => <Mark key={item.name} item={item} />)}
          </div>)}
        </div>
      </div>
    </div>
    <style>{`@keyframes sponsor-scroll { to { transform: translateX(-50%); } }`}</style>
  </section>
}
