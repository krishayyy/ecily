"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || status === "loading") return

    setStatus("loading")
    setErrorMsg("")

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
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

  return (
    <section id="waitlist" className="bg-[#1C1A16] py-32 px-6">
      <div className="max-w-xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#E0C28A] mb-4">
            Early access
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white leading-tight tracking-tight mb-4">
            Be first in.
          </h2>
          <p className="text-base text-white/50 mb-10 leading-relaxed">
            Ecily is launching soon. Drop your email and you&apos;ll be among the first to get access.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="py-6"
            >
              <div className="w-12 h-12 rounded-full bg-[#5EA88A]/20 border border-[#5EA88A]/30 flex items-center justify-center mx-auto mb-4">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10l4.5 4.5L16 6" stroke="#7CC9A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-white font-semibold text-lg">You&apos;re on the list.</p>
              <p className="text-white/50 text-sm mt-1">We&apos;ll be in touch when Ecily is ready.</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-white/10 border border-white/15 rounded-full px-5 py-3.5 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-white/35 transition-colors duration-200"
              />
              <motion.button
                type="submit"
                disabled={status === "loading"}
                className="px-6 py-3.5 rounded-full bg-white text-[#1C1A16] text-sm font-semibold disabled:opacity-50 transition-opacity duration-200 whitespace-nowrap"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {status === "loading" ? "Joining..." : "Get early access"}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>

        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#E39494] text-xs mt-3 font-mono"
          >
            {errorMsg}
          </motion.p>
        )}
      </div>
    </section>
  )
}
