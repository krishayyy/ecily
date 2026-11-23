import type { Metadata } from "next"
import MangoHacksApp from "./MangoHacksApp"

export const metadata: Metadata = {
  title: "Mango Hacks 2027",
  description: "A one-day online hackathon for high-school builders. January 23, 2027. Free to attend.",
}

export default function MangoHacksPage() {
  return <MangoHacksApp />
}
