"use client"

import { motion } from "framer-motion"

const features = [
  {
    label: "AI COACH",
    name: "Meet Cily.",
    description:
      "Your personal finance coach, powered by AI. Cily knows your state's minimum wage laws, your income situation, and where you are in your learning journey. Ask her anything.",
    visual: <CilyChatMockup />,
  },
  {
    label: "PAPER TRADING",
    name: "Real market. Fake money.",
    description:
      "Trade real stocks with $10,000 of simulated cash. Watch your portfolio move with the actual market. Learn what risk feels like before the stakes are real.",
    visual: (
      <div className="w-full max-w-[280px] space-y-2">
        {[
          { ticker: "AAPL", change: "+2.4%", color: "#5EA88A" },
          { ticker: "TSLA", change: "-1.1%", color: "#C46E6E" },
          { ticker: "NVDA", change: "+5.7%", color: "#5EA88A" },
          { ticker: "AMZN", change: "+0.8%", color: "#5EA88A" },
        ].map((stock, i) => (
          <motion.div
            key={stock.ticker}
            className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.4, ease: "easeOut" }}
          >
            <span className="text-sm font-mono text-white/80 tracking-wider">{stock.ticker}</span>
            <span className="text-sm font-mono" style={{ color: stock.color }}>
              {stock.change}
            </span>
          </motion.div>
        ))}
      </div>
    ),
  },
  {
    label: "XP & STREAKS",
    name: "Progress that feels real.",
    description:
      "Every lesson earns XP. Every day you come back builds your streak. Level up, unlock new worlds, and collect achievements — the grind is the point.",
    visual: (
      <div className="w-full max-w-[280px] space-y-4">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs tracking-[0.15em] uppercase font-mono text-white/40">Level Progress</span>
            <span className="text-xs font-mono text-white/60">1,240 / 1,500 XP</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#8B94D4] rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "82%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            />
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 7 }, (_, i) => (
            <div
              key={i}
              className="aspect-square rounded-lg flex items-center justify-center text-xs"
              style={{
                background: i < 5 ? "rgba(139,148,212,0.25)" : "rgba(255,255,255,0.05)",
                border: i < 5 ? "1px solid rgba(139,148,212,0.3)" : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {i < 5 && <span className="text-[#8B94D4] text-[10px]">✓</span>}
            </div>
          ))}
        </div>
        <p className="text-xs text-white/40 text-center font-mono tracking-wider">5 DAY STREAK</p>
      </div>
    ),
  },
]

function CilyChatMockup() {
  const prompts = [
    "I want recession-proof stocks",
    "How do I start investing with $100?",
    "Explain compound interest with my money",
    "Is now a good time to buy?",
  ]

  return (
    <div className="relative w-[260px] sm:w-[280px] rounded-[2.5rem] border-[8px] border-black bg-black shadow-[0_30px_70px_rgba(0,0,0,0.5)]">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-24 h-5 bg-black rounded-b-2xl z-10" />
      <div className="rounded-[2rem] overflow-hidden bg-gradient-to-b from-[#F3E9E4] to-[#EDEAF3] aspect-[9/19.5] p-4 flex flex-col">
        <div className="flex items-center gap-1.5 mb-5 pt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8B94D4]" />
          <span className="text-xs font-semibold text-black/70">Cily</span>
        </div>

        <p className="text-lg font-bold text-black leading-tight">Hey Alex</p>
        <p className="text-sm text-black/45 mb-4 flex items-center gap-1.5">
          What&apos;s on your mind? <span>🦊</span>
        </p>

        <div className="space-y-2">
          {prompts.map((p, i) => (
            <motion.div
              key={p}
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.4, ease: "easeOut" }}
              className="flex items-center gap-2 bg-white/70 rounded-xl px-3 py-2.5 border border-black/5"
            >
              <span className="w-4 h-4 rounded-full bg-[#8B94D4]/15 text-[#8B94D4] text-[9px] flex items-center justify-center shrink-0">
                ↗
              </span>
              <span className="text-[11px] leading-snug text-black/75">{p}</span>
            </motion.div>
          ))}
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-2 bg-white/60 rounded-full px-3 py-2.5 border border-black/5 mb-3">
          <span className="text-black/30 text-xs">◌</span>
          <span className="text-[11px] text-black/35 flex-1">Ask Cily anything</span>
          <span className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center text-black/50 text-[10px]">
            ↑
          </span>
        </div>

        <div className="flex items-center justify-between px-1">
          {[
            { icon: "⌂", label: "Home" },
            { icon: "🌐", label: "Worlds" },
            { icon: "📈", label: "Trade" },
            { icon: "💬", label: "Cily" },
          ].map((tab) => (
            <div key={tab.label} className="flex flex-col items-center gap-1">
              <span
                className={`text-xs ${tab.label === "Cily" ? "text-[#8B94D4]" : "text-black/30"}`}
              >
                {tab.icon}
              </span>
              <span
                className={`text-[8px] font-mono ${tab.label === "Cily" ? "text-[#8B94D4]" : "text-black/30"}`}
              >
                {tab.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Features() {
  return (
    <section className="bg-[#0C0C0C] py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-[10px] tracking-[0.25em] uppercase font-mono text-white/30 mb-4">
            Built different
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-white leading-tight tracking-tight">
            Everything you need.<br />Nothing you don&apos;t.
          </h2>
        </motion.div>

        <div className="space-y-32">
          {features.map((feature, i) => (
            <motion.div
              key={feature.label}
              className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-12 md:gap-20`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex-1 space-y-4">
                <span className="text-[10px] tracking-[0.25em] uppercase font-mono text-white/30">
                  {feature.label}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                  {feature.name}
                </h3>
                <p className="text-base text-white/50 leading-relaxed max-w-sm">
                  {feature.description}
                </p>
              </div>
              <div className="flex-1 flex justify-center">
                {feature.visual}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
