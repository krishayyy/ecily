// Sends a form submission to a Google Apps Script web app, which appends it
// as a row to your Google Sheet. Set SHEET_WEBHOOK_URL in your env (Vercel).
//
// See scripts/sheet-webhook.gs for the script to paste into Google.

export interface SheetRow {
  type: "waitlist" | "chapter"
  name?: string
  email: string
  school?: string
  state?: string
}

export interface SheetResult {
  /** true if the row was persisted to the sheet */
  ok: boolean
  /** true if no webhook is configured yet (so we don't treat it as an error) */
  skipped?: boolean
}

export async function appendToSheet(row: SheetRow): Promise<SheetResult> {
  const url = process.env.SHEET_WEBHOOK_URL
  if (!url) {
    // No sheet configured yet — let the form still "succeed" so the site works
    // before setup. Submissions are logged but not stored until you set the env var.
    return { ok: false, skipped: true }
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row),
      // Apps Script /exec 302-redirects to googleusercontent on POST; follow it.
      redirect: "follow",
    })
    return { ok: res.ok }
  } catch {
    return { ok: false }
  }
}
