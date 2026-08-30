import "./cloudhacks.css"

/** Own font stack, loaded only for this route, matching the pixel/terminal
 *  voice of the retro desktop chrome. */
export default function CloudHacksLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=VT323&family=Space+Grotesk:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  )
}
