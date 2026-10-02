import type { FontId, SiteCard } from "@/lib/siteBuilder"

/** Heading/body faces per Website Maker font pair (CSS variables come from the root layout + app/gallery/fonts.ts). */
const FACES: Record<FontId, { heading: string; weight: number; body: string }> = {
  classic: { heading: "var(--font-serif), Georgia, serif", weight: 500, body: "var(--font-geist-sans), system-ui, sans-serif" },
  modern: { heading: "var(--font-geist-sans), system-ui, sans-serif", weight: 800, body: "var(--font-geist-sans), system-ui, sans-serif" },
  editorial: { heading: "var(--font-playfair), Georgia, serif", weight: 600, body: "var(--font-source-sans), system-ui, sans-serif" },
  friendly: { heading: "var(--font-nunito), system-ui, sans-serif", weight: 800, body: "var(--font-nunito), system-ui, sans-serif" },
  tech: { heading: "var(--font-grotesk), system-ui, sans-serif", weight: 700, body: "var(--font-grotesk), system-ui, sans-serif" },
}

/**
 * A mini "poster" of a published site drawn from its theme and header text.
 * No screenshots or photos, so the gallery stays fast no matter how many sites there are.
 */
export default function GalleryCard({ card, footer }: { card: SiteCard; footer?: React.ReactNode }) {
  const face = FACES[card.font] ?? FACES.classic
  return (
    <article className="group">
      <a
        href={`/s/${card.slug}`}
        target="_blank"
        rel="noopener"
        aria-label={`${card.name}, opens in a new tab`}
        className="block rounded-2xl overflow-hidden border border-white/10 bg-[#141415] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#C9A96E]/50 group-hover:shadow-[0_30px_60px_-20px_rgba(201,169,110,0.25)]"
      >
        {/* Browser chrome */}
        <div className="h-8 flex items-center gap-1.5 px-3 border-b border-white/[0.06]">
          <span className="w-2 h-2 rounded-full bg-white/15" />
          <span className="w-2 h-2 rounded-full bg-white/15" />
          <span className="w-2 h-2 rounded-full bg-white/15" />
          <span className="ml-2 flex-1 truncate rounded-md bg-white/[0.05] px-2 py-0.5 text-[10px] font-mono text-white/40">
            ecily.org/s/{card.slug}
          </span>
        </div>

        {/* Poster */}
        <div
          className="relative aspect-[4/3] overflow-hidden px-6 pt-5 pb-6 flex flex-col"
          style={{ background: card.bg, color: card.text, fontFamily: face.body }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-25 transition-opacity duration-500 group-hover:opacity-40"
            style={{ background: card.accent }}
          />
          <div className="relative flex items-center justify-between gap-3 text-[10px]">
            <span className="truncate" style={{ fontFamily: face.heading, fontWeight: face.weight }}>
              {card.name}
            </span>
            <span aria-hidden className="flex gap-1.5 shrink-0">
              {[14, 18, 12].map((w, i) => (
                <span key={i} className="h-[3px] rounded-full opacity-40" style={{ width: w, background: card.muted }} />
              ))}
            </span>
          </div>

          <div className="relative my-auto">
            {card.eyebrow && (
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] mb-2 truncate" style={{ color: card.accent }}>
                {card.eyebrow}
              </p>
            )}
            <p
              className="text-[clamp(1.15rem,2.1vw,1.45rem)] leading-[1.12] tracking-[-0.01em] line-clamp-3"
              style={{ fontFamily: face.heading, fontWeight: face.weight }}
            >
              {card.heading}
            </p>
            <p className="mt-2 text-[11px] leading-snug line-clamp-2" style={{ color: card.muted }}>
              {card.blurb}
            </p>
            {card.button && (
              <span
                className="mt-3 inline-block px-3 py-1.5 text-[10px] font-semibold"
                style={{ background: card.accent, color: card.onAccent, borderRadius: `max(${card.radius}, 4px)` }}
              >
                {card.button}
              </span>
            )}
          </div>
        </div>
      </a>

      <div className="mt-3 px-1">
        <h2 className="text-sm font-semibold text-white truncate">{card.name}</h2>
        <p className="text-xs text-white/40 line-clamp-1">{card.blurb}</p>
        {footer && <div className="mt-3">{footer}</div>}
      </div>
    </article>
  )
}
