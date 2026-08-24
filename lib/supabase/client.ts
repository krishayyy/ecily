import { createBrowserClient } from "@supabase/ssr"

/** Returns null when Supabase env vars aren't configured, so the research
 *  app still works signed-out (no saved history) instead of crashing. */
export function createSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createBrowserClient(url, key)
}
