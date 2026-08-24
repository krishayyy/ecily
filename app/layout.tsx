import type { Metadata } from "next"
import { Plus_Jakarta_Sans, DM_Mono } from "next/font/google"
import "./globals.css"

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
})

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  weight: ["300", "400", "500"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Ecily — Literacy for a world run by decisions",
  description:
    "Ecily builds literacy — starting with money, building toward AI — through a teen finance app and student-led chapters teaching it forward, nationwide.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${dmMono.variable} antialiased bg-[#F7F6F1] overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  )
}
