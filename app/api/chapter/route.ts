import { NextRequest, NextResponse } from "next/server"
import { appendToSheet } from "@/lib/sheet"

export async function POST(req: NextRequest) {
  try {
    const { name, email, school, state } = await req.json()

    if (!name || !email || typeof email !== "string" || !email.includes("@") || !school) {
      return NextResponse.json({ error: "Please include your name, a valid email, and your school." }, { status: 400 })
    }

    const result = await appendToSheet({ type: "chapter", name, email, school, state })

    // Persistence is configured but failed — tell the user to retry so we don't lose it.
    if (!result.ok && !result.skipped) {
      return NextResponse.json({ error: "Couldn't submit right now. Try again." }, { status: 500 })
    }

    console.log(
      `[chapter] ${name} · ${email} · ${school} · ${state || "—"}${result.skipped ? " (not stored — SHEET_WEBHOOK_URL unset)" : " (saved to sheet)"}`
    )

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 })
  }
}
