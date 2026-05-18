import type { Metadata } from "next"
import { Inter, DM_Mono } from "next/font/google"
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

export const metadata: Metadata = {
  title: "Ecily — Level up your money game",
  description:
    "Ecily teaches teens real financial literacy through 8 interactive worlds, paper trading, and an AI coach. Join the waitlist.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${dmMono.variable} antialiased bg-[#080808] overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  )
}
