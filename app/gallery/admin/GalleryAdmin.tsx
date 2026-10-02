"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import GalleryCard from "@/components/GalleryCard"
import type { SiteCard } from "@/lib/siteBuilder"

const KEY_STORAGE = "ecily-gallery-admin-key"

type Tab = "pending" | "approved"

/** Review queue for the community gallery. Unlocked with SITES_ADMIN_TOKEN. */
export default function GalleryAdmin() {
  const [key, setKey] = useState("")
  const [draft, setDraft] = useState("")
  const [tab, setTab] = useState<Tab>("pending")
  const [cards, setCards] = useState<SiteCard[] | null>(null)
  const [total, setTotal] = useState(0)
  const [error, setError] = useState("")
  const [busySlug, setBusySlug] = useState("")

  useEffect(() => {
    try {
      setKey(sessionStorage.getItem(KEY_STORAGE) || "")
    } catch {
      /* private mode: ask every time */
    }
  }, [])

  const load = useCallback(async () => {
    if (!key) return
    setError("")
    setCards(null)
    try {
      const res = await fetch(`/api/gallery/admin?status=${tab}`, { headers: { Authorization: `Bearer ${key}` }, cache: "no-store" })
      const data = await res.json().catch(() => ({}))
      if (res.status === 403) {
        setKey("")
        try {
          sessionStorage.removeItem(KEY_STORAGE)
        } catch {}
        setError("That admin key didn't work.")
        return
      }
      if (!res.ok) throw new Error(data.error || "Couldn't load.")
      setCards(data.cards)
      setTotal(data.total)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't load.")
      setCards([])
    }
  }, [key, tab])

  useEffect(() => {
    load()
  }, [load])

  const act = async (slug: string, action: "approve" | "reject" | "takedown") => {
    if (action === "takedown" && !window.confirm(`Delete ecily.org/s/${slug} for good? The student loses the published site.`)) return
    setBusySlug(slug)
    setError("")
    try {
      const res = await fetch("/api/gallery/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify({ slug, action }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || "That didn't work.")
      setCards((cs) => cs?.filter((c) => c.slug !== slug) ?? cs)
      setTotal((t) => Math.max(0, t - 1))
    } catch (e) {
      setError(e instanceof Error ? e.message : "That didn't work.")
    } finally {
      setBusySlug("")
    }
  }

  if (!key) {
    return (
      <main className="min-h-screen bg-[#080808] flex items-center justify-center px-6">
        <form
          className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.03] p-8"
          onSubmit={(e) => {
            e.preventDefault()
            const k = draft.trim()
            if (!k) return
            try {
              sessionStorage.setItem(KEY_STORAGE, k)
            } catch {}
            setKey(k)
          }}
        >
          <p className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#C9A96E]/70 mb-3">Gallery review</p>
          <h1 className="text-2xl font-bold text-white tracking-tight">Enter the admin key</h1>
          <p className="mt-2 text-sm text-white/45">This is the SITES_ADMIN_TOKEN value from your hosting settings.</p>
          <input
            type="password"
            value={draft}
            autoFocus
            onChange={(e) => setDraft(e.target.value)}
            aria-label="Admin key"
            className="mt-5 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#C9A96E]/70"
          />
          {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
          <button type="submit" className="mt-5 w-full h-11 rounded-full bg-[#C9A96E] hover:bg-[#B8965A] text-black text-sm font-semibold">
            Unlock
          </button>
        </form>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#080808] px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Link href="/gallery" className="text-xs font-mono text-white/35 hover:text-white/70">
              ← Public gallery
            </Link>
            <h1 className="mt-2 text-3xl font-bold text-white tracking-tight">Gallery review</h1>
            <p className="mt-1 text-sm text-white/45">
              Open each site before approving. Approved sites appear on /gallery and in the sitemap.
            </p>
          </div>
          <div className="inline-flex rounded-full bg-white/[0.06] p-0.5">
            {(["pending", "approved"] as Tab[]).map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={tab === t}
                onClick={() => setTab(t)}
                className={`px-4 h-8 rounded-full text-xs font-medium transition-colors ${
                  tab === t ? "bg-white text-black" : "text-white/55 hover:text-white"
                }`}
              >
                {t === "pending" ? "Waiting for review" : "In the gallery"}
              </button>
            ))}
          </div>
        </div>

        {error && <p role="alert" className="mt-6 text-sm text-red-300">{error}</p>}

        {cards === null ? (
          <p className="mt-16 text-center text-sm font-mono text-white/30">Loading…</p>
        ) : cards.length === 0 ? (
          <p className="mt-16 text-center text-sm text-white/40">
            {tab === "pending" ? "Nothing waiting. Nice." : "No approved sites yet."}
          </p>
        ) : (
          <>
            <p className="mt-8 text-xs font-mono text-white/35">{total} total</p>
            <ul className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {cards.map((c) => (
                <li key={c.slug}>
                  <GalleryCard
                    card={c}
                    footer={
                      <div className="flex flex-wrap gap-1.5">
                        {tab === "pending" && (
                          <button
                            type="button"
                            disabled={busySlug === c.slug}
                            onClick={() => act(c.slug, "approve")}
                            className="h-8 px-3 rounded-full bg-[#C9A96E] hover:bg-[#B8965A] text-black text-xs font-semibold disabled:opacity-50"
                          >
                            Approve
                          </button>
                        )}
                        <button
                          type="button"
                          disabled={busySlug === c.slug}
                          onClick={() => act(c.slug, "reject")}
                          className="h-8 px-3 rounded-full border border-white/15 text-xs text-white/70 hover:text-white disabled:opacity-50"
                        >
                          {tab === "pending" ? "Reject" : "Remove"}
                        </button>
                        <button
                          type="button"
                          disabled={busySlug === c.slug}
                          onClick={() => act(c.slug, "takedown")}
                          title="Delete the published site entirely"
                          className="h-8 px-3 rounded-full text-xs text-red-300/70 hover:text-red-300 disabled:opacity-50"
                        >
                          Take down
                        </button>
                      </div>
                    }
                  />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </main>
  )
}
