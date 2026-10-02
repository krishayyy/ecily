import type { MetadataRoute } from "next"
import { listGallery, storeConfigured } from "@/lib/siteStore"
import { SITES_NOINDEX, SITE_URL } from "@/lib/siteUrl"

export const dynamic = "force-dynamic"

const STATIC = ["", "/hackathons", "/build", "/gallery", "/team", "/support", "/privacy", "/terms"]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: MetadataRoute.Sitemap = STATIC.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === "/gallery" ? "daily" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }))

  // Only gallery-approved student sites are listed: reviewed pages are the ones
  // we want search engines to discover first.
  if (!storeConfigured || SITES_NOINDEX) return pages
  try {
    const { cards } = await listGallery("approved", 0, 1000)
    for (const c of cards) {
      pages.push({
        url: `${SITE_URL}/s/${c.slug}`,
        lastModified: new Date(c.updatedAt),
        changeFrequency: "weekly",
        priority: 0.5,
      })
    }
  } catch (e) {
    console.error("[sitemap] couldn't list gallery", e)
  }
  return pages
}
