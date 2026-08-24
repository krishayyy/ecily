/** Minimal client-side SSE parser for a POST-based stream (EventSource only
 *  supports GET, so the /research/api/query response is read and framed by
 *  hand instead). */
export async function consumeSSE(
  response: Response,
  handlers: {
    onSources?: (sources: unknown[]) => void
    onToken?: (text: string) => void
    onError?: (message: string) => void
    onDone?: () => void
  },
) {
  const reader = response.body?.getReader()
  if (!reader) return

  const decoder = new TextDecoder()
  let buffer = ""

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })

    const frames = buffer.split("\n\n")
    buffer = frames.pop() ?? ""

    for (const frame of frames) {
      const eventMatch = frame.match(/^event: (.+)$/m)
      const dataMatch = frame.match(/^data: (.+)$/m)
      if (!eventMatch || !dataMatch) continue

      const event = eventMatch[1]
      const data = JSON.parse(dataMatch[1])

      if (event === "sources") handlers.onSources?.(data.sources)
      else if (event === "token") handlers.onToken?.(data.text)
      else if (event === "error") handlers.onError?.(data.message)
      else if (event === "done") handlers.onDone?.()
    }
  }
}
