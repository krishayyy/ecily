import { Bricolage_Grotesque, Inter } from "next/font/google"
import localFont from "next/font/local"

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  variable: "--font-bricolage",
  display: "swap",
})
// Gaegu is self-hosted (latin only). Google serves it as ~180 Korean
// unicode-range slices, and next/font downloads all of them at build time,
// which flakes out and crashed the Netlify build.
const gaegu = localFont({
  src: [
    { path: "./fonts/gaegu-400.woff2", weight: "400" },
    { path: "./fonts/gaegu-700.woff2", weight: "700" },
  ],
  variable: "--font-gaegu",
  display: "swap",
})
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
