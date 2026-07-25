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
      <main className="bg-[#FBF6EC] min-h-screen">
        <section className="relative px-6 pt-36 pb-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,169,110,0.14),transparent_55%)]" />
          <div className="relative max-w-3xl mx-auto">
            <p className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#B0813A] mb-4">
              {eyebrow}
            </p>
            <h1 className="text-[clamp(2rem,5vw,3.2rem)] font-extrabold text-[#1C1A16] leading-[1.05] tracking-tight">
              {title}
            </h1>
            <p className="mt-4 text-sm text-[#1C1A16]/40 font-mono">Last updated: {updated}</p>
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
  accent = "#B0813A",
  children,
}: {
  title: string
  accent?: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-black/[0.07] bg-white p-5 shadow-[0_4px_16px_rgba(28,26,22,0.04)]">
      <h3 className="text-sm font-bold mb-2" style={{ color: accent }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-[#1C1A16]/75">{children}</p>
    </div>
  )
}

export function LegalSectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-black text-[#1C1A16] pt-6 pb-1">{children}</h2>
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
    <div className="rounded-2xl border border-black/[0.07] bg-white overflow-hidden shadow-[0_4px_16px_rgba(28,26,22,0.04)]">
      <div className="flex items-center gap-2 px-4 pt-3 pb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#B0813A]" />
        <span className="text-sm font-bold text-[#1C1A16]">{category}</span>
      </div>
      <div className="border-t border-black/[0.06]" />
      {[
        ["What", what],
        ["Why", why],
      ].map(([label, value]) => (
        <div key={label} className="px-4 py-2 border-t border-black/[0.05]">
          <div className="text-[10px] font-semibold uppercase text-[#1C1A16]/35 mb-0.5">{label}</div>
          <div className="text-sm text-[#1C1A16]/75">{value}</div>
        </div>
      ))}
      <div className="px-4 py-2 border-t border-black/[0.05]">
        <div className="text-[10px] font-semibold uppercase text-[#1C1A16]/35 mb-0.5">Kept for</div>
        <div className="text-sm text-[#3F8F6C]">{retention}</div>
      </div>
    </div>
  )
}
