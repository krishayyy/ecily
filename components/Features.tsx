"use client"

import { motion } from "framer-motion"

const features = [
  {
    label: "AI COACH",
    name: "Meet Cily.",
    description:
      "Your personal finance coach, powered by AI. Cily knows your state's minimum wage laws, your income situation, and where you are in your learning journey. Ask her anything.",
    visual: (
      <div className="relative w-full aspect-square max-w-[280px] flex items-center justify-center">
        <div className="w-32 h-32 rounded-full bg-[#6B74C4]/15 border border-[#6B74C4]/30 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-[#6B74C4]/25 border border-[#6B74C4]/40 flex items-center justify-center">
            <span className="text-3xl font-bold text-[#6B74C4]">C</span>
          </div>
        </div>
        {/* Orbiting dots */}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-[#6B74C4]/55"
            style={{
              transform: `rotate(${deg}deg) translateX(68px)`,
            }}
          />
        ))}
      </div>
    ),
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
            className="flex items-center justify-between bg-white border border-black/[0.08] rounded-xl px-4 py-3 shadow-[0_4px_16px_rgba(28,26,22,0.05)]"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.4, ease: "easeOut" }}
          >
            <span className="text-sm font-mono text-[#1C1A16]/80 tracking-wider">{stock.ticker}</span>
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
        <div className="bg-white border border-black/[0.08] rounded-2xl p-4 shadow-[0_4px_16px_rgba(28,26,22,0.05)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs tracking-[0.15em] uppercase font-mono text-[#1C1A16]/45">Level Progress</span>
            <span className="text-xs font-mono text-[#1C1A16]/60">1,240 / 1,500 XP</span>
          </div>
          <div className="h-1.5 bg-black/[0.08] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#6B74C4] rounded-full"
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
                background: i < 5 ? "rgba(107,116,196,0.16)" : "rgba(28,26,22,0.04)",
                border: i < 5 ? "1px solid rgba(107,116,196,0.35)" : "1px solid rgba(28,26,22,0.08)",
              }}
            >
              {i < 5 && <span className="text-[#6B74C4] text-[10px]">✓</span>}
            </div>
          ))}
        </div>
        <p className="text-xs text-[#1C1A16]/45 text-center font-mono tracking-wider">5 DAY STREAK</p>
      </div>
    ),
  },
]

export default function Features() {
  return (
    <section className="bg-[#E2F0E5] py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#3F8F6C] mb-4">
            Built different
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-[#1C1A16] leading-tight tracking-tight">
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
                <span className="text-[10px] tracking-[0.25em] uppercase font-mono text-[#1C1A16]/40">
                  {feature.label}
                </span>
                <h3 className="text-3xl md:text-4xl font-extrabold text-[#1C1A16] tracking-tight leading-tight">
                  {feature.name}
                </h3>
                <p className="text-base text-[#1C1A16]/60 leading-relaxed max-w-sm">
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
