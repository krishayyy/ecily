import type { Metadata } from "next"
import MangoHacksApp from "./MangoHacksApp"

export const metadata: Metadata = {
  title: "Mango Hacks 2026",
  description: "A one-day hackathon for high-school builders. December 5, 2026 at Zoho Corporation, Pleasanton CA. Free to attend.",
}

export default function MangoHacksPage() {
  return <MangoHacksApp />
}
