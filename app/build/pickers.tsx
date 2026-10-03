"use client"

import { useMemo } from "react"
import { BLOCKS, BLOCK_ORDER, TEMPLATES, renderSite, type BlockType } from "@/lib/siteBuilder"

// ── Template picker: real, live thumbnails of each starter site ──

export function TemplateGrid({ onPick }: { onPick: (id: string) => void }) {
  // Built once: each build() mints fresh ids, and the thumbnails don't need to change.
  const docs = useMemo(() => TEMPLATES.map((t) => ({ ...t, html: renderSite(t.build()) })), [])
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {docs.map((t) => (
        <button
          key={t.id}
          type="button"
          aria-label={`${t.label} template: ${t.description}`}
          onClick={() => onPick(t.id)}
          className="group text-left rounded-2xl border border-white/10 bg-white/[0.02] hover:border-[#C9A96E]/60 hover:bg-white/[0.04] p-2 transition-colors"
        >
          <div className="relative aspect-[16/11] overflow-hidden rounded-xl bg-white">
            {/* Rendered at desktop size, then scaled down: what you see is the real template. */}
            <iframe
              title={`${t.label} template preview`}
              srcDoc={t.html}
              sandbox=""
              loading="lazy"
              tabIndex={-1}
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 origin-top-left border-0"
              style={{ width: "400%", height: "400%", transform: "scale(0.25)" }}
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-xl" />
            <span aria-hidden className="absolute bottom-2 right-2 rounded-full bg-black/80 px-3 py-1 text-[11px] font-semibold text-white opacity-0 translate-y-1 transition-all group-hover:opacity-100 group-hover:translate-y-0">
              Use this →
            </span>
          </div>
          <div className="px-2 pt-3 pb-1.5">
            <p className="font-semibold text-white">{t.label}</p>
            <p className="mt-0.5 text-xs text-white/45 leading-relaxed">{t.description}</p>
          </div>
        </button>
      ))}
    </div>
  )
}

// ── Section picker: little wireframes so you can see what you're adding ──

const bar = (w: string, extra = "") => <span className={`block h-1.5 rounded-full bg-white/25 ${extra}`} style={{ width: w }} />

function Wire({ type }: { type: BlockType }) {
  switch (type) {
    case "hero":
      return (
        <div className="flex flex-col justify-center gap-1.5 h-full px-3">
          {bar("30%", "bg-[#C9A96E]/70 h-1")}
          <span className="block h-3 w-4/5 rounded bg-white/45" />
          {bar("60%")}
          <span className="mt-1 block h-3 w-10 rounded-full bg-[#C9A96E]" />
        </div>
      )
    case "text":
      return (
        <div className="flex flex-col justify-center gap-1.5 h-full px-5">
          <span className="block h-2.5 w-2/5 rounded bg-white/45 mb-1" />
          {bar("100%")}
          {bar("92%")}
          {bar("70%")}
        </div>
      )
    case "cards":
      return (
        <div className="flex flex-col justify-center gap-2 h-full px-3">
          <span className="block h-2 w-1/3 rounded bg-white/45" />
          <div className="grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-9 rounded-md border border-white/20 bg-white/[0.06] p-1">
                <span className="block h-1 w-3/4 rounded bg-white/40" />
              </span>
            ))}
          </div>
        </div>
      )
    case "stats":
      return (
        <div className="grid grid-cols-3 items-center h-full px-3 text-center">
          {["48k", "1.2k", "300"].map((n) => (
            <span key={n} className="flex flex-col items-center gap-1">
              <span className="text-[13px] font-bold text-[#C9A96E] leading-none">{n}</span>
              {bar("70%")}
            </span>
          ))}
        </div>
      )
    case "details":
      return (
        <div className="flex flex-col justify-center gap-1.5 h-full px-5">
          <span className="block h-2 w-1/3 rounded bg-white/45 mb-0.5" />
          {[0, 1, 2].map((i) => (
            <span key={i} className="flex justify-between border-b border-white/10 pb-1">
              {bar("30%", "bg-white/40")}
              {bar("25%")}
            </span>
          ))}
        </div>
      )
    case "gallery":
      return (
        <div className="grid grid-cols-3 gap-1 h-full p-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <span key={i} className="rounded bg-gradient-to-br from-white/25 to-white/[0.06]" />
          ))}
        </div>
      )
    case "quote":
      return (
        <div className="flex h-full items-center px-5">
          <div className="border-l-2 border-[#C9A96E] pl-2.5 flex flex-col gap-1.5 w-full">
            <span className="block h-2 w-full rounded bg-white/40" />
            <span className="block h-2 w-3/4 rounded bg-white/40" />
            {bar("30%", "mt-0.5")}
          </div>
        </div>
      )
    case "faq":
      return (
        <div className="flex flex-col justify-center gap-1.5 h-full px-5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="flex items-center justify-between border-b border-white/10 pb-1">
              {bar("60%", "bg-white/40")}
              <span className="text-[8px] text-white/40 leading-none">▾</span>
            </span>
          ))}
        </div>
      )
    case "contact":
      return (
        <div className="flex flex-col items-center justify-center gap-1.5 h-full px-3">
          <span className="block h-2.5 w-2/5 rounded bg-white/45" />
          {bar("55%")}
          <span className="mt-1 block h-3 w-12 rounded-full bg-[#C9A96E]" />
        </div>
      )
  }
}

export function BlockGrid({ onPick }: { onPick: (t: BlockType) => void }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {BLOCK_ORDER.map((t) => (
        <button
          key={t}
          type="button"
          aria-label={`${BLOCKS[t].label}: ${BLOCKS[t].description}`}
          onClick={() => onPick(t)}
          className="group text-left rounded-2xl border border-white/10 bg-white/[0.02] hover:border-[#C9A96E]/60 hover:bg-white/[0.04] p-2 transition-colors"
        >
          <div aria-hidden className="aspect-[16/10] rounded-xl bg-[#1b1b1d] border border-white/[0.06] overflow-hidden transition-transform group-hover:scale-[1.02]">
            <Wire type={t} />
          </div>
          <div className="px-1.5 pt-2.5 pb-1">
            <p className="text-sm font-semibold text-white">{BLOCKS[t].label}</p>
            <p className="mt-0.5 text-[11px] text-white/45 leading-snug">{BLOCKS[t].description}</p>
          </div>
        </button>
      ))}
    </div>
  )
}
