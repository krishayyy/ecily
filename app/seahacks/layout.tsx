import "./seahacks.css"

/** Own font stack, loaded only for this route. The pairing is deliberate:
 *  Instrument Serif gives the deep-sea imagery a nature-documentary title
 *  voice (high contrast, editorial), Manrope keeps body copy modern and
 *  quiet under it, and IBM Plex Mono carries the timezone/schedule data —
 *  the one place this event's "international" premise is literal. */
export default function SeaHacksLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  )
}
