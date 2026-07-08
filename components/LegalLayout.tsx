import Nav from "@/components/Nav"
import Footer from "@/components/Footer"

export function LegalLayout({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string
  title: string
  updated: string
  children: React.ReactNode
}) {
  return (
    <>
      <Nav />
      <main className="bg-[#080808] min-h-screen">
        <section className="relative px-6 pt-36 pb-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,169,110,0.10),transparent_55%)]" />
          <div className="relative max-w-3xl mx-auto">
            <p className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#C9A96E]/70 mb-4">
              {eyebrow}
            </p>
            <h1 className="text-[clamp(2rem,5vw,3.2rem)] font-bold text-white leading-[1.05] tracking-tight">
              {title}
            </h1>
            <p className="mt-4 text-sm text-white/35 font-mono">Last updated: {updated}</p>
          </div>
        </section>

        <section className="px-6 pb-28">
          <div className="max-w-3xl mx-auto space-y-4">{children}</div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export function LegalCard({
  title,
  accent = "#C9A96E",
  children,
}: {
  title: string
  accent?: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#1C1C1C] p-5">
      <h3 className="text-sm font-bold mb-2" style={{ color: accent }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-white/75">{children}</p>
    </div>
  )
}

export function LegalSectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-black text-white pt-6 pb-1">{children}</h2>
  )
}

export function DataRow({
  category,
  what,
  why,
  retention,
}: {
  category: string
  what: string
  why: string
  retention: string
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#1C1C1C] overflow-hidden">
      <div className="flex items-center gap-2 px-4 pt-3 pb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
        <span className="text-sm font-bold text-white">{category}</span>
      </div>
      <div className="border-t border-white/[0.06]" />
      {[
        ["What", what],
        ["Why", why],
      ].map(([label, value]) => (
        <div key={label} className="px-4 py-2 border-t border-white/[0.04]">
          <div className="text-[10px] font-semibold uppercase text-white/30 mb-0.5">{label}</div>
          <div className="text-sm text-white/75">{value}</div>
        </div>
      ))}
      <div className="px-4 py-2 border-t border-white/[0.04]">
        <div className="text-[10px] font-semibold uppercase text-white/30 mb-0.5">Kept for</div>
        <div className="text-sm text-[#5EA88A]">{retention}</div>
      </div>
    </div>
  )
}
