/** In-memory, per-instance cache and rate limiter. Best-effort: a cold serverless
 *  instance starts with an empty cache/limiter, so this reduces repeat-query load
 *  and throttles bursts on a warm instance rather than guaranteeing a global cap.
 *  Good enough for an MVP's traffic; swap for Redis/Upstash if this needs to be
 *  authoritative across instances. */

const TTL_MS = 10 * 60 * 1000
const sourceCache = new Map<string, { sources: unknown; expires: number }>()

export function normalizeQuery(question: string) {
  return question.trim().toLowerCase().replace(/\s+/g, " ")
}

export function getCachedSources<T>(question: string): T | null {
  const entry = sourceCache.get(normalizeQuery(question))
  if (!entry || entry.expires < Date.now()) return null
  return entry.sources as T
}

export function setCachedSources(question: string, sources: unknown) {
  sourceCache.set(normalizeQuery(question), { sources, expires: Date.now() + TTL_MS })
  // Keep the cache from growing unbounded on a long-lived warm instance.
  if (sourceCache.size > 500) {
    const oldestKey = sourceCache.keys().next().value
    if (oldestKey) sourceCache.delete(oldestKey)
  }
}

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX = 20
const requestLog = new Map<string, number[]>()

export function isRateLimited(clientId: string): boolean {
  const now = Date.now()
  const timestamps = (requestLog.get(clientId) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  timestamps.push(now)
  requestLog.set(clientId, timestamps)
  return timestamps.length > RATE_LIMIT_MAX
}
