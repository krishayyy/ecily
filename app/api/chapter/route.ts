import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { name, email, school, state } = await req.json()

    if (!name || !email || typeof email !== "string" || !email.includes("@") || !school) {
      return NextResponse.json({ error: "Please include your name, a valid email, and your school." }, { status: 400 })
    }

    // Log for now — swap in Resend / Google Sheets / Supabase here to actually store it.
    console.log(`[chapter] New application: ${name} · ${email} · ${school} · ${state || "—"}`)

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 })
  }
}
