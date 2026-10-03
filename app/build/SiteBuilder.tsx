"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  BLOCKS,
  CORNERS,
  FONTS,
  LIMITS,
  PALETTES,
  PREVIEW_CSS,
  TEMPLATES,
  newBlock,
  renderBody,
  renderHead,
  renderSite,
  sanitizeSite,
  siteDescription,
  slugify,
  uid,
  type Block,
  type BlockType,
  type Site,
} from "@/lib/siteBuilder"
import { FieldInput, ICONS, Icon, IconButton, Labeled, Modal, Segmented, Toast, inputCls, type ToastMsg } from "./ui"
import { BlockGrid, TemplateGrid } from "./pickers"

const STORAGE_KEY = "ecily-website-maker:v1"
/** Sites this browser has published, with the secret tokens that let it edit them. */
const PUBLISH_KEY = "ecily-website-maker:published:v1"
const HINT_KEY = "ecily-website-maker:hint-dismissed"
const GOLD = "#C9A96E"

type GalleryStatus = "pending" | "approved" | "rejected" | null
/** gallery is undefined until the server has told this browser the status; hash is what's live. */
type Owned = { slug: string; token: string; name: string; gallery?: GalleryStatus; hash?: string }
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

/**
 * Cheap fingerprint of a site, to tell whether the live version is behind the editor.
 * Normalized first, so a site reloaded from storage (which is re-sanitized) hashes the same.
 */
function hashSite(site: Site): string {
  const s = JSON.stringify(sanitizeSite(site) ?? site)
  let h = 5381
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0
  return `${(h >>> 0).toString(36)}:${s.length}`
}

/** Text from a canvas-editable element, in the same shape the sidebar fields use. */
function readEditable(el: HTMLElement): string {
  if (el.hasAttribute("data-multi")) {
    return el.innerText.replace(/\r/g, "").replace(/\n{3,}/g, "\n\n").replace(/^\n+|\n+$/g, "")
  }
  return (el.textContent ?? "").replace(/\s*\n\s*/g, " ")
}

const FONT_NOTES: Record<string, string> = {
  classic: "Serif headings, clean body",
  modern: "Bold and simple",
  editorial: "Like a magazine",
  friendly: "Rounded and warm",
  tech: "Geometric, a bit nerdy",
}

const DEVICE_WIDTH = { desktop: "100%", tablet: "820px", phone: "390px" } as const
type Device = keyof typeof DEVICE_WIDTH

type SaveState = "idle" | "saved" | "too-big"
type Tab = "sections" | "design" | "settings"

export default function SiteBuilder() {
  const [site, setSite] = useState<Site>(() => TEMPLATES[0].build())
  const [loaded, setLoaded] = useState(false)
  const [past, setPast] = useState<Site[]>([])
  const [future, setFuture] = useState<Site[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [tab, setTab] = useState<Tab>("sections")
  const [view, setView] = useState<"preview" | "code">("preview")
  const [device, setDevice] = useState<Device>("desktop")
  const [pane, setPane] = useState<"edit" | "preview">("edit")
  const [showTemplates, setShowTemplates] = useState(false)
  /** Open section picker; `after` is the block to insert after ("" = top, null = after the selected one). */
  const [adding, setAdding] = useState<{ after: string | null } | null>(null)
  const [showDownloaded, setShowDownloaded] = useState(false)
  const [showPublish, setShowPublish] = useState(false)
  const [published, setPublishedState] = useState<Published>({ current: null, sites: [] })
  const [slugInput, setSlugInput] = useState("")
  const [busy, setBusy] = useState(false)
  const [publishError, setPublishError] = useState("")
  const [publishNote, setPublishNote] = useState("")
  const [copiedWhat, setCopiedWhat] = useState("")
  const [galleryOptIn, setGalleryOptIn] = useState(true)
  const [saveState, setSaveState] = useState<SaveState>("idle")
  const [savedHash, setSavedHash] = useState("")
  const [toast, setToast] = useState<ToastMsg | null>(null)
  const [dragId, setDragId] = useState<string | null>(null)
  const [dropAt, setDropAt] = useState<{ id: string; after: boolean } | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [renderTick, setRenderTick] = useState(0)

  const frameRef = useRef<HTMLIFrameElement>(null)
  const frameDocRef = useRef<Document | null>(null)
  const frameHeadRef = useRef("")
  /** The canvas element being typed into; the preview isn't re-rendered under it. */
  const editingRef = useRef<HTMLElement | null>(null)
  const coalesceRef = useRef({ key: "", at: 0 })
  const scrollPreviewRef = useRef(false)
  const siteRef = useRef(site)
  siteRef.current = site

  const notify = useCallback((text: string, undo = false) => setToast({ id: Date.now(), text, undo }), [])
  const clearToast = useCallback(() => setToast(null), [])

  const setPublished = useCallback((fn: (p: Published) => Published) => {
    setPublishedState((prev) => {
      const next = fn(prev)
      writePublished(next)
      return next
    })
  }, [])

  // ── History ──

  /** Every change goes through here so it can be undone. Typing in one field coalesces into a single undo step. */
  const change = useCallback(
    (next: Site, coalesceKey?: string) => {
      const now = Date.now()
      const c = coalesceRef.current
      const merge = coalesceKey && c.key === coalesceKey && now - c.at < 1500
      coalesceRef.current = { key: coalesceKey ?? "", at: now }
      if (!merge) setPast((p) => [...p.slice(-79), siteRef.current])
      setFuture([])
      setSite(next)
    },
    [],
  )

  const undo = useCallback(() => {
    if (!past.length) return
    setFuture((f) => [siteRef.current, ...f].slice(0, 80))
    setSite(past[past.length - 1])
    setPast(past.slice(0, -1))
    coalesceRef.current = { key: "", at: 0 }
  }, [past])

  const redo = useCallback(() => {
    if (!future.length) return
    setPast((p) => [...p, siteRef.current])
    setSite(future[0])
    setFuture(future.slice(1))
    coalesceRef.current = { key: "", at: 0 }
  }, [future])

  /** Pull a published site from the server into the editor (undoable). */
  const loadPublished = useCallback(
    async (slug: string) => {
      setBusy(true)
      setPublishError("")
      try {
        const token = readPublished().sites.find((o) => o.slug === slug)?.token
        const res = await fetch(`/api/sites/${encodeURIComponent(slug)}`, {
          cache: "no-store",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
        if (!res.ok) throw new Error(await errorFrom(res, "Couldn't open that site."))
        const data = await res.json()
        const remote = sanitizeSite(data?.site)
        if (!remote) throw new Error("That site couldn't be opened.")
        change(remote)
        setActiveId(null)
        setPublished((p) => ({
          current: slug,
          sites: p.sites.map((o) => (o.slug === slug ? { ...o, name: remote.name, gallery: data.gallery, hash: hashSite(remote) } : o)),
        }))
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
    [change, setPublished],
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
      setShowHint(!localStorage.getItem(HINT_KEY))
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
    // Runs once on mount; loadPublished/setPublished are stable enough for that.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Autosave, debounced. Also fingerprints the site so we know if the live version is behind.
  useEffect(() => {
    if (!loaded) return
    const t = setTimeout(() => {
      setSavedHash(hashSite(site))
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(site))
        setSaveState("saved")
      } catch {
        setSaveState("too-big")
      }
    }, 400)
    return () => clearTimeout(t)
  }, [site, loaded])

  // ── Block operations ──

  const select = useCallback((id: string | null, scrollPreview: boolean) => {
    scrollPreviewRef.current = scrollPreview
    setActiveId(id)
  }, [])

  const updateBlock = (id: string, fn: (b: Block) => Block, coalesceKey?: string) =>
    change({ ...site, blocks: site.blocks.map((b) => (b.id === id ? fn(b) : b)) }, coalesceKey)

  const moveBlock = (id: string, dir: -1 | 1) => {
    const s = siteRef.current
    const i = s.blocks.findIndex((b) => b.id === id)
    const j = i + dir
    if (i < 0 || j < 0 || j >= s.blocks.length) return
    const blocks = [...s.blocks]
    ;[blocks[i], blocks[j]] = [blocks[j], blocks[i]]
    change({ ...s, blocks })
    select(id, true)
  }

  const moveBlockTo = (id: string, targetId: string, after: boolean) => {
    const s = siteRef.current
    const dragged = s.blocks.find((b) => b.id === id)
    if (!dragged || id === targetId) return
    const blocks = s.blocks.filter((b) => b.id !== id)
    const idx = blocks.findIndex((b) => b.id === targetId) + (after ? 1 : 0)
    blocks.splice(idx, 0, dragged)
    if (blocks.every((b, k) => b.id === s.blocks[k].id)) return
    change({ ...s, blocks })
    select(id, true)
  }

  const duplicateBlock = (id: string) => {
    const s = siteRef.current
    const i = s.blocks.findIndex((b) => b.id === id)
    if (i < 0) return
    const src = s.blocks[i]
    const copy: Block = { ...src, id: uid(), props: { ...src.props }, items: src.items.map((x) => ({ ...x })) }
    const blocks = [...s.blocks]
    blocks.splice(i + 1, 0, copy)
    change({ ...s, blocks })
    select(copy.id, true)
    notify(`${BLOCKS[src.type].label} duplicated`)
  }

  const removeBlock = (id: string) => {
    const s = siteRef.current
    const b = s.blocks.find((x) => x.id === id)
    if (!b) return
    change({ ...s, blocks: s.blocks.filter((x) => x.id !== id) })
    setActiveId((a) => (a === id ? null : a))
    notify(`${BLOCKS[b.type].label} deleted`, true)
  }

  const addBlock = (type: BlockType) => {
    const s = siteRef.current
    const b = newBlock(type)
    const after = adding?.after ?? activeId
    const blocks = [...s.blocks]
    const i = after === "" ? -1 : after ? blocks.findIndex((x) => x.id === after) : blocks.length - 1
    blocks.splice(i + 1, 0, b)
    change({ ...s, blocks })
    setAdding(null)
    setTab("sections")
    select(b.id, true)
  }

  /** Typing on the canvas lands here. Paths come from the renderer: "p:<prop>" or "i:<row>:<field>". */
  const editFromCanvas = (blockId: string, path: string, value: string) => {
    const s = siteRef.current
    const block = s.blocks.find((b) => b.id === blockId)
    if (!block) return
    const def = BLOCKS[block.type]
    const [kind, a, b] = path.split(":")
    let next: Block
    if (kind === "p" && def.fields.some((f) => f.key === a)) {
      next = { ...block, props: { ...block.props, [a]: value } }
    } else if (kind === "i" && def.list?.fields.some((f) => f.key === b) && block.items[Number(a)]) {
      next = { ...block, items: block.items.map((it, k) => (k === Number(a) ? { ...it, [b]: value } : it)) }
    } else return
    change({ ...s, blocks: s.blocks.map((x) => (x.id === blockId ? next : x)) }, kind === "p" ? `${blockId}:${a}` : `${blockId}:${a}:${b}`)
  }

  const applyTemplate = (id: string) => {
    const t = TEMPLATES.find((x) => x.id === id)
    if (!t) return
    change(t.build())
    setPublished((p) => ({ ...p, current: null })) // a new site, not an edit of the published one
    setActiveId(null)
    setShowTemplates(false)
    setTab("sections")
    frameRef.current?.contentWindow?.scrollTo(0, 0)
    notify(`${t.label} template applied`, true)
  }

  // The canvas listeners are attached once per frame document, so they reach
  // the latest handlers through this ref instead of stale closures.
  const dismissHint = useCallback(() => {
    setShowHint(false)
    try {
      localStorage.setItem(HINT_KEY, "1")
    } catch {}
  }, [])

  const actionsRef = useRef({ editFromCanvas, moveBlock, duplicateBlock, removeBlock, undo, redo, select, dismissHint })
  actionsRef.current = { editFromCanvas, moveBlock, duplicateBlock, removeBlock, undo, redo, select, dismissHint }

  // ── Keyboard shortcuts ──

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement
      if (el.closest("input, textarea, [contenteditable]")) return // fields keep their own undo
      const mod = e.metaKey || e.ctrlKey
      const k = e.key.toLowerCase()
      if (mod && k === "z" && !e.shiftKey) {
        e.preventDefault()
        undo()
      } else if (mod && ((k === "z" && e.shiftKey) || k === "y")) {
        e.preventDefault()
        redo()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [undo, redo])

  // ── Live canvas ──
  // The frame is written once per theme; after that only <body> is swapped,
  // so typing doesn't reload fonts or jump the scroll position. While a piece
  // of text on the canvas is focused, the body isn't touched at all.

  const previewHead = renderHead({ ...site, name: "" })
  const previewBody = renderBody(site, { preview: true, activeId })

  const attachCanvas = useCallback((doc: Document) => {
    const act = () => actionsRef.current

    doc.addEventListener("click", (e) => {
      const t = e.target as Element | null
      if (!t) return
      const control = t.closest("[data-act]")
      if (control) {
        e.preventDefault()
        const action = control.getAttribute("data-act")
        if (action === "insert") {
          setAdding({ after: control.closest("[data-insert-after]")?.getAttribute("data-insert-after") ?? null })
          return
        }
        const id = control.closest("[data-block-id]")?.getAttribute("data-block-id")
        if (!id) return
        if (action === "up") act().moveBlock(id, -1)
        else if (action === "down") act().moveBlock(id, 1)
        else if (action === "dup") act().duplicateBlock(id)
        else if (action === "del") act().removeBlock(id)
        return
      }
      if (t.closest("summary")) e.preventDefault() // keep FAQ answers open while editing
      const a = t.closest("a")
      if (a) {
        e.preventDefault()
        if (!a.hasAttribute("data-edit")) {
          const href = a.getAttribute("href") || ""
          if (href.startsWith("#")) {
            const el = href === "#top" ? doc.body : doc.getElementById(href.slice(1))
            el?.scrollIntoView({ behavior: "smooth", block: "start" })
          } else if (href) {
            window.open(a.href, "_blank", "noopener,noreferrer")
          }
        }
      }
      const section = t.closest("[data-block-id]")
      if (section) {
        act().select(section.getAttribute("data-block-id"), false)
        setTab("sections")
      }
    })

    doc.addEventListener("focusin", (e) => {
      const el = (e.target as Element | null)?.closest?.("[data-edit]") as HTMLElement | null
      if (!el) return
      editingRef.current = el
      act().dismissHint()
      const section = el.closest("[data-block-id]")
      if (!section) return
      // The body won't re-render while typing, so move the highlight by hand.
      doc.querySelectorAll("[data-active]").forEach((n) => n.removeAttribute("data-active"))
      section.setAttribute("data-active", "")
      act().select(section.getAttribute("data-block-id"), false)
      setTab("sections")
    })

    doc.addEventListener("focusout", (e) => {
      if (editingRef.current && e.target === editingRef.current) {
        editingRef.current = null
        setRenderTick((n) => n + 1) // catch the canvas up (nav labels, empty fields, etc.)
      }
    })

    doc.addEventListener("input", (e) => {
      const el = (e.target as Element | null)?.closest?.("[data-edit]") as HTMLElement | null
      const id = el?.closest("[data-block-id]")?.getAttribute("data-block-id")
      if (!el || !id) return
      act().editFromCanvas(id, el.getAttribute("data-edit") || "", readEditable(el))
    })

    doc.addEventListener("keydown", (e) => {
      const el = (e.target as Element | null)?.closest?.("[data-edit]") as HTMLElement | null
      if (el) {
        if (e.key === "Escape" || (e.key === "Enter" && !el.hasAttribute("data-multi") && !e.shiftKey)) {
          e.preventDefault()
          el.blur()
        }
        return
      }
      const mod = e.metaKey || e.ctrlKey
      if (mod && e.key.toLowerCase() === "z") {
        e.preventDefault()
        if (e.shiftKey) act().redo()
        else act().undo()
      }
    })
  }, [])

  useEffect(() => {
    if (!loaded) return
    const frame = frameRef.current
    const doc = frame?.contentDocument
    if (!frame || !doc) return
    if (frameDocRef.current !== doc || frameHeadRef.current !== previewHead || !doc.body) {
      const y = frame.contentWindow?.scrollY ?? 0
      editingRef.current = null
      doc.open()
      doc.write(
        `<!doctype html><html lang="en"><head>${previewHead}<style>${PREVIEW_CSS}</style></head><body>${previewBody}</body></html>`,
      )
      doc.close()
      if (frameDocRef.current !== doc) attachCanvas(doc)
      frameDocRef.current = doc
      frameHeadRef.current = previewHead
      frame.contentWindow?.scrollTo(0, y)
      return
    }
    const editing = editingRef.current
    if (editing && editing.isConnected && doc.hasFocus() && doc.activeElement === editing) return
    editingRef.current = null
    doc.body.innerHTML = previewBody
  }, [loaded, previewHead, previewBody, renderTick, attachCanvas])

  // Scroll the canvas to whatever was picked in the side panel.
  useEffect(() => {
    if (!activeId || !scrollPreviewRef.current) return
    scrollPreviewRef.current = false
    const el = frameDocRef.current?.querySelector(`[data-block-id="${CSS.escape(activeId)}"]`)
    el?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [activeId])

  // Bring the matching side-panel card into view when a section is picked on the canvas.
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

  const openInTab = () => {
    const url = URL.createObjectURL(new Blob([exportHtml()], { type: "text/html" }))
    window.open(url, "_blank", "noopener")
    setTimeout(() => URL.revokeObjectURL(url), 60_000)
  }

  // ── Publishing ──

  const owned = published.sites.find((o) => o.slug === published.current) ?? null
  const origin = typeof window === "undefined" ? "https://ecily.org" : window.location.origin
  const host = origin.replace(/^https?:\/\//, "")
  const liveUrl = (slug: string) => `${origin}/s/${slug}`
  const dirty = !!owned && !!owned.hash && !!savedHash && owned.hash !== savedHash

  const tooBig = () => {
    if (JSON.stringify(site).length <= LIMITS.siteBytes) return false
    setPublishError("Your site is too big to publish. Try using fewer or smaller photos.")
    return true
  }

  const publishNew = async () => {
    const slug = slugify(slugInput)
    setPublishError("")
    if (tooBig()) return
    setBusy(true)
    const sent = site
    try {
      const res = await fetch("/api/sites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ site: sent, slug, gallery: galleryOptIn }),
      })
      if (!res.ok) throw new Error(await errorFrom(res, "Couldn't publish right now."))
      const data = (await res.json()) as { slug: string; token: string; gallery: GalleryStatus }
      setPublished((p) => ({
        current: data.slug,
        sites: [
          ...p.sites.filter((o) => o.slug !== data.slug),
          { slug: data.slug, token: data.token, name: sent.name, gallery: data.gallery, hash: hashSite(sent) },
        ],
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
    const sent = site
    try {
      const res = await fetch(`/api/sites/${owned.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${owned.token}` },
        body: JSON.stringify({ site: sent }),
      })
      if (res.status === 404) {
        setPublished((p) => ({ current: null, sites: p.sites.filter((o) => o.slug !== owned.slug) }))
        setSlugInput(owned.slug)
      }
      if (!res.ok) throw new Error(await errorFrom(res, "Couldn't update right now."))
      const data = (await res.json()) as { gallery: GalleryStatus }
      setPublished((p) => ({
        ...p,
        sites: p.sites.map((o) => (o.slug === owned.slug ? { ...o, name: sent.name, gallery: data.gallery, hash: hashSite(sent) } : o)),
      }))
      setPublishNote("Updated. Changes show up within about 30 seconds.")
    } catch (e) {
      setPublishError(e instanceof Error ? e.message : "Couldn't update right now.")
    } finally {
      setBusy(false)
    }
  }

  const openPublish = () => {
    setPublishError("")
    setPublishNote("")
    if (!owned) setSlugInput((v) => v || slugify(site.name))
    setShowPublish(true)
    if (owned) updatePublished()
  }

  const setGallery = async (want: boolean) => {
    if (!owned) return
    setBusy(true)
    setPublishError("")
    try {
      const res = await fetch(`/api/sites/${owned.slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${owned.token}` },
        body: JSON.stringify({ gallery: want }),
      })
      if (!res.ok) throw new Error(await errorFrom(res, "Couldn't change that right now."))
      const data = (await res.json()) as { gallery: GalleryStatus }
      setPublished((p) => ({ ...p, sites: p.sites.map((o) => (o.slug === owned.slug ? { ...o, gallery: data.gallery } : o)) }))
    } catch (e) {
      setPublishError(e instanceof Error ? e.message : "Couldn't change that right now.")
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

  // Uploaded photos are huge base64 strings; keep the code view readable.
  const codeForDisplay =
    view === "code" ? exportHtml().replace(/data:image\/[a-z]+;base64,[A-Za-z0-9+/=]{40,}/g, "data:image/jpeg;base64,…(your uploaded photo)…") : ""

  if (!loaded) {
    return (
      <div className="h-[100dvh] bg-[#080808] flex items-center justify-center text-white/30 text-sm font-mono">
        Loading the website maker…
      </div>
    )
  }

  const palette = PALETTES.find((p) => p.id === site.theme.palette) ?? PALETTES[0]
  const accent = site.theme.accent || palette.accent
  const pageSlug = owned?.slug || slugify(site.name) || "your-site"

  const status = !owned
    ? { label: "Draft", dot: "bg-white/30", title: "Not published yet" }
    : dirty
      ? { label: "Unpublished changes", dot: "bg-amber-400", title: "Hit Update to put your latest changes online" }
      : { label: "Live", dot: "bg-emerald-400", title: "Your published site is up to date" }

  return (
    <div className="h-[100dvh] flex flex-col bg-[#080808] text-white">
      {/* ── Top bar ── */}
      <header className="shrink-0 h-14 grid grid-cols-[auto_1fr_auto] items-center gap-2 px-3 sm:px-4 border-b border-white/[0.07] bg-[#0b0b0c]">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <Link href="/" className="font-serif text-xl text-white">
            ecily
          </Link>
          <span className="hidden sm:inline text-white/20">/</span>
          <span className="hidden sm:inline text-sm text-white/60">Website Maker</span>
          <div className="lg:hidden">
            <Segmented
              value={pane}
              onChange={setPane}
              options={[
                { value: "edit", label: "Edit" },
                { value: "preview", label: "Page" },
              ]}
            />
          </div>
        </div>

        <div className="hidden md:flex items-center justify-center gap-3 min-w-0">
          <span className="truncate text-sm font-medium text-white/85 max-w-[16rem]">{site.name || "Untitled site"}</span>
          {owned && !dirty ? (
            <a
              href={`/s/${owned.slug}`}
              target="_blank"
              rel="noopener"
              title={status.title}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.1] px-2.5 py-1 text-[11px] text-white/70"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
              {status.label}
              <Icon d={ICONS.external} size={11} />
            </a>
          ) : (
            <span title={status.title} className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-2.5 py-1 text-[11px] text-white/60">
              <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
              {status.label}
            </span>
          )}
          <span className="hidden xl:inline-flex items-center gap-1 text-[11px] text-white/30">
            {saveState === "saved" && (
              <>
                <Icon d={ICONS.check} size={11} /> Saved
              </>
            )}
            {saveState === "too-big" && <span className="text-amber-300/80">Too big to autosave. Download to keep it.</span>}
          </span>
        </div>

        <div className="flex items-center justify-end gap-0.5 sm:gap-1.5 col-start-3">
          <IconButton label="Undo (Ctrl+Z)" icon="undo" onClick={undo} disabled={!past.length} />
          <IconButton label="Redo (Ctrl+Shift+Z)" icon="redo" onClick={redo} disabled={!future.length} />
          <span className="hidden sm:block w-px h-5 bg-white/10 mx-1" />
          <button
            type="button"
            onClick={() => setShowTemplates(true)}
            aria-label="Templates"
            title="Templates and your published sites"
            className="h-8 px-2.5 sm:px-3 inline-flex items-center gap-1.5 rounded-full text-xs text-white/60 hover:text-white hover:bg-white/[0.08]"
          >
            <span className="sm:hidden">
              <Icon d={ICONS.grid} size={14} />
            </span>
            <span className="hidden sm:inline">Templates</span>
          </button>
          <a
            href="/gallery"
            target="_blank"
            rel="noopener"
            className="hidden lg:inline-flex h-8 px-3 items-center rounded-full text-xs text-white/60 hover:text-white hover:bg-white/[0.08]"
          >
            Gallery
          </a>
          <button
            type="button"
            onClick={download}
            aria-label="Download"
            title="Download index.html"
            className="h-8 px-2.5 inline-flex items-center gap-1.5 rounded-full text-xs text-white/60 hover:text-white hover:bg-white/[0.08]"
          >
            <Icon d={ICONS.download} size={14} />
          </button>
          <button
            type="button"
            onClick={openPublish}
            disabled={busy}
            className="relative h-8 px-3 sm:px-4 inline-flex items-center gap-1.5 rounded-full bg-[#C9A96E] hover:bg-[#B8965A] disabled:opacity-60 text-black text-xs font-semibold transition-colors"
          >
            <Icon d={ICONS.globe} size={14} />
            {owned ? "Update" : "Publish"}
            {dirty && <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-[#0b0b0c]" />}
          </button>
        </div>
      </header>

      <div className="flex-1 min-h-0 flex">
        {/* ── Side panel ── */}
        <aside
          className={`${pane === "edit" ? "flex" : "hidden"} lg:flex w-full lg:w-[380px] shrink-0 flex-col border-r border-white/[0.07] bg-[#0b0b0c] min-h-0`}
        >
          <div className="shrink-0 px-4 pt-4 pb-3">
            <Segmented
              value={tab}
              onChange={setTab}
              options={[
                { value: "sections", label: "Sections" },
                { value: "design", label: "Design" },
                { value: "settings", label: "Settings" },
              ]}
            />
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto px-4 pb-10 space-y-2.5">
            {tab === "sections" && (
              <>
                {site.blocks.map((b, i) => {
                  const def = BLOCKS[b.type]
                  const open = activeId === b.id
                  const summary = b.props.heading || b.props.quote || b.props.eyebrow || def.description
                  const showDropBefore = dropAt?.id === b.id && !dropAt.after && dragId !== b.id
                  const showDropAfter = dropAt?.id === b.id && dropAt.after && dragId !== b.id
                  return (
                    <div
                      key={b.id}
                      id={`block-${b.id}`}
                      onDragOver={(e) => {
                        if (!dragId) return
                        e.preventDefault()
                        const r = e.currentTarget.getBoundingClientRect()
                        setDropAt({ id: b.id, after: e.clientY > r.top + r.height / 2 })
                      }}
                      onDrop={(e) => {
                        e.preventDefault()
                        // Work from the drop event itself; the last dragover's state may not have rendered yet.
                        const from = dragId || e.dataTransfer.getData("text/plain")
                        const r = e.currentTarget.getBoundingClientRect()
                        if (from) moveBlockTo(from, b.id, e.clientY > r.top + r.height / 2)
                        setDragId(null)
                        setDropAt(null)
                      }}
                      className={`relative rounded-2xl border transition-all ${
                        open ? "border-[#C9A96E]/50 bg-white/[0.04]" : "border-white/[0.08] bg-white/[0.02] hover:border-white/15"
                      } ${dragId === b.id ? "opacity-40" : ""}`}
                    >
                      {showDropBefore && <span className="absolute -top-[7px] left-3 right-3 h-0.5 rounded-full bg-[#C9A96E]" />}
                      {showDropAfter && <span className="absolute -bottom-[7px] left-3 right-3 h-0.5 rounded-full bg-[#C9A96E]" />}
                      <div
                        role="button"
                        tabIndex={0}
                        aria-expanded={open}
                        draggable
                        onDragStart={(e) => {
                          setDragId(b.id)
                          e.dataTransfer.effectAllowed = "move"
                          e.dataTransfer.setData("text/plain", b.id)
                        }}
                        onDragEnd={() => {
                          setDragId(null)
                          setDropAt(null)
                        }}
                        onClick={() => select(open ? null : b.id, !open)}
                        onKeyDown={(e) => {
                          if (e.target !== e.currentTarget) return
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault()
                            select(open ? null : b.id, !open)
                          }
                        }}
                        className="group flex items-center gap-1.5 pl-2 pr-2 py-3 cursor-pointer select-none"
                      >
                        <span className="w-5 shrink-0 flex justify-center text-white/20 group-hover:text-white/50 cursor-grab active:cursor-grabbing" title="Drag to reorder">
                          <Icon d={ICONS.grip} size={14} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-[#C9A96E]/80">{def.label}</p>
                          <p className="text-sm text-white/80 truncate">{summary}</p>
                        </div>
                        <div className={`flex items-center transition-opacity ${open ? "opacity-100" : "opacity-0 group-hover:opacity-100 focus-within:opacity-100"}`}>
                          <IconButton label="Move up" icon="up" onClick={() => moveBlock(b.id, -1)} disabled={i === 0} />
                          <IconButton label="Move down" icon="down" onClick={() => moveBlock(b.id, 1)} disabled={i === site.blocks.length - 1} />
                          <IconButton label="Duplicate" icon="copy" onClick={() => duplicateBlock(b.id)} />
                          <IconButton label="Delete section" icon="trash" onClick={() => removeBlock(b.id)} />
                        </div>
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

                <button
                  type="button"
                  onClick={() => setAdding({ after: null })}
                  className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-2xl border border-dashed border-white/15 text-sm text-white/60 hover:text-white hover:border-[#C9A96E]/60 transition-colors"
                >
                  <Icon d={ICONS.plus} />
                  Add section
                </button>
                <p className="pt-2 text-center text-[11px] text-white/30 leading-relaxed">
                  Drag sections to reorder. Click any text on the page to edit it right there.
                </p>
              </>
            )}

            {tab === "design" && (
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
                        className={`overflow-hidden rounded-xl border text-left transition-colors ${
                          site.theme.palette === p.id ? "border-[#C9A96E]/70 ring-1 ring-[#C9A96E]/40" : "border-white/[0.08] hover:border-white/20"
                        }`}
                      >
                        <span className="flex h-12 items-end gap-1 p-2" style={{ background: p.bg }}>
                          <span className="h-2 w-8 rounded-full" style={{ background: p.text, opacity: 0.85 }} />
                          <span className="h-2 w-5 rounded-full" style={{ background: p.muted, opacity: 0.6 }} />
                          <span className="ml-auto h-4 w-7 rounded-md" style={{ background: p.accent }} />
                        </span>
                        <span className="block px-2.5 py-1.5 text-xs text-white/80 bg-white/[0.02]">{p.label}</span>
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

            {tab === "settings" && (
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

                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 space-y-3">
                  <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-white/40">Search</p>
                  <Labeled label="Search description">
                    <textarea
                      value={site.description ?? ""}
                      maxLength={LIMITS.description}
                      rows={3}
                      placeholder="One or two sentences about the site. Shown under your title on Google."
                      onChange={(e) => change({ ...site, description: e.target.value }, "site-description")}
                      className={`${inputCls} resize-y leading-relaxed`}
                    />
                  </Labeled>
                  <div className="rounded-xl bg-white px-4 py-3" aria-label="How this might look on Google">
                    <p className="text-[11px] text-[#4d5156] truncate">
                      {host} › s › {pageSlug}
                    </p>
                    <p className="text-[15px] leading-snug text-[#1a0dab] truncate">{site.name || "My website"}</p>
                    <p className="mt-0.5 text-[12px] leading-snug text-[#4d5156] line-clamp-2">{siteDescription(site)}</p>
                  </div>
                  <p className="text-[11px] text-white/35 leading-relaxed">
                    Search preview. Tip: say what you do and where, like &ldquo;Free groceries for families in Riverside&rdquo;.
                  </p>
                </div>
              </>
            )}
          </div>
        </aside>

        {/* ── Canvas ── */}
        <section className={`${pane === "preview" ? "flex" : "hidden"} lg:flex flex-1 min-w-0 flex-col bg-[#0e0e0f]`}>
          <div className="shrink-0 h-12 flex items-center gap-2 px-3 sm:px-4 border-b border-white/[0.06]">
            <Segmented
              value={view}
              onChange={setView}
              options={[
                { value: "preview", label: "Page" },
                { value: "code", label: "Code" },
              ]}
            />
            {view === "preview" ? (
              <div className="hidden sm:block mx-auto">
                <Segmented
                  value={device}
                  onChange={setDevice}
                  options={[
                    { value: "desktop", label: <Icon d={ICONS.desktop} size={14} />, title: "Desktop" },
                    { value: "tablet", label: <Icon d={ICONS.tablet} size={14} />, title: "Tablet" },
                    { value: "phone", label: <Icon d={ICONS.phone} size={14} />, title: "Phone" },
                  ]}
                />
              </div>
            ) : (
              <button type="button" onClick={() => copyText("code", exportHtml())} className="h-7 px-3 rounded-full bg-white/[0.06] text-xs text-white/70 hover:text-white mx-auto">
                {copiedWhat === "code" ? "Copied!" : "Copy code"}
              </button>
            )}
            <button
              type="button"
              onClick={openInTab}
              className="ml-auto sm:ml-0 h-7 px-2.5 inline-flex items-center gap-1.5 rounded-full text-xs text-white/50 hover:text-white hover:bg-white/[0.08]"
            >
              <Icon d={ICONS.external} size={13} />
              <span className="hidden sm:inline">Preview in new tab</span>
            </button>
          </div>

          <div
            className={`${view === "preview" ? "flex" : "hidden"} relative flex-1 min-h-0 justify-center p-0 sm:p-6 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.07)_1px,transparent_0)] [background-size:22px_22px]`}
          >
            <div className="flex flex-col h-full w-full transition-[max-width] duration-300 ease-out" style={{ maxWidth: DEVICE_WIDTH[device] }}>
              {/* Browser chrome, so the page reads as a real website */}
              <div className="hidden sm:flex shrink-0 h-9 items-center gap-1.5 px-3 rounded-t-xl bg-[#1c1c1e] border border-b-0 border-white/10">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]/80" />
                <span className="ml-3 flex-1 max-w-md mx-auto truncate rounded-md bg-white/[0.06] px-3 py-1 text-center text-[11px] font-mono text-white/45">
                  {host}/s/{pageSlug}
                </span>
                <span className="w-12" />
              </div>
              <iframe
                ref={frameRef}
                title="Your website. Click any text to edit it."
                className="flex-1 w-full bg-white sm:rounded-b-xl sm:border sm:border-t-0 sm:border-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]"
              />
            </div>

            {showHint && (
              <div className="absolute top-3 sm:top-[3.4rem] left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 rounded-full bg-[#1c1c1e]/95 border border-white/10 pl-4 pr-1.5 py-1.5 shadow-xl backdrop-blur text-xs text-white/80 whitespace-nowrap">
                <span>
                  <span className="text-[#C9A96E] font-semibold">Tip:</span> click any text on the page to type over it
                </span>
                <button type="button" onClick={dismissHint} aria-label="Dismiss tip" className="w-7 h-7 inline-flex items-center justify-center rounded-full hover:bg-white/10">
                  <Icon d={ICONS.close} size={12} />
                </button>
              </div>
            )}
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

      {/* ── Modals ── */}

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
              <p className="mt-6 text-[11px] font-mono uppercase tracking-[0.12em] text-white/40">Or start something new</p>
            </div>
          )}
          <div className="mt-4">
            <TemplateGrid onPick={applyTemplate} />
          </div>
          <p className="mt-5 text-[11px] text-white/35">Picking a template replaces what&apos;s in the editor. Changed your mind? Hit Undo.</p>
        </Modal>
      )}

      {adding && (
        <Modal wide onClose={() => setAdding(null)}>
          <p className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#C9A96E]/80 mb-3">Add a section</p>
          <h2 className="text-2xl font-bold tracking-tight">What goes here?</h2>
          <p className="mt-2 mb-6 text-sm text-white/50">It comes with example text you can click and type over.</p>
          <BlockGrid onPick={addBlock} />
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

              <div className="mt-6 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 flex items-start gap-3">
                <div className="flex-1">
                  <p className="text-sm text-white/80">Community gallery</p>
                  <p className="mt-1 text-xs text-white/45 leading-relaxed">
                    {owned.gallery === "approved" && "Your site is in the gallery. Nice work!"}
                    {owned.gallery === "pending" && "Waiting for a quick review. It shows up in the gallery once approved."}
                    {owned.gallery === "rejected" && "This site wasn't added to the gallery. It's still live at your link."}
                    {owned.gallery === null && "Not in the gallery. Want other people to discover it?"}
                    {owned.gallery === undefined && "Hit Update to see this site's gallery status."}
                  </p>
                </div>
                {owned.gallery === null && (
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => setGallery(true)}
                    className="shrink-0 h-8 px-3 rounded-lg border border-white/15 text-xs text-white/75 hover:text-white hover:border-white/30 disabled:opacity-50"
                  >
                    Submit
                  </button>
                )}
                {(owned.gallery === "pending" || owned.gallery === "approved") && (
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => setGallery(false)}
                    className="shrink-0 h-8 px-3 rounded-lg text-xs text-white/45 hover:text-white disabled:opacity-50"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="mt-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
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
                  Anyone on the internet can see published sites, and they can show up on Google. Don&apos;t include private info like your home
                  address, your own phone number, or your school schedule.
                </div>
                <label className="mt-4 flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={galleryOptIn}
                    onChange={(e) => setGalleryOptIn(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-[#C9A96E]"
                  />
                  <span className="text-sm text-white/75 leading-snug">
                    Show it in the{" "}
                    <a href="/gallery" target="_blank" rel="noopener" className="underline decoration-white/30 hover:decoration-white">
                      community gallery
                    </a>
                    <span className="block text-xs text-white/40 mt-0.5">After a quick review by the Ecily team.</span>
                  </span>
                </label>
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

      <Toast toast={toast} onUndo={undo} onDone={clearToast} />
    </div>
  )
}
