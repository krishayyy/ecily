import { Fredoka, Gaegu, Inter } from "next/font/google"

const fredoka = Fredoka({ subsets: ["latin"], variable: "--font-fredoka", display: "swap" })
const gaegu = Gaegu({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-gaegu", display: "swap" })
const inter = Inter({ subsets: ["latin"], variable: "--font-mh-inter", display: "swap" })

/** The route owns its own background so the root layout's near-black body
 *  colour never shows through. */
export default function MangoHacksLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${fredoka.variable} ${gaegu.variable} ${inter.variable} min-h-screen bg-night font-[family-name:var(--font-mh-inter)] text-white/90 antialiased`}
    >
      {children}
    </div>
  )
}
