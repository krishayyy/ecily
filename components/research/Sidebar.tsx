"use client"

import { useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { Plus, LogOut, GraduationCap } from "lucide-react"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"

export interface SavedSearch {
  id: string
  question: string
  answer: string
  sources: unknown[]
  created_at: string
}

export function Sidebar({
  onSelect,
  onNew,
  activeId,
  refreshKey,
}: {
  onSelect: (search: SavedSearch) => void
  onNew: () => void
  activeId: string | null
  refreshKey: number
}) {
  const [user, setUser] = useState<User | null>(null)
  const [history, setHistory] = useState<SavedSearch[]>([])
  const [email, setEmail] = useState("")
  const [sentTo, setSentTo] = useState<string | null>(null)
  const supabase = createSupabaseBrowserClient()

  useEffect(() => {
    if (!supabase) return
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => sub.subscription.unsubscribe()
  }, [supabase])

  useEffect(() => {
    if (!user) {
      setHistory([])
      return
    }
    fetch("/research/api/history")
      .then((r) => r.json())
      .then((d) => setHistory(d.searches ?? []))
      .catch(() => setHistory([]))
  }, [user, refreshKey])

  async function signIn(e: React.FormEvent) {
    e.preventDefault()
    if (!supabase || !email) return
    await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/research/auth/callback` },
    })
    setSentTo(email)
  }

  async function signOut() {
    await supabase?.auth.signOut()
  }

  return (
    <aside className="flex h-full w-72 shrink-0 flex-col border-r border-[#E4E0D6] bg-[#F7F5EF] text-[#2B2A27]">
      <div className="flex items-center gap-2 px-5 pt-6 pb-4">
        <GraduationCap className="h-5 w-5 text-[#8A5A2C]" />
        <span className="font-semibold tracking-tight">Ecily Research</span>
      </div>

      <button
        onClick={onNew}
        className="mx-4 mb-4 flex items-center gap-2 rounded-lg border border-[#D9D4C5] bg-white px-3 py-2 text-sm font-medium text-[#2B2A27] transition hover:bg-[#EFEBDD]"
      >
        <Plus className="h-4 w-4" />
        New research
      </button>

      <div className="flex-1 overflow-y-auto px-2">
        {user ? (
          history.length > 0 ? (
            <ul className="space-y-1">
              {history.map((h) => (
                <li key={h.id}>
                  <button
                    onClick={() => onSelect(h)}
                    className={`w-full truncate rounded-md px-3 py-2 text-left text-sm transition ${
                      activeId === h.id ? "bg-[#EFEBDD] font-medium" : "hover:bg-[#EFEBDD]/60"
                    }`}
                    title={h.question}
                  >
                    {h.question}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-3 py-2 text-sm text-[#8A8577]">No saved research yet.</p>
          )
        ) : (
          <p className="px-3 py-2 text-sm text-[#8A8577]">Sign in to save your research history.</p>
        )}
      </div>

      <div className="border-t border-[#E4E0D6] p-4">
        {user ? (
          <div className="flex items-center justify-between">
            <span className="truncate text-xs text-[#8A8577]">{user.email}</span>
            <button onClick={signOut} className="text-[#8A8577] hover:text-[#2B2A27]" title="Sign out">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        ) : sentTo ? (
          <p className="text-xs text-[#8A8577]">Check {sentTo} for a sign-in link.</p>
        ) : (
          <form onSubmit={signIn} className="flex gap-1.5">
            <input
              type="email"
              required
              placeholder="you@school.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-[#D9D4C5] bg-white px-2.5 py-1.5 text-xs outline-none focus:border-[#8A5A2C]"
            />
            <button
              type="submit"
              className="shrink-0 rounded-md bg-[#8A5A2C] px-2.5 py-1.5 text-xs font-medium text-white hover:bg-[#734A22]"
            >
              Sign in
            </button>
          </form>
        )}
      </div>
    </aside>
  )
}
