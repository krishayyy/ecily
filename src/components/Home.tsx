import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useAppStore } from '../store';
import {
  Flame,
  CircleDollarSign,
  ChevronRight,
  Activity,
  Target,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';

const PremiumCard = ({ children, className = "", tilt = true }: { children: React.ReactNode, className?: string, tilt?: boolean }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 50 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 50 });

  const rotateX = useTransform(mouseY, [-300, 300], tilt ? [10, -10] : [0, 0]);
  const rotateY = useTransform(mouseX, [-300, 300], tilt ? [-10, 10] : [0, 0]);

  function onMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative premium-glass p-8 rounded-super overflow-hidden group transition-colors duration-500 ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent pointer-events-none" />
      <div className="relative z-10" style={{ transform: "translateZ(24px)" }}>
        {children}
      </div>
    </motion.div>
  );
};

export const Home: React.FC = () => {
  const user = useAppStore((state) => state.user);

  if (!user) return null;

  const xpProgress = (user.xp % 500) / 500;

  return (
    <div className="min-h-screen pb-32 pt-16 px-6 max-w-4xl mx-auto">
      {/* Top HUD */}
      <div className="flex justify-between items-center mb-12">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10B981] animate-pulse" />
            <span className="micro-label">System Active // Operational</span>
          </div>
          <h1 className="text-display-md text-display italic">
            Command <span className="gold-gradient">Center</span>
          </h1>
        </div>
        <div className="flex space-x-4">
            <div className="flex flex-col items-end">
                <span className="micro-label !text-gold/50 mb-1">Capital</span>
                <div className="premium-glass px-4 py-2 rounded-2xl border-gold/20 flex items-center space-x-2">
                    <CircleDollarSign size={14} className="text-gold" />
                    <span className="font-black text-sm">{user.ecilyCoins.toLocaleString()}</span>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <span className="micro-label !text-orange-500/50 mb-1">Streak</span>
                <div className="premium-glass px-4 py-2 rounded-2xl border-orange-500/20 flex items-center space-x-2">
                    <Flame size={14} className="text-orange-500" />
                    <span className="font-black text-sm">{user.streak}D</span>
                </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Level & Rank (Large Card) */}
        <PremiumCard className="md:col-span-2 border-gold/10 bg-gold/[0.02]">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-12">
                <div className="relative w-48 h-48">
                    {/* Layered Progress Rings */}
                    <svg className="w-full h-full -rotate-90">
                        <circle cx="96" cy="96" r="88" className="fill-none stroke-white/[0.03]" strokeWidth="2" />
                        <circle cx="96" cy="96" r="78" className="fill-none stroke-white/[0.05]" strokeWidth="12" />
                        <motion.circle
                            cx="96" cy="96" r="78"
                            className="fill-none stroke-gold shadow-gold-bloom"
                            strokeWidth="12"
                            strokeDasharray="490"
                            initial={{ strokeDashoffset: 490 }}
                            animate={{ strokeDashoffset: 490 - (490 * xpProgress) }}
                            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ transform: "translateZ(40px)" }}>
                        <span className="micro-label !text-white/20">Access Level</span>
                        <span className="text-6xl font-black italic gold-gradient">0{user.level}</span>
                    </div>
                </div>

                <div className="flex-1 space-y-6 w-full">
                    <div>
                        <h2 className="text-display text-2xl mb-1 italic">Master <span className="gold-gradient">Strategist</span></h2>
                        <p className="text-white/40 text-xs font-lux uppercase tracking-widest">Global Ranking: #2,481</p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-end">
                            <span className="micro-label !text-gold">XP Synchronization</span>
                            <span className="font-mono text-xs text-white/40">{user.xp.toLocaleString()} / 5000</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${xpProgress * 100}%` }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                                className="h-full bg-gold shadow-gold-bloom"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 premium-glass rounded-2xl border-white/[0.02]">
                            <p className="micro-label !text-[8px] mb-1">Precision</p>
                            <p className="font-black text-lg italic uppercase text-gold">98.2%</p>
                        </div>
                        <div className="p-4 premium-glass rounded-2xl border-white/[0.02]">
                            <p className="micro-label !text-[8px] mb-1">Discipline</p>
                            <p className="font-black text-lg italic uppercase text-emerald-500">EXCELLENT</p>
                        </div>
                    </div>
                </div>
            </div>
        </PremiumCard>

        {/* Small Data Cards */}
        <div className="space-y-8">
            <PremiumCard className="h-44 border-electric/20 bg-electric/[0.02]">
                <div className="h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className="w-10 h-10 rounded-xl bg-electric/20 flex items-center justify-center border border-electric/30">
                            <Activity size={20} className="text-electric" />
                        </div>
                        <ArrowUpRight size={16} className="text-white/20" />
                    </div>
                    <div>
                        <p className="micro-label !text-electric mb-1">Current Trajectory</p>
                        <h3 className="text-xl font-black italic uppercase">+12.4%</h3>
                        <p className="text-[10px] text-white/30 uppercase tracking-tighter">Relative to baseline</p>
                    </div>
                </div>
            </PremiumCard>

            <PremiumCard className="h-44 border-white/5 hover:border-gold/30">
                <div className="h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/20">
                            <ShieldCheck size={20} className="text-gold" />
                        </div>
                    </div>
                    <div>
                        <p className="micro-label mb-1">Risk Profile</p>
                        <h3 className="text-xl font-black italic uppercase">Conservative</h3>
                        <p className="text-[10px] text-white/30 uppercase tracking-tighter">Shield: Enabled</p>
                    </div>
                </div>
            </PremiumCard>
        </div>

        {/* Portfolio Stats (Tactical readout) */}
        <PremiumCard className="md:col-span-3 border-white/5">
            <div className="flex flex-col md:flex-row justify-between md:items-center space-y-6 md:space-y-0">
                <div className="space-y-1">
                    <span className="micro-label">Simulated Portfolio</span>
                    <h3 className="text-3xl font-black italic uppercase">
                        ${user.portfolio.balance.toLocaleString()}
                        <span className="text-emerald-500 text-sm ml-3 font-mono not-italic font-medium">▲ $1,240.00</span>
                    </h3>
                </div>

                <div className="flex space-x-12">
                    <div className="space-y-1">
                        <p className="micro-label !text-white/20">Active Positions</p>
                        <p className="font-mono text-xl font-bold">12</p>
                    </div>
                    <div className="space-y-1">
                        <p className="micro-label !text-white/20">Market Volatility</p>
                        <p className="font-mono text-xl font-bold text-orange-500">LOW</p>
                    </div>
                    <div className="space-y-1">
                        <p className="micro-label !text-white/20">Alpha Index</p>
                        <p className="font-mono text-xl font-bold italic gold-gradient">1.42</p>
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="premium-glass px-8 py-4 rounded-2xl border-gold/30 gold-gradient font-black text-xs uppercase tracking-widest"
                >
                    Expand Terminal
                </motion.button>
            </div>
        </PremiumCard>

        {/* Recommendations / Missions */}
        <div className="md:col-span-3 space-y-6">
            <div className="flex items-center space-x-4">
                <h3 className="text-display text-xl italic whitespace-nowrap">Active <span className="gold-gradient">Missions</span></h3>
                <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "Compound Interest Matrix", sub: "Decrypting exponential growth mechanics.", icon: TrendingUp, color: "text-gold", border: "border-gold/20" },
                  { title: "Tax Code Protocol", sub: "Navigating state-level jurisdiction math.", icon: Target, color: "text-electric", border: "border-electric/20" }
                ].map((mission, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.02)" }}
                        className={`premium-glass p-6 rounded-super flex items-center space-x-6 cursor-pointer border ${mission.border} group transition-all`}
                    >
                        <div className={`w-14 h-14 rounded-2xl bg-white/[0.03] flex items-center justify-center ${mission.color} shadow-inner border border-white/5`}>
                            <mission.icon size={26} strokeWidth={2.5} />
                        </div>
                        <div className="flex-1">
                            <p className="text-lg font-black text-white italic uppercase">{mission.title}</p>
                            <p className="text-xs font-lux text-white/30 uppercase tracking-widest">{mission.sub}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronRight size={20} className={mission.color} />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};
