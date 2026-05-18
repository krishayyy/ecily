export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/[0.06] px-8 py-8">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-white/60 font-semibold tracking-tight">ecily</span>
        <div className="flex items-center gap-6 text-xs text-white/25 font-mono">
          <span>© 2025 Ecily</span>
          <a href="#" className="hover:text-white/50 transition-colors duration-200">Privacy</a>
          <a href="#" className="hover:text-white/50 transition-colors duration-200">Terms</a>
        </div>
      </div>
    </footer>
  )
}
