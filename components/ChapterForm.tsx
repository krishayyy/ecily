"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function ChapterForm() {
  const [form, setForm] = useState({ name: "", email: "", school: "", state: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === "loading") return
    if (!form.name || !form.email || !form.school) {
      setErrorMsg("Please fill in your name, email, and school.")
      setStatus("error")
      return
    }
    setStatus("loading")
    setErrorMsg("")
    try {
      const res = await fetch("/api/chapter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus("success")
      } else {
        const data = await res.json()
        setErrorMsg(data.error || "Something went wrong.")
        setStatus("error")
      }
    } catch {
      setErrorMsg("Something went wrong. Try again.")
      setStatus("error")
    }
  }

  const inputClass =
    "w-full bg-white border border-ink/12 rounded-xl px-4 py-3 text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:border-slate/60 transition-colors duration-200"

  return (
    <motion.div
      id="start"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mt-24 scroll-mt-24"
    >
      <div className="rounded-3xl bg-slate/10 p-8 sm:p-12 max-w-2xl mx-auto text-center">
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="py-4"
            >
              <div className="w-12 h-12 rounded-full bg-slate/25 border border-slate/40 flex items-center justify-center mx-auto mb-4">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10l4.5 4.5L16 6" stroke="#4D5382" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-ink font-semibold text-lg">Application received.</p>
              <p className="text-ink/50 text-sm mt-1">
                We&apos;ll reach out about founding your chapter and becoming a State Delegate.
              </p>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="text-[10px] tracking-[0.25em] uppercase font-mono text-slate mb-3">
                Founding chapters
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight mb-2">
                Start a chapter
              </h3>
              <p className="text-sm text-ink/50 mb-8 max-w-md mx-auto">
                Apply to found your school&apos;s chapter and become a Founding State Delegate.
                We hand you the curriculum and the platform — you bring the people.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3 text-left">
                <div className="grid sm:grid-cols-2 gap-3">
                  <input className={inputClass} placeholder="Your name" value={form.name} onChange={update("name")} />
                  <input className={inputClass} type="email" placeholder="Email" value={form.email} onChange={update("email")} />
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <input className={inputClass} placeholder="School" value={form.school} onChange={update("school")} />
                  <input className={inputClass} placeholder="State" value={form.state} onChange={update("state")} />
                </div>
                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full mt-2 rounded-full bg-ink text-cream text-sm font-semibold py-3.5 disabled:opacity-50 hover:bg-grape transition-colors duration-200"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {status === "loading" ? "Submitting..." : "Apply to start a chapter"}
                </motion.button>
              </form>

              {status === "error" && (
                <p className="text-[#B24747] text-xs mt-3 font-mono">{errorMsg}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
