import { Nunito, Playfair_Display, Source_Sans_3, Space_Grotesk } from "next/font/google"

// The Website Maker's font pairs that the root layout doesn't already load,
// so gallery cards can show each site in its own type.
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["600"], variable: "--font-playfair", display: "swap" })
const sourceSans = Source_Sans_3({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-source-sans", display: "swap" })
const nunito = Nunito({ subsets: ["latin"], weight: ["400", "600", "800"], variable: "--font-nunito", display: "swap" })
const grotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-grotesk", display: "swap" })

export const galleryFonts = [playfair.variable, sourceSans.variable, nunito.variable, grotesk.variable].join(" ")
