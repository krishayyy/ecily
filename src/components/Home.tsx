import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useAppStore } from '../store';
import {
  Zap,
  Flame,
  CircleDollarSign,
  ChevronRight,
  BookOpen,
  PieChart,
  Target
} from 'lucide-react';

const PremiumCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 50 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 50 });

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

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
      className={`relative glass p-6 rounded-[32px] overflow-hidden group border-white/5 hover:border-white/10 transition-colors ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
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
    <div className="min-h-screen pb-32 pt-12 px-6">
      {/* Header */}
      <div className="flex justify-between items-end mb-10 text-white">
        <div>
          <p className="text-white/40 text-xs font-black uppercase tracking-[0.2em] mb-1">Status: Active</p>
          <h1 className="text-4xl font-black tracking-tight italic uppercase italic">
            Welcome, <span className="text-gradient-gold">{user.name.split(' ')[0]}</span>
          </h1>
        </div>
        <div className="flex space-x-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 bg-dark-surface border border-dark-border px-4 py-2 rounded-2xl shadow-premium"
          >
            <CircleDollarSign size={16} className="text-gold" />
            <span className="text-sm font-black text-white/90">{user.ecilyCoins}</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 bg-dark-surface border border-dark-border px-4 py-2 rounded-2xl shadow-premium"
          >
            <Flame size={16} className="text-streakFire" />
            <span className="text-sm font-black text-white/90">{user.streak}</span>
          </motion.div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Main XP Progress Card */}
        <PremiumCard className="bg-gradient-to-br from-gold/5 via-transparent to-transparent">
          <div className="flex items-center space-x-8 text-white">
            <div className="relative w-32 h-32">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="64" cy="64" r="58"
                  className="fill-none stroke-white/5"
                  strokeWidth="12"
                />
                <motion.circle
                  cx="64" cy="64" r="58"
                  className="fill-none stroke-gold shadow-glow-gold"
                  strokeWidth="12"
                  strokeDasharray="364"
                  initial={{ strokeDashoffset: 364 }}
                  animate={{ strokeDashoffset: 364 - (364 * xpProgress) }}
                  transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ transform: "translateZ(30px)" }}>
                <span className="text-[10px] font-black text-white/20 tracking-widest">RANK</span>
                <span className="text-4xl font-black italic">#{user.level}</span>
              </div>
            </div>

            <div className="flex-1 space-y-2" style={{ transform: "translateZ(10px)" }}>
              <h2 className="text-2xl font-black text-white uppercase italic">Bronze Elite</h2>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${xpProgress * 100}%` }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-full bg-gold shadow-glow-gold"
                />
              </div>
              <p className="text-xs font-bold text-white/30 uppercase tracking-widest">
                {500 - (user.xp % 500)} XP TO NEXT TIER
              </p>
            </div>
          </div>
        </PremiumCard>

        {/* Dynamic Action Grid */}
        <div className="grid grid-cols-2 gap-6">
          <motion.button
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="glass p-6 rounded-[32px] flex flex-col justify-between items-start h-48 bg-xpBlue/5 border-xpBlue/20 relative overflow-hidden group shadow-premium"
          >
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-xpBlue/20 blur-[50px] group-hover:bg-xpBlue/30 transition-colors" />
            <div className="w-12 h-12 rounded-2xl bg-xpBlue flex items-center justify-center shadow-glow-blue relative z-10">
              <Zap size={24} fill="white" />
            </div>
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-xpBlue mb-2">Current Mission</p>
              <p className="text-lg font-black text-left leading-tight text-white/90 italic uppercase">Money <br /> Fundamentals</p>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            className="glass p-6 rounded-[32px] flex flex-col justify-between items-start h-48 bg-gold/5 border-gold/20 relative overflow-hidden group shadow-premium"
          >
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-gold/20 blur-[50px] group-hover:bg-gold/30 transition-colors" />
            <div className="w-12 h-12 rounded-2xl bg-gold flex items-center justify-center shadow-glow-gold relative z-10">
              <PieChart size={24} className="text-void" fill="currentColor" />
            </div>
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gold mb-2">Analytics</p>
              <p className="text-lg font-black text-left leading-tight text-white/90 italic uppercase">Net Worth <br /> Trajectory</p>
            </div>
          </motion.button>
        </div>

        {/* Premium Recommendation List */}
        <div className="space-y-6 text-white">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-xl font-black tracking-tight uppercase italic text-white/90">Strategic Path</h3>
            <div className="h-[1px] flex-1 bg-white/5 mx-4" />
            <button className="text-gold text-[10px] font-black uppercase tracking-[0.2em]">View All</button>
          </div>

          <div className="space-y-4">
            {[
              { title: "Stocks vs. Bonds", sub: "Master the asset allocation matrix.", icon: BookOpen, color: "text-wallStreet-green", bg: "bg-wallStreet-green/10" },
              { title: "The 50/30/20 Framework", sub: "Optimizing your capital flow.", icon: Target, color: "text-creditPink", bg: "bg-creditPink/10" }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.03)" }}
                className="glass p-5 rounded-3xl flex items-center space-x-5 border-white/5 cursor-pointer group transition-all"
              >
                <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center ${item.color} shadow-inner`}>
                  <item.icon size={26} />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-black text-white/90 uppercase italic">{item.title}</p>
                  <p className="text-sm font-medium text-white/30">{item.sub}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold group-hover:text-void transition-all duration-300">
                  <ChevronRight size={18} strokeWidth={3} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
