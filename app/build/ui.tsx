"use client"

// Shared building blocks for the Website Maker editor.

import { useEffect, useRef, useState } from "react"
import type { Field } from "@/lib/siteBuilder"

// ── Small UI pieces ──────────────────────────────────────────

export function Icon({ d, size = 15 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  )
}

export const ICONS = {
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
  redo: "M15 14l5-5-5-5M20 9H9a5 5 0 000 10h3",
  tablet: "M5 3h14v18H5zM11 18h2",
  grip: "M9 6h.01M15 6h.01M9 12h.01M15 12h.01M9 18h.01M15 18h.01",
  check: "M5 12l5 5L20 7",
  globe: "M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z",
}

export function IconButton({
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

export function Segmented<T extends string>({
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

export const inputCls =
  "w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#C9A96E]/70 focus:ring-1 focus:ring-[#C9A96E]/40 transition-colors"

/** Shrink uploads so the page (and localStorage) stays light. */
export function readImage(file: File): Promise<string> {
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

export function FieldInput({
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

export function Labeled({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block mb-1.5 text-[11px] font-mono uppercase tracking-[0.12em] text-white/40">{label}</span>
      {children}
    </label>
  )
}

export function Modal({ onClose, children, wide }: { onClose: () => void; children: React.ReactNode; wide?: boolean }) {
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

export type ToastMsg = { id: number; text: string; undo?: boolean }

/** Bottom-of-screen confirmation, with an optional Undo. */
export function Toast({ toast, onUndo, onDone }: { toast: ToastMsg | null; onUndo: () => void; onDone: () => void }) {
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(onDone, toast.undo ? 5000 : 2600)
    return () => clearTimeout(t)
  }, [toast, onDone])
  if (!toast) return null
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex justify-center px-4">
      <div
        key={toast.id}
        role="status"
        className="pointer-events-auto flex items-center gap-3 rounded-full bg-white text-black pl-5 pr-2 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.45)] text-sm animate-[toastIn_.22s_ease-out]"
      >
        <span>{toast.text}</span>
        {toast.undo && (
          <button
            type="button"
            onClick={() => {
              onUndo()
              onDone()
            }}
            className="h-8 px-3 rounded-full bg-black/[0.06] hover:bg-black/[0.1] font-semibold"
          >
            Undo
          </button>
        )}
      </div>
    </div>
  )
}
