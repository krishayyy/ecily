import "./mangohacks.css"

/** Own font stack, loaded only for this route: the main site's Inter/DM Mono/
 *  Fraunces trio doesn't cover the felt-and-embroidery voice this page needs
 *  (Fredoka for display, Baloo 2 for the signboard, Gaegu for the handwritten
 *  lines), so it pulls its own set instead of stretching the shared one. */
export default function MangoHacksLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Fredoka:wght@400;500;600;700&family=Gaegu:wght@400;700&family=Geist+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  )
}
