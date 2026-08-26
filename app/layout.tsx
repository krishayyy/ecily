import type { Metadata } from "next"
import { Inter, DM_Mono, Fraunces } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
})

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  weight: ["300", "400", "500"],
  display: "swap",
})

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Ecily — Level up your money game",
  description:
    "Ecily teaches teens real financial literacy through 8 interactive worlds, paper trading, and an AI coach. Start a chapter at your school, become a State Delegate, and teach it forward.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${dmMono.variable} ${fraunces.variable} antialiased bg-[#080808] overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  )
}
