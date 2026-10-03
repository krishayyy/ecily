import { Bricolage_Grotesque, Gaegu, Inter } from "next/font/google"

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  variable: "--font-bricolage",
  display: "swap",
})
const gaegu = Gaegu({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-gaegu", display: "swap" })
const inter = Inter({ subsets: ["latin"], variable: "--font-mh-inter", display: "swap" })

/** The route owns its own background so the root layout's near-black body
 *  colour never shows through. */
export default function MangoHacksLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${bricolage.variable} ${gaegu.variable} ${inter.variable} min-h-screen overflow-x-clip bg-night font-[family-name:var(--font-mh-inter)] text-white/90 antialiased`}
    >
      {children}
    </div>
  )
}
