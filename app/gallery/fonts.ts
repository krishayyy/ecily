import localFont from "next/font/local"

// The Website Maker's font pairs that the root layout doesn't already load,
// so gallery cards can show each site in its own type.
// Self-hosted (latin subset) because fetching these from Google Fonts at build
// time crashed the Netlify build inside next/font's Google loader.
const playfair = localFont({ src: "./fonts/playfair-display-600.woff2", weight: "600", variable: "--font-playfair", display: "swap" })
const sourceSans = localFont({ src: "./fonts/source-sans-3-var.woff2", weight: "400 600", variable: "--font-source-sans", display: "swap" })
const nunito = localFont({ src: "./fonts/nunito-var.woff2", weight: "400 800", variable: "--font-nunito", display: "swap" })
const grotesk = localFont({ src: "./fonts/space-grotesk-var.woff2", weight: "400 700", variable: "--font-grotesk", display: "swap" })

export const galleryFonts = [playfair.variable, sourceSans.variable, nunito.variable, grotesk.variable].join(" ")
