import "./seahacks.css"

/** Own font stack, loaded only for this route: Fredoka for headings, Nunito
 *  for body copy, and Shantell Sans for hand-lettered accents — a colorful,
 *  bubbly voice for the jellyfish/ocean theme. */
export default function SeaHacksLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;500;600;700&family=Shantell+Sans:wght@500;700&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  )
}
