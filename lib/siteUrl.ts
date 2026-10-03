/** Public origin for canonical links, sitemaps, and social previews. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://ecily.org").replace(/\/+$/, "")

/** Set SITES_NOINDEX=1 to hide every published student site from search engines again. */
export const SITES_NOINDEX = process.env.SITES_NOINDEX === "1"
