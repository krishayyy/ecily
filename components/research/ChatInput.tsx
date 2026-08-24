"use client"

import { useState, useRef, KeyboardEvent } from "react"
import { ArrowUp } from "lucide-react"

export function ChatInput({
  onSubmit,
  loading,
  placeholder = "Ask a research question…",
}: {
  onSubmit: (question: string) => void
  loading: boolean
  placeholder?: string
}) {
  const [value, setValue] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function submit() {
    const q = value.trim()
    if (!q || loading) return
    onSubmit(q)
    setValue("")
    if (textareaRef.current) textareaRef.current.style.height = "auto"
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <div className="flex items-end gap-2 rounded-2xl border border-[#D9D4C5] bg-white p-2.5 shadow-sm focus-within:border-[#8A5A2C]/60">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          e.target.style.height = "auto"
          e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`
        }}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        rows={1}
        maxLength={500}
        disabled={loading}
        className="max-h-40 min-h-[24px] flex-1 resize-none bg-transparent px-1.5 py-1 text-sm text-[#2B2A27] outline-none placeholder:text-[#8A8577]"
      />
      <button
        onClick={submit}
        disabled={loading || !value.trim()}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#8A5A2C] text-white transition disabled:opacity-30"
        aria-label="Send"
      >
        <ArrowUp className="h-4 w-4" />
      </button>
    </div>
  )
}
