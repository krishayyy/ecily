import type { Metadata } from "next"
import SiteBuilder from "./SiteBuilder"

export const metadata: Metadata = {
  title: "Website Maker | Ecily",
  description:
    "Build a website for a nonprofit, small business, event, or yourself. Free, no sign-up, and you download the real HTML.",
}

export default function BuildPage() {
  return <SiteBuilder />
}
