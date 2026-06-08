import { NextRequest, NextResponse } from "next/server"
import { appendToSheet } from "@/lib/sheet"

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 })
    }

    const result = await appendToSheet({ type: "waitlist", email })

    // Persistence is configured but failed — tell the user to retry.
    if (!result.ok && !result.skipped) {
      return NextResponse.json({ error: "Couldn't save right now. Try again." }, { status: 500 })
    }

    console.log(`[waitlist] ${email}${result.skipped ? " (not stored — SHEET_WEBHOOK_URL unset)" : " (saved to sheet)"}`)

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 })
  }
}
