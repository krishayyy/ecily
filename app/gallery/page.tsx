import type { Metadata } from "next"
import Link from "next/link"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import GalleryCard from "@/components/GalleryCard"
import { listGallery, storeConfigured } from "@/lib/siteStore"
import type { SiteCard } from "@/lib/siteBuilder"
import { SITE_URL } from "@/lib/siteUrl"
import { galleryFonts } from "./fonts"

export const dynamic = "force-dynamic"

const PER_PAGE = 24
const TITLE = "Student Website Gallery"
const DESCRIPTION =
  "Real websites built by students with the free Ecily Website Maker, for nonprofits, small businesses, events, and their own portfolios."

type Props = { searchParams: { page?: string } }

function pageNumber(searchParams: Props["searchParams"]): number {
  return Math.max(1, Math.floor(Number(searchParams.page)) || 1)
}

export function generateMetadata({ searchParams }: Props): Metadata {
  const page = pageNumber(searchParams)
  const path = page > 1 ? `/gallery?page=${page}` : "/gallery"
  return {
    metadataBase: new URL(SITE_URL),
    title: page > 1 ? `${TITLE}, page ${page} | Ecily` : `${TITLE} | Ecily`,
    description: DESCRIPTION,
    alternates: { canonical: path },
    openGraph: { type: "website", url: path, title: TITLE, description: DESCRIPTION, siteName: "Ecily" },
    twitter: { card: "summary", title: TITLE, description: DESCRIPTION },
  }
}

async function load(page: number): Promise<{ cards: SiteCard[]; total: number }> {
  if (!storeConfigured) return { cards: [], total: 0 }
  try {
    return await listGallery("approved", (page - 1) * PER_PAGE, PER_PAGE)
  } catch (e) {
    console.error("[gallery] load failed", e)
    return { cards: [], total: 0 }
  }
}

export default async function GalleryPage({ searchParams }: Props) {
  const page = pageNumber(searchParams)
  const { cards, total } = await load(page)
  const pages = Math.max(1, Math.ceil(total / PER_PAGE))

  // Structured data so search engines understand this is a collection of sites.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/gallery`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: total,
      itemListElement: cards.map((c, i) => ({
        "@type": "ListItem",
        position: (page - 1) * PER_PAGE + i + 1,
        url: `${SITE_URL}/s/${c.slug}`,
        name: c.name,
      })),
    },
  }

  return (
    <div className={galleryFonts}>
      <Nav />
      <main className="bg-[#080808] min-h-screen">
        <script
          type="application/ld+json"
          // JSON.stringify output with "<" escaped can't close the script tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />

        {/* Header */}
        <section className="relative px-6 pt-36 pb-14 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,169,110,0.12),transparent_55%)]" />
          <div className="relative max-w-3xl mx-auto text-center">
            <p className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#C9A96E]/70 mb-4">Website Maker gallery</p>
            <h1 className="text-[clamp(2.4rem,6vw,4.5rem)] font-bold text-white leading-[1.04] tracking-tight text-balance">
              Built by students,
              <span className="font-serif italic font-light text-white/60"> for their communities.</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-white/50 max-w-xl mx-auto leading-relaxed">
              Websites for food pantries, bakeries, hackathons, and portfolios, all made with the free Ecily Website Maker.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/build"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-[#C9A96E] text-black text-sm font-semibold hover:bg-[#B8965A] transition-colors duration-200"
              >
                Make your own
              </Link>
              {total > 0 && (
                <span className="text-xs font-mono text-white/35 px-3">
                  {total} {total === 1 ? "site" : "sites"} and counting
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="px-6 pb-24" aria-label="Published sites">
          <div className="max-w-6xl mx-auto">
            {cards.length > 0 ? (
              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                {cards.map((c) => (
                  <li key={c.slug}>
                    <GalleryCard card={c} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="max-w-xl mx-auto rounded-3xl border border-dashed border-white/15 bg-white/[0.02] px-8 py-14 text-center">
                <p className="text-xl font-semibold text-white">{page > 1 ? "Nothing on this page." : "The gallery is waiting for its first site."}</p>
                <p className="mt-2 text-sm text-white/45 leading-relaxed">
                  Publish a site from the Website Maker and tick &ldquo;Show it in the gallery&rdquo;. Once it&apos;s reviewed, it shows up here.
                </p>
                <Link href={page > 1 ? "/gallery" : "/build"} className="mt-6 inline-flex text-sm font-semibold text-[#C9A96E] hover:text-[#dcc08a]">
                  {page > 1 ? "Back to the first page →" : "Be the first →"}
                </Link>
              </div>
            )}

            {pages > 1 && (
              <nav aria-label="Gallery pages" className="mt-16 flex items-center justify-center gap-3 text-sm">
                {page > 1 ? (
                  <Link rel="prev" href={page === 2 ? "/gallery" : `/gallery?page=${page - 1}`} className="px-4 py-2 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/30">
                    ← Newer
                  </Link>
                ) : (
                  <span className="px-4 py-2 text-white/20">← Newer</span>
                )}
                <span className="font-mono text-xs text-white/35">
                  {page} / {pages}
                </span>
                {page < pages ? (
                  <Link rel="next" href={`/gallery?page=${page + 1}`} className="px-4 py-2 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/30">
                    Older →
                  </Link>
                ) : (
                  <span className="px-4 py-2 text-white/20">Older →</span>
                )}
              </nav>
            )}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="relative px-6 py-24 border-t border-white/[0.06] overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,169,110,0.08),transparent_60%)]" />
          <div className="relative max-w-2xl mx-auto text-center">
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-white tracking-tight leading-[1.1]">Your turn.</h2>
            <p className="mt-4 text-white/50 leading-relaxed">
              Pick a template, make it yours, and publish to a real ecily.org link in a few minutes. Free, no account needed.
            </p>
            <Link
              href="/build"
              className="mt-8 inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#C9A96E] text-black text-sm font-semibold hover:bg-[#B8965A] transition-colors duration-200"
            >
              Open the Website Maker
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
