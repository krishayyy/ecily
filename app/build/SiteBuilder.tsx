"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  BLOCKS,
  BLOCK_ORDER,
  CORNERS,
  FONTS,
  PALETTES,
  PREVIEW_CSS,
  LIMITS,
  TEMPLATES,
  newBlock,
  renderBody,
  renderHead,
  renderSite,
  sanitizeSite,
  slugify,
  uid,
  type Block,
  type BlockType,
  type Field,
  type Site,
} from "@/lib/siteBuilder"

const STORAGE_KEY = "ecily-website-maker:v1"
/** Sites this browser has published, with the secret tokens that let it edit them. */
const PUBLISH_KEY = "ecily-website-maker:published:v1"

type Owned = { slug: string; token: string; name: string }
type Published = { current: string | null; sites: Owned[] }

function readPublished(): Published {
  try {
    const x = JSON.parse(localStorage.getItem(PUBLISH_KEY) || "null")
    if (x && Array.isArray(x.sites)) {
      const sites = (x.sites as Owned[]).filter(
        (o) => o && typeof o.slug === "string" && typeof o.token === "string" && typeof o.name === "string",
      )
      const current = sites.some((o) => o.slug === x.current) ? (x.current as string) : null
      return { current, sites }
    }
  } catch {
    /* fall through */
  }
  return { current: null, sites: [] }
}

function writePublished(p: Published) {
  try {
    localStorage.setItem(PUBLISH_KEY, JSON.stringify(p))
  } catch {
    /* storage full or blocked; publishing still worked */
  }
}

async function errorFrom(res: Response, fallback: string): Promise<string> {
  try {
    const data = await res.json()
    return typeof data?.error === "string" ? data.error : fallback
  } catch {
    return fallback
  }
}
const GOLD = "#C9A96E"

const FONT_NOTES: Record<string, string> = {
  classic: "Serif headings, clean body",
  modern: "Bold and simple",
  editorial: "Like a magazine",
  friendly: "Rounded and warm",
  tech: "Geometric, a bit nerdy",
}

// ── Small UI pieces ──────────────────────────────────────────

function Icon({ d, size = 15 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  )
}

const ICONS = {
  up: "M18 15l-6-6-6 6",
  down: "M6 9l6 6 6-6",
  copy: "M8 8h12v12H8zM4 16V4h12",
  trash: "M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14",
  plus: "M12 5v14M5 12h14",
  undo: "M9 14L4 9l5-5M4 9h11a5 5 0 010 10h-3",
  desktop: "M3 4h18v12H3zM8 20h8M12 16v4",
  phone: "M7 2h10v20H7zM11 18h2",
  external: "M14 3h7v7M21 3l-9 9M19 14v6H4V5h6",
  download: "M12 3v12M7 10l5 5 5-5M4 21h16",
  close: "M6 6l12 12M18 6L6 18",
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  globe: "M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z",
}

function IconButton({
  label,
  icon,
  onClick,
  disabled,
}: {
  label: string
  icon: keyof typeof ICONS
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      className="w-7 h-7 inline-flex items-center justify-center rounded-md text-white/40 hover:text-white hover:bg-white/[0.08] disabled:opacity-25 disabled:pointer-events-none transition-colors"
    >
      <Icon d={ICONS[icon]} size={14} />
    </button>
  )
}

function Segmented<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T
  options: { value: T; label: React.ReactNode; title?: string }[]
  onChange: (v: T) => void
}) {
  return (
    <div className="inline-flex rounded-full bg-white/[0.06] p-0.5">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          title={o.title}
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={`px-2.5 sm:px-3 h-7 rounded-full text-xs font-medium inline-flex items-center gap-1.5 transition-colors ${
            value === o.value ? "bg-white text-black" : "text-white/55 hover:text-white"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

const inputCls =
  "w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#C9A96E]/70 focus:ring-1 focus:ring-[#C9A96E]/40 transition-colors"

/** Shrink uploads so the page (and localStorage) stays light. */
function readImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(reader.error)
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error("Couldn't read that image"))
      img.onload = () => {
        const max = 1400
        const scale = Math.min(1, max / Math.max(img.width, img.height))
        const canvas = document.createElement("canvas")
        canvas.width = Math.round(img.width * scale)
        canvas.height = Math.round(img.height * scale)
        const ctx = canvas.getContext("2d")
        if (!ctx) return reject(new Error("Canvas unavailable"))
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL("image/jpeg", 0.82))
      }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  })
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: Field
  value: string
  onChange: (v: string) => void
}) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState("")

  if (field.kind === "textarea") {
    return (
      <textarea
        value={value}
        placeholder={field.placeholder}
        onChange={(e) => onChange(e.target.value)}
        rows={Math.min(8, Math.max(3, value.split("\n").length + 1))}
        className={`${inputCls} resize-y leading-relaxed`}
      />
    )
  }

  if (field.kind === "image") {
    const uploaded = value.startsWith("data:")
    return (
      <div>
        <div className="flex gap-2">
          {uploaded ? (
            <div className="flex-1 flex items-center gap-3 rounded-lg bg-black/40 border border-white/10 px-2 py-1.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={value} alt="" className="w-9 h-9 rounded object-cover" />
              <span className="text-xs text-white/50 flex-1">Uploaded photo</span>
            </div>
          ) : (
            <input
              value={value}
              placeholder="Paste an image link, or upload"
              onChange={(e) => onChange(e.target.value)}
              className={`${inputCls} flex-1`}
            />
          )}
          {value ? (
            <button type="button" onClick={() => onChange("")} className="shrink-0 px-3 rounded-lg border border-white/10 text-xs text-white/60 hover:text-white hover:border-white/25">
              Remove
            </button>
          ) : (
            <button type="button" onClick={() => fileRef.current?.click()} className="shrink-0 px-3 rounded-lg border border-white/10 text-xs text-white/60 hover:text-white hover:border-white/25">
              Upload
            </button>
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          className="hidden"
          onChange={async (e) => {
            const file = e.target.files?.[0]
            e.target.value = ""
            if (!file) return
            try {
              setError("")
              onChange(await readImage(file))
            } catch {
              setError("That file didn't work. Try a JPG or PNG.")
            }
          }}
        />
        {error && <p className="mt-1 text-xs text-red-300">{error}</p>}
      </div>
    )
  }

  return (
    <input
      value={value}
      placeholder={field.placeholder}
      onChange={(e) => onChange(e.target.value)}
      inputMode={field.kind === "url" ? "url" : undefined}
      className={inputCls}
    />
  )
}

function Labeled({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block mb-1.5 text-[11px] font-mono uppercase tracking-[0.12em] text-white/40">{label}</span>
      {children}
    </label>
  )
}

function Modal({ onClose, children, wide }: { onClose: () => void; children: React.ReactNode; wide?: boolean }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full ${wide ? "max-w-3xl" : "max-w-lg"} max-h-[90dvh] overflow-y-auto rounded-3xl border border-white/10 bg-[#111112] p-6 sm:p-8 shadow-2xl`}
      >
        <button type="button" aria-label="Close" onClick={onClose} className="absolute top-4 right-4 w-8 h-8 inline-flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-white/10">
          <Icon d={ICONS.close} />
        </button>
        {children}
      </div>
    </div>
  )
}

// ── Main editor ──────────────────────────────────────────────

type SaveState = "idle" | "saved" | "too-big"

export default function SiteBuilder() {
  const [site, setSite] = useState<Site>(() => TEMPLATES[0].build())
  const [loaded, setLoaded] = useState(false)
  const [past, setPast] = useState<Site[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [tab, setTab] = useState<"content" | "design">("content")
  const [view, setView] = useState<"preview" | "code">("preview")
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop")
  const [pane, setPane] = useState<"edit" | "preview">("edit")
  const [showTemplates, setShowTemplates] = useState(false)
  const [showDownloaded, setShowDownloaded] = useState(false)
  const [showPublish, setShowPublish] = useState(false)
  const [published, setPublishedState] = useState<Published>({ current: null, sites: [] })
  const [slugInput, setSlugInput] = useState("")
  const [busy, setBusy] = useState(false)
  const [publishError, setPublishError] = useState("")
  const [publishNote, setPublishNote] = useState("")
  const [copiedWhat, setCopiedWhat] = useState("")
  const [addOpen, setAddOpen] = useState(false)
  const [saveState, setSaveState] = useState<SaveState>("idle")
  const [copied, setCopied] = useState(false)

  const frameRef = useRef<HTMLIFrameElement>(null)
  const frameDocRef = useRef<Document | null>(null)
  const frameHeadRef = useRef("")
  const coalesceRef = useRef({ key: "", at: 0 })
  const scrollPreviewRef = useRef(false)
  const siteRef = useRef(site)
  siteRef.current = site

  const setPublished = useCallback((fn: (p: Published) => Published) => {
    setPublishedState((prev) => {
      const next = fn(prev)
      writePublished(next)
      return next
    })
  }, [])

  /** Pull a published site from the server into the editor (undoable). */
  const loadPublished = useCallback(
    async (slug: string) => {
      setBusy(true)
      setPublishError("")
      try {
        const res = await fetch(`/api/sites/${encodeURIComponent(slug)}`, { cache: "no-store" })
        if (!res.ok) throw new Error(await errorFrom(res, "Couldn't open that site."))
        const remote = sanitizeSite((await res.json())?.site)
        if (!remote) throw new Error("That site couldn't be opened.")
        setPast((p) => [...p.slice(-49), siteRef.current])
        setSite(remote)
        setActiveId(null)
        setPublished((p) => ({ ...p, current: slug }))
        setShowTemplates(false)
        return true
      } catch (e) {
        setPublishError(e instanceof Error ? e.message : "Couldn't open that site.")
        setShowPublish(true)
        return false
      } finally {
        setBusy(false)
      }
    },
    [setPublished],
  )

  // Load the saved site (or offer templates on a first visit), then handle #edit=slug.token links.
  useEffect(() => {
    let hasSaved = false
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const parsed = sanitizeSite(raw ? JSON.parse(raw) : null)
      if (parsed) {
        setSite(parsed)
        hasSaved = true
      }
    } catch {
      /* treat as a first visit */
    }
    const pub = readPublished()
    setPublishedState(pub)

    const m = window.location.hash.match(/^#edit=([a-z0-9-]{3,40})\.([A-Za-z0-9_-]{20,64})$/)
    if (m) {
      const [, slug, token] = m
      history.replaceState(null, "", window.location.pathname + window.location.search)
      const name = pub.sites.find((o) => o.slug === slug)?.name ?? slug
      const sites = [...pub.sites.filter((o) => o.slug !== slug), { slug, token, name }]
      setPublished(() => ({ current: pub.current, sites }))
      loadPublished(slug)
    } else if (!hasSaved) {
      setShowTemplates(true)
    }
    setLoaded(true)
  }, [loadPublished, setPublished])

  // Autosave, debounced.
  useEffect(() => {
    if (!loaded) return
    const t = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(site))
        setSaveState("saved")
      } catch {
        setSaveState("too-big")
      }
    }, 400)
    return () => clearTimeout(t)
  }, [site, loaded])

  /** Every change goes through here so it can be undone. Typing in one field coalesces into a single undo step. */
  const change = useCallback(
    (next: Site, coalesceKey?: string) => {
      const now = Date.now()
      const c = coalesceRef.current
      const merge = coalesceKey && c.key === coalesceKey && now - c.at < 1500
      coalesceRef.current = { key: coalesceKey ?? "", at: now }
      if (!merge) setPast((p) => [...p.slice(-49), site])
      setSite(next)
    },
    [site],
  )

  const undo = useCallback(() => {
    setPast((p) => {
      if (!p.length) return p
      setSite(p[p.length - 1])
      return p.slice(0, -1)
    })
    coalesceRef.current = { key: "", at: 0 }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement
      if (el.closest("input, textarea")) return // let fields keep their own undo
      if ((e.metaKey || e.ctrlKey) && !e.shiftKey && e.key.toLowerCase() === "z") {
        e.preventDefault()
        undo()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [undo])

  // ── Block operations ──

  const updateBlock = (id: string, fn: (b: Block) => Block, coalesceKey?: string) =>
    change({ ...site, blocks: site.blocks.map((b) => (b.id === id ? fn(b) : b)) }, coalesceKey)

  const moveBlock = (id: string, dir: -1 | 1) => {
    const i = site.blocks.findIndex((b) => b.id === id)
    const j = i + dir
    if (i < 0 || j < 0 || j >= site.blocks.length) return
    const blocks = [...site.blocks]
    ;[blocks[i], blocks[j]] = [blocks[j], blocks[i]]
    change({ ...site, blocks })
  }

  const duplicateBlock = (id: string) => {
    const i = site.blocks.findIndex((b) => b.id === id)
    const src = site.blocks[i]
    const copy: Block = { ...src, id: uid(), props: { ...src.props }, items: src.items.map((x) => ({ ...x })) }
    const blocks = [...site.blocks]
    blocks.splice(i + 1, 0, copy)
    change({ ...site, blocks })
    select(copy.id, true)
  }

  const removeBlock = (id: string) => {
    change({ ...site, blocks: site.blocks.filter((b) => b.id !== id) })
    if (activeId === id) setActiveId(null)
  }

  const addBlock = (type: BlockType) => {
    const b = newBlock(type)
    const i = activeId ? site.blocks.findIndex((x) => x.id === activeId) : -1
    const blocks = [...site.blocks]
    blocks.splice(i >= 0 ? i + 1 : blocks.length, 0, b)
    change({ ...site, blocks })
    setAddOpen(false)
    select(b.id, true)
  }

  const select = (id: string | null, scrollPreview: boolean) => {
    scrollPreviewRef.current = scrollPreview
    setActiveId(id)
  }

  const applyTemplate = (id: string) => {
    const t = TEMPLATES.find((x) => x.id === id)
    if (!t) return
    change(t.build())
    setPublished((p) => ({ ...p, current: null })) // a new site, not an edit of the published one
    setActiveId(null)
    setShowTemplates(false)
    setTab("content")
    frameRef.current?.contentWindow?.scrollTo(0, 0)
  }

  // ── Live preview ──
  // The frame is written once per theme; after that only <body> is swapped,
  // so typing doesn't reload fonts or jump the scroll position.

  const previewHead = renderHead({ ...site, name: "" })
  const previewBody = renderBody(site, { preview: true, activeId })

  const onFrameClick = useCallback((e: MouseEvent) => {
    const target = e.target as Element | null
    const doc = frameDocRef.current
    if (!target || !doc) return
    const a = target.closest("a")
    if (a) {
      e.preventDefault()
      const href = a.getAttribute("href") || ""
      if (href.startsWith("#")) {
        const el = href === "#top" ? doc.body : doc.getElementById(href.slice(1))
        el?.scrollIntoView({ behavior: "smooth", block: "start" })
      } else if (href) {
        window.open(a.href, "_blank", "noopener,noreferrer")
      }
    }
    const section = target.closest("[data-block-id]")
    if (section) {
      scrollPreviewRef.current = false
      setActiveId(section.getAttribute("data-block-id"))
      setTab("content")
      setPane("edit")
    }
  }, [])

  useEffect(() => {
    if (!loaded) return
    const frame = frameRef.current
    const doc = frame?.contentDocument
    if (!frame || !doc) return
    if (frameDocRef.current !== doc || frameHeadRef.current !== previewHead || !doc.body) {
      const y = frame.contentWindow?.scrollY ?? 0
      doc.open()
      doc.write(
        `<!doctype html><html lang="en"><head>${previewHead}<style>${PREVIEW_CSS}</style></head><body>${previewBody}</body></html>`,
      )
      doc.close()
      doc.addEventListener("click", onFrameClick)
      frameDocRef.current = doc
      frameHeadRef.current = previewHead
      frame.contentWindow?.scrollTo(0, y)
    } else {
      doc.body.innerHTML = previewBody
    }
  }, [loaded, previewHead, previewBody, onFrameClick])

  // Scroll the preview to whatever was picked in the editor.
  useEffect(() => {
    if (!activeId || !scrollPreviewRef.current) return
    scrollPreviewRef.current = false
    const el = frameDocRef.current?.querySelector(`[data-block-id="${activeId}"]`)
    el?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [activeId])

  // Bring the matching editor card into view when a section is clicked in the preview.
  useEffect(() => {
    if (!activeId) return
    document.getElementById(`block-${activeId}`)?.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }, [activeId])

  // ── Export ──

  const exportHtml = () => renderSite(site)

  const download = () => {
    const blob = new Blob([exportHtml()], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "index.html"
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    setShowDownloaded(true)
  }

  // ── Publishing ──

  const owned = published.sites.find((o) => o.slug === published.current) ?? null
  const origin = typeof window === "undefined" ? "https://ecily.org" : window.location.origin
  const liveUrl = (slug: string) => `${origin}/s/${slug}`

  const tooBig = () => {
    if (JSON.stringify(site).length <= LIMITS.siteBytes) return false
    setPublishError("Your site is too big to publish. Try using fewer or smaller photos.")
    return true
  }

  const openPublish = () => {
    setPublishError("")
    setPublishNote("")
    if (!owned) setSlugInput((v) => v || slugify(site.name))
    setShowPublish(true)
    if (owned) updatePublished()
  }

  const publishNew = async () => {
    const slug = slugify(slugInput)
    setPublishError("")
    if (tooBig()) return
    setBusy(true)
    try {
      const res = await fetch("/api/sites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ site, slug }),
      })
      if (!res.ok) throw new Error(await errorFrom(res, "Couldn't publish right now."))
      const data = (await res.json()) as { slug: string; token: string }
      setPublished((p) => ({
        current: data.slug,
        sites: [...p.sites.filter((o) => o.slug !== data.slug), { slug: data.slug, token: data.token, name: site.name }],
      }))
      setPublishNote("Published just now.")
    } catch (e) {
      setPublishError(e instanceof Error ? e.message : "Couldn't publish right now.")
    } finally {
      setBusy(false)
    }
  }

  const updatePublished = async () => {
    if (!owned) return
    setPublishError("")
    setPublishNote("")
    if (tooBig()) return
    setBusy(true)
    try {
      const res = await fetch(`/api/sites/${owned.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${owned.token}` },
        body: JSON.stringify({ site }),
      })
      if (res.status === 404) {
        setPublished((p) => ({ current: null, sites: p.sites.filter((o) => o.slug !== owned.slug) }))
        setSlugInput(owned.slug)
      }
      if (!res.ok) throw new Error(await errorFrom(res, "Couldn't update right now."))
      setPublished((p) => ({ ...p, sites: p.sites.map((o) => (o.slug === owned.slug ? { ...o, name: site.name } : o)) }))
      setPublishNote("Updated. Changes show up within about 30 seconds.")
    } catch (e) {
      setPublishError(e instanceof Error ? e.message : "Couldn't update right now.")
    } finally {
      setBusy(false)
    }
  }

  const unpublish = async () => {
    if (!owned) return
    if (!window.confirm(`Take ${liveUrl(owned.slug)} offline? Anyone with the link will see "site not found". Your work stays in the editor.`)) return
    setBusy(true)
    setPublishError("")
    try {
      const res = await fetch(`/api/sites/${owned.slug}`, { method: "DELETE", headers: { Authorization: `Bearer ${owned.token}` } })
      if (!res.ok) throw new Error(await errorFrom(res, "Couldn't unpublish right now."))
      setPublished((p) => ({ current: null, sites: p.sites.filter((o) => o.slug !== owned.slug) }))
      setSlugInput(owned.slug)
      setPublishNote("Unpublished. Your work is still here in the editor.")
    } catch (e) {
      setPublishError(e instanceof Error ? e.message : "Couldn't unpublish right now.")
    } finally {
      setBusy(false)
    }
  }

  const copyText = async (what: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedWhat(what)
      setTimeout(() => setCopiedWhat(""), 1600)
    } catch {
      window.prompt("Copy this:", text)
    }
  }

  const openInTab = () => {
    const url = URL.createObjectURL(new Blob([exportHtml()], { type: "text/html" }))
    window.open(url, "_blank", "noopener")
    setTimeout(() => URL.revokeObjectURL(url), 60_000)
  }

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(exportHtml())
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard blocked; the code is still selectable */
    }
  }

  // Uploaded photos are huge base64 strings; keep the code view readable.
  const codeForDisplay = view === "code" ? exportHtml().replace(/data:image\/[a-z]+;base64,[A-Za-z0-9+/=]{40,}/g, "data:image/jpeg;base64,…(your uploaded photo)…") : ""

  if (!loaded) {
    return <div className="h-[100dvh] bg-[#080808] flex items-center justify-center text-white/30 text-sm font-mono">Loading the website maker…</div>
  }

  const palette = PALETTES.find((p) => p.id === site.theme.palette) ?? PALETTES[0]
  const accent = site.theme.accent || palette.accent

  return (
    <div className="h-[100dvh] flex flex-col bg-[#080808] text-white">
      {/* Top bar */}
      <header className="shrink-0 h-14 flex items-center gap-2 sm:gap-3 px-3 sm:px-5 border-b border-white/[0.07]">
        <Link href="/" className="font-serif text-xl text-white">ecily</Link>
        <span className="hidden sm:inline text-white/20">/</span>
        <span className="hidden sm:inline text-sm text-white/70">Website Maker</span>

        <div className="lg:hidden">
          <Segmented
            value={pane}
            onChange={setPane}
            options={[
              { value: "edit", label: "Edit" },
              { value: "preview", label: "Preview" },
            ]}
          />
        </div>

        <div className="ml-auto flex items-center gap-0.5 sm:gap-2">
          <span className="hidden md:inline text-[11px] font-mono text-white/30 mr-2">
            {saveState === "saved" && "Saved in this browser"}
            {saveState === "too-big" && <span className="text-amber-300/80">Too big to autosave. Download to keep it.</span>}
          </span>
          <button
            type="button"
            onClick={undo}
            disabled={!past.length}
            title="Undo"
            className="h-8 px-2.5 inline-flex items-center gap-1.5 rounded-full text-xs text-white/60 hover:text-white hover:bg-white/[0.08] disabled:opacity-30 disabled:pointer-events-none"
          >
            <Icon d={ICONS.undo} size={14} />
            <span className="hidden sm:inline">Undo</span>
          </button>
          <button
            type="button"
            onClick={() => setShowTemplates(true)}
            aria-label="Templates"
            title="Templates and your published sites"
            className="h-8 px-2.5 sm:px-3 inline-flex items-center gap-1.5 rounded-full text-xs text-white/60 hover:text-white hover:bg-white/[0.08]"
          >
            <span className="sm:hidden"><Icon d={ICONS.grid} size={14} /></span>
            <span className="hidden sm:inline">Templates</span>
          </button>
          <button
            type="button"
            onClick={download}
            aria-label="Download"
            title="Download index.html"
            className="h-8 px-2.5 inline-flex items-center gap-1.5 rounded-full text-xs text-white/60 hover:text-white hover:bg-white/[0.08]"
          >
            <Icon d={ICONS.download} size={14} />
            <span className="hidden xl:inline">Download</span>
          </button>
          <button
            type="button"
            onClick={openPublish}
            disabled={busy}
            className="h-8 px-3 sm:px-4 inline-flex items-center gap-1.5 rounded-full bg-[#C9A96E] hover:bg-[#B8965A] disabled:opacity-60 text-black text-xs font-semibold transition-colors"
          >
            <Icon d={ICONS.globe} size={14} />
            {owned ? "Update" : "Publish"}
          </button>
        </div>
      </header>

      <div className="flex-1 min-h-0 flex">
        {/* ── Editor panel ── */}
        <aside className={`${pane === "edit" ? "flex" : "hidden"} lg:flex w-full lg:w-[400px] shrink-0 flex-col border-r border-white/[0.07] min-h-0`}>
          <div className="shrink-0 px-4 pt-4 pb-3 flex items-center justify-between">
            <Segmented
              value={tab}
              onChange={setTab}
              options={[
                { value: "content", label: "Content" },
                { value: "design", label: "Design" },
              ]}
            />
            <span className="hidden sm:inline text-[11px] text-white/30">Tip: click any section in the preview</span>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto px-4 pb-10 space-y-3">
            {tab === "content" ? (
              <>
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 space-y-3">
                  <Labeled label="Site name">
                    <input value={site.name} onChange={(e) => change({ ...site, name: e.target.value }, "site-name")} className={inputCls} />
                  </Labeled>
                  <label className="flex items-center justify-between gap-3 text-sm text-white/70 cursor-pointer">
                    Show a menu bar at the top
                    <input
                      type="checkbox"
                      checked={site.showNav}
                      onChange={(e) => change({ ...site, showNav: e.target.checked })}
                      className="w-4 h-4 accent-[#C9A96E]"
                    />
                  </label>
                </div>

                {site.blocks.map((b, i) => {
                  const def = BLOCKS[b.type]
                  const open = activeId === b.id
                  const summary = b.props.heading || b.props.quote || b.props.eyebrow || def.description
                  return (
                    <div
                      key={b.id}
                      id={`block-${b.id}`}
                      className={`rounded-2xl border transition-colors ${open ? "border-[#C9A96E]/50 bg-white/[0.04]" : "border-white/[0.08] bg-white/[0.02] hover:border-white/15"}`}
                    >
                      <div
                        role="button"
                        tabIndex={0}
                        aria-expanded={open}
                        onClick={() => select(open ? null : b.id, !open)}
                        onKeyDown={(e) => {
                          if (e.target !== e.currentTarget) return
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault()
                            select(open ? null : b.id, !open)
                          }
                        }}
                        className="flex items-center gap-2 pl-4 pr-2 py-3 cursor-pointer select-none"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#C9A96E]/80">{def.label}</p>
                          <p className="text-sm text-white/80 truncate">{summary}</p>
                        </div>
                        <IconButton label="Move up" icon="up" onClick={() => moveBlock(b.id, -1)} disabled={i === 0} />
                        <IconButton label="Move down" icon="down" onClick={() => moveBlock(b.id, 1)} disabled={i === site.blocks.length - 1} />
                        <IconButton label="Duplicate" icon="copy" onClick={() => duplicateBlock(b.id)} />
                        <IconButton label="Delete section" icon="trash" onClick={() => removeBlock(b.id)} />
                      </div>

                      {open && (
                        <div className="px-4 pb-4 space-y-3 border-t border-white/[0.06] pt-4">
                          {def.fields.map((f) => (
                            <Labeled key={f.key} label={f.label}>
                              <FieldInput
                                field={f}
                                value={b.props[f.key] ?? ""}
                                onChange={(v) => updateBlock(b.id, (x) => ({ ...x, props: { ...x.props, [f.key]: v } }), `${b.id}:${f.key}`)}
                              />
                            </Labeled>
                          ))}

                          {def.list && (
                            <div className="pt-1 space-y-2">
                              <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-white/40">{def.list.label}</p>
                              {b.items.map((item, j) => (
                                <div key={j} className="rounded-xl border border-white/[0.07] bg-black/20 p-3 space-y-2.5">
                                  <div className="flex items-center">
                                    <span className="flex-1 text-xs text-white/45">
                                      {def.list!.itemLabel} {j + 1}
                                    </span>
                                    <IconButton
                                      label="Move up"
                                      icon="up"
                                      disabled={j === 0}
                                      onClick={() =>
                                        updateBlock(b.id, (x) => {
                                          const items = [...x.items]
                                          ;[items[j - 1], items[j]] = [items[j], items[j - 1]]
                                          return { ...x, items }
                                        })
                                      }
                                    />
                                    <IconButton
                                      label="Move down"
                                      icon="down"
                                      disabled={j === b.items.length - 1}
                                      onClick={() =>
                                        updateBlock(b.id, (x) => {
                                          const items = [...x.items]
                                          ;[items[j + 1], items[j]] = [items[j], items[j + 1]]
                                          return { ...x, items }
                                        })
                                      }
                                    />
                                    <IconButton
                                      label={`Remove ${def.list!.itemLabel.toLowerCase()}`}
                                      icon="trash"
                                      onClick={() => updateBlock(b.id, (x) => ({ ...x, items: x.items.filter((_, k) => k !== j) }))}
                                    />
                                  </div>
                                  {def.list!.fields.map((f) => (
                                    <Labeled key={f.key} label={f.label}>
                                      <FieldInput
                                        field={f}
                                        value={item[f.key] ?? ""}
                                        onChange={(v) =>
                                          updateBlock(
                                            b.id,
                                            (x) => ({ ...x, items: x.items.map((it, k) => (k === j ? { ...it, [f.key]: v } : it)) }),
                                            `${b.id}:${j}:${f.key}`,
                                          )
                                        }
                                      />
                                    </Labeled>
                                  ))}
                                </div>
                              ))}
                              {b.items.length < def.list.max && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateBlock(b.id, (x) => ({
                                      ...x,
                                      items: [...x.items, Object.fromEntries(def.list!.fields.map((f) => [f.key, ""]))],
                                    }))
                                  }
                                  className="w-full h-9 inline-flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-white/15 text-xs text-white/55 hover:text-white hover:border-white/30"
                                >
                                  <Icon d={ICONS.plus} size={13} />
                                  Add {def.list.itemLabel.toLowerCase()}
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}

                {addOpen ? (
                  <div className="rounded-2xl border border-white/[0.1] bg-white/[0.03] p-3">
                    <div className="flex items-center justify-between px-1 pb-2">
                      <p className="text-xs text-white/60">{activeId ? "Add after the open section" : "Add to the end"}</p>
                      <IconButton label="Cancel" icon="close" onClick={() => setAddOpen(false)} />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {BLOCK_ORDER.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => addBlock(t)}
                          className="text-left rounded-xl border border-white/[0.08] bg-black/20 hover:border-[#C9A96E]/50 p-3 transition-colors"
                        >
                          <p className="text-sm font-semibold text-white">{BLOCKS[t].label}</p>
                          <p className="text-[11px] text-white/45 leading-snug mt-0.5">{BLOCKS[t].description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setAddOpen(true)}
                    className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 text-sm text-white/60 hover:text-white hover:border-[#C9A96E]/60 transition-colors"
                  >
                    <Icon d={ICONS.plus} />
                    Add section
                  </button>
                )}
              </>
            ) : (
              <>
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4">
                  <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-white/40 mb-3">Colors</p>
                  <div className="grid grid-cols-2 gap-2">
                    {PALETTES.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        aria-pressed={site.theme.palette === p.id}
                        onClick={() => change({ ...site, theme: { ...site.theme, palette: p.id, accent: "" } })}
                        className={`flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition-colors ${
                          site.theme.palette === p.id ? "border-[#C9A96E]/70 bg-white/[0.05]" : "border-white/[0.08] hover:border-white/20"
                        }`}
                      >
                        <span className="relative w-8 h-8 rounded-lg border border-white/10 shrink-0" style={{ background: p.bg }}>
                          <span className="absolute right-1 bottom-1 w-3.5 h-3.5 rounded-full" style={{ background: p.accent }} />
                        </span>
                        <span className="text-sm text-white/80">{p.label}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <input
                      type="color"
                      value={accent}
                      onChange={(e) => change({ ...site, theme: { ...site.theme, accent: e.target.value } }, "accent")}
                      className="w-9 h-9 rounded-lg bg-transparent border border-white/10 cursor-pointer"
                      aria-label="Accent color"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-white/80">Accent color</p>
                      <p className="text-[11px] text-white/40">Buttons, links, and highlights</p>
                    </div>
                    {site.theme.accent && (
                      <button type="button" onClick={() => change({ ...site, theme: { ...site.theme, accent: "" } })} className="text-xs text-white/50 hover:text-white">
                        Reset
                      </button>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4">
                  <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-white/40 mb-3">Fonts</p>
                  <div className="space-y-2">
                    {FONTS.map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        aria-pressed={site.theme.font === f.id}
                        onClick={() => change({ ...site, theme: { ...site.theme, font: f.id } })}
                        className={`w-full flex items-center justify-between rounded-xl border px-3 py-2.5 text-left transition-colors ${
                          site.theme.font === f.id ? "border-[#C9A96E]/70 bg-white/[0.05]" : "border-white/[0.08] hover:border-white/20"
                        }`}
                      >
                        <span className="text-sm text-white/85">{f.label}</span>
                        <span className="text-[11px] text-white/40">{FONT_NOTES[f.id]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4">
                  <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-white/40 mb-3">Corners</p>
                  <div className="grid grid-cols-3 gap-2">
                    {CORNERS.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        aria-pressed={site.theme.corners === c.id}
                        onClick={() => change({ ...site, theme: { ...site.theme, corners: c.id } })}
                        className={`flex flex-col items-center gap-2 rounded-xl border py-3 transition-colors ${
                          site.theme.corners === c.id ? "border-[#C9A96E]/70 bg-white/[0.05]" : "border-white/[0.08] hover:border-white/20"
                        }`}
                      >
                        <span className="w-8 h-6 border-2 border-white/60" style={{ borderRadius: c.id === "round" ? 10 : c.id === "soft" ? 5 : 0 }} />
                        <span className="text-xs text-white/70">{c.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </aside>

        {/* ── Preview / code panel ── */}
        <section className={`${pane === "preview" ? "flex" : "hidden"} lg:flex flex-1 min-w-0 flex-col bg-[#0e0e0f]`}>
          <div className="shrink-0 h-12 flex items-center gap-2 px-4 border-b border-white/[0.06]">
            <Segmented
              value={view}
              onChange={setView}
              options={[
                { value: "preview", label: "Preview" },
                { value: "code", label: "Code" },
              ]}
            />
            {view === "preview" ? (
              <div className="hidden sm:block">
                <Segmented
                  value={device}
                  onChange={setDevice}
                  options={[
                    { value: "desktop", label: <Icon d={ICONS.desktop} size={14} />, title: "Desktop" },
                    { value: "mobile", label: <Icon d={ICONS.phone} size={14} />, title: "Phone" },
                  ]}
                />
              </div>
            ) : (
              <button type="button" onClick={copyCode} className="h-7 px-3 rounded-full bg-white/[0.06] text-xs text-white/70 hover:text-white">
                {copied ? "Copied!" : "Copy code"}
              </button>
            )}
            <button
              type="button"
              onClick={openInTab}
              className="ml-auto h-7 px-2.5 inline-flex items-center gap-1.5 rounded-full text-xs text-white/50 hover:text-white hover:bg-white/[0.08]"
            >
              <Icon d={ICONS.external} size={13} />
              <span className="hidden sm:inline">Open in new tab</span>
            </button>
          </div>

          <div className={`${view === "preview" ? "flex" : "hidden"} flex-1 min-h-0 justify-center p-0 sm:p-5`}>
            <iframe
              ref={frameRef}
              title="Website preview"
              className={`h-full bg-white sm:rounded-xl sm:border sm:border-white/10 shadow-2xl transition-[width] duration-300 ${device === "mobile" ? "w-full sm:w-[390px]" : "w-full"}`}
            />
          </div>

          {view === "code" && (
            <div className="flex-1 min-h-0 flex flex-col">
              <p className="shrink-0 px-5 py-3 text-xs text-white/45 leading-relaxed border-b border-white/[0.06]">
                This is the real code behind your site. The <code className="text-[#C9A96E]">&lt;style&gt;</code> part is CSS, which
                controls how it looks. Everything in <code className="text-[#C9A96E]">&lt;body&gt;</code> is HTML, which is what&apos;s on the
                page.
              </p>
              <pre className="flex-1 min-h-0 overflow-auto p-5 text-[12px] leading-relaxed font-mono text-white/75 whitespace-pre">{codeForDisplay}</pre>
            </div>
          )}
        </section>
      </div>

      {showTemplates && (
        <Modal wide onClose={() => setShowTemplates(false)}>
          <p className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#C9A96E]/80 mb-3">Website Maker</p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">What are you building?</h2>
          <p className="mt-2 text-sm text-white/50">Pick a starting point. You can change every word, color, and section after.</p>
          {published.sites.length > 0 && (
            <div className="mt-6">
              <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-white/40 mb-2">Your published sites</p>
              <div className="rounded-2xl border border-white/10 divide-y divide-white/[0.07]">
                {published.sites.map((o) => (
                  <div key={o.slug} className="flex items-center gap-3 px-4 py-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-white truncate">{o.name || o.slug}</p>
                      <a href={`/s/${o.slug}`} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-white/40 hover:text-[#C9A96E] truncate block">
                        /s/{o.slug}
                      </a>
                    </div>
                    {o.slug === published.current ? (
                      <span className="text-xs text-white/40">Open now</span>
                    ) : (
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => loadPublished(o.slug)}
                        className="h-8 px-3 rounded-full border border-white/15 text-xs text-white/75 hover:text-white hover:border-white/30 disabled:opacity-50"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-5 text-[11px] font-mono uppercase tracking-[0.12em] text-white/40">Or start something new</p>
            </div>
          )}
          <div className="mt-6 grid sm:grid-cols-2 gap-3">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => applyTemplate(t.id)}
                className="group text-left rounded-2xl border border-white/10 bg-white/[0.03] hover:border-[#C9A96E]/60 p-5 transition-colors"
              >
                <p className="font-semibold text-white flex items-center justify-between">
                  {t.label}
                  <span className="text-white/25 group-hover:text-[#C9A96E] transition-colors">→</span>
                </p>
                <p className="mt-1 text-sm text-white/50 leading-relaxed">{t.description}</p>
              </button>
            ))}
          </div>
          <p className="mt-5 text-[11px] text-white/35">Picking a template replaces what&apos;s in the editor. Changed your mind? Hit Undo.</p>
        </Modal>
      )}

      {showPublish && (
        <Modal onClose={() => setShowPublish(false)}>
          <p className="text-[10px] tracking-[0.25em] uppercase font-mono mb-3" style={{ color: GOLD }}>
            {owned ? "Published" : "Publish"}
          </p>

          {owned ? (
            <>
              <h2 className="text-2xl font-bold tracking-tight">Your site is live.</h2>
              <p className="mt-1 text-sm min-h-[1.25rem] text-emerald-300/90">{busy ? "Saving your changes…" : publishNote}</p>
              <div className="mt-5 flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 pl-4 pr-1.5 py-1.5">
                <a href={`/s/${owned.slug}`} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-0 truncate text-sm font-mono text-[#C9A96E] hover:underline">
                  {liveUrl(owned.slug).replace(/^https?:\/\//, "")}
                </a>
                <button type="button" onClick={() => copyText("link", liveUrl(owned.slug))} className="shrink-0 h-8 px-3 rounded-lg bg-white/[0.08] text-xs text-white/80 hover:text-white">
                  {copiedWhat === "link" ? "Copied!" : "Copy"}
                </button>
                <a href={`/s/${owned.slug}`} target="_blank" rel="noopener noreferrer" className="shrink-0 h-8 px-3 inline-flex items-center rounded-lg bg-white/[0.08] text-xs text-white/80 hover:text-white">
                  Open
                </a>
              </div>
              <p className="mt-3 text-xs text-white/45 leading-relaxed">
                Share that link with anyone. When you change something, hit <span className="text-white/75">Update</span> and it goes live in about 30 seconds.
              </p>

              <div className="mt-6 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                <p className="text-sm text-white/80">Edit from another computer</p>
                <p className="mt-1 text-xs text-white/45 leading-relaxed">
                  This secret link lets anyone who has it change your site. Save it somewhere safe and don&apos;t share it.
                </p>
                <button
                  type="button"
                  onClick={() => copyText("edit", `${origin}/build#edit=${owned.slug}.${owned.token}`)}
                  className="mt-3 h-8 px-3 rounded-lg border border-white/15 text-xs text-white/75 hover:text-white hover:border-white/30"
                >
                  {copiedWhat === "edit" ? "Copied!" : "Copy secret edit link"}
                </button>
              </div>

              <div className="mt-6 flex items-center justify-between gap-3">
                <button type="button" onClick={unpublish} disabled={busy} className="text-xs text-white/40 hover:text-red-300 disabled:opacity-50">
                  Unpublish
                </button>
                <button
                  type="button"
                  onClick={updatePublished}
                  disabled={busy}
                  className="h-10 px-5 rounded-full bg-[#C9A96E] hover:bg-[#B8965A] disabled:opacity-60 text-black text-sm font-semibold"
                >
                  {busy ? "Working…" : "Update again"}
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold tracking-tight">Put your site online.</h2>
              <p className="mt-2 text-sm text-white/55 leading-relaxed">Free, no account needed. Pick the address people will type.</p>
              <form
                className="mt-5"
                onSubmit={(e) => {
                  e.preventDefault()
                  publishNew()
                }}
              >
                <label className="flex items-center rounded-xl border border-white/10 bg-black/40 focus-within:border-[#C9A96E]/70 overflow-hidden">
                  <span className="pl-4 text-sm font-mono text-white/40 whitespace-nowrap">{origin.replace(/^https?:\/\//, "")}/s/</span>
                  <input
                    value={slugInput}
                    autoFocus
                    maxLength={40}
                    aria-label="Site address"
                    onChange={(e) => setSlugInput(e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""))}
                    className="flex-1 min-w-0 bg-transparent py-3 pr-4 text-sm font-mono text-white focus:outline-none"
                  />
                </label>
                <div className="mt-4 rounded-xl border border-amber-300/20 bg-amber-300/[0.05] px-4 py-3 text-xs text-amber-100/80 leading-relaxed">
                  Anyone on the internet can see published sites. Don&apos;t include private info like your home address, your own phone number, or
                  your school schedule.
                </div>
                <button
                  type="submit"
                  disabled={busy || slugInput.length < 3}
                  className="mt-5 w-full h-11 rounded-full bg-[#C9A96E] hover:bg-[#B8965A] disabled:opacity-50 text-black text-sm font-semibold"
                >
                  {busy ? "Publishing…" : "Publish"}
                </button>
              </form>
              {publishNote && <p className="mt-3 text-xs text-white/50">{publishNote}</p>}
            </>
          )}
          {publishError && <p role="alert" className="mt-4 text-sm text-red-300">{publishError}</p>}
        </Modal>
      )}

      {showDownloaded && (
        <Modal onClose={() => setShowDownloaded(false)}>
          <p className="text-[10px] tracking-[0.25em] uppercase font-mono mb-3" style={{ color: GOLD }}>Downloaded</p>
          <h2 className="text-2xl font-bold tracking-tight">Put it on the internet, free.</h2>
          <p className="mt-2 text-sm text-white/55 leading-relaxed">
            You just downloaded <span className="font-mono text-white/80">index.html</span>. That one file is your whole website.
          </p>
          <ol className="mt-5 space-y-3 text-sm text-white/75">
            {[
              <>Make a new folder and move <span className="font-mono">index.html</span> into it.</>,
              <>
                Go to{" "}
                <a href="https://app.netlify.com/drop" target="_blank" rel="noopener noreferrer" className="underline decoration-white/30 hover:decoration-white" style={{ color: GOLD }}>
                  app.netlify.com/drop
                </a>
                .
              </>,
              <>Drag the folder onto the page. You&apos;ll get a live link in seconds.</>,
            ].map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-white/[0.08] text-xs inline-flex items-center justify-center text-white/70">{i + 1}</span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-xs text-white/40 leading-relaxed">
            Your work is saved in this browser, so you can come back and keep editing. Download again any time you make changes.
          </p>
          <p className="mt-3 text-xs text-white/40 leading-relaxed">
            Or skip all that: hit <span className="text-white/70">Publish</span> to get a free ecily.org link in one click.
          </p>
          <button type="button" onClick={() => setShowDownloaded(false)} className="mt-6 w-full h-11 rounded-full bg-[#C9A96E] hover:bg-[#B8965A] text-black text-sm font-semibold">
            Got it
          </button>
        </Modal>
      )}
    </div>
  )
}
