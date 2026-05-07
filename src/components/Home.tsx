import { motion } from 'framer-motion';
import { useAppStore } from '../store';
import {
  Zap,
  Flame,
  CircleDollarSign,
  ChevronRight,
  TrendingUp,
  BookOpen,
  PieChart,
  Target
} from 'lucide-react';

export const Home: React.FC = () => {
  const user = useAppStore((state) => state.user);

  if (!user) return null;

  const xpProgress = (user.xp % 500) / 500;

  return (
    <div className="min-h-screen bg-dark-base pb-32">
      {/* Premium Header */}
      <div className="px-6 pt-12 pb-6 flex justify-between items-end">
        <div>
          <p className="text-white/40 text-sm font-medium">Good morning,</p>
          <h1 className="text-3xl font-black tracking-tight">{user.name.split(' ')[0]}</h1>
        </div>
        <div className="flex space-x-3">
          <div className="flex items-center space-x-2 bg-dark-card border border-dark-border px-3 py-1.5 rounded-full">
            <CircleDollarSign size={14} className="text-gold" />
            <span className="text-sm font-bold text-white/90">{user.ecilyCoins}</span>
          </div>
          <div className="flex items-center space-x-2 bg-dark-card border border-dark-border px-3 py-1.5 rounded-full">
            <Flame size={14} className="text-streakFire" />
            <span className="text-sm font-bold text-white/90">{user.streak}</span>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-6">
        {/* Level Progress Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative glass p-6 rounded-3xl overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-3xl group-hover:bg-gold/20 transition-colors" />

          <div className="flex items-center space-x-6 relative z-10">
            <div className="relative w-24 h-24">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="48" cy="48" r="44"
                  className="fill-none stroke-white/5"
                  strokeWidth="8"
                />
                <motion.circle
                  cx="48" cy="48" r="44"
                  className="fill-none stroke-gold shadow-[0_0_10px_#F5C842]"
                  strokeWidth="8"
                  strokeDasharray="276"
                  initial={{ strokeDashoffset: 276 }}
                  animate={{ strokeDashoffset: 276 - (276 * xpProgress) }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs font-black text-white/30 tracking-tighter">LVL</span>
                <span className="text-3xl font-black">{user.level}</span>
              </div>
            </div>

            <div className="flex-1 space-y-1">
              <p className="text-xl font-black text-white/90">{user.xp} XP</p>
              <p className="text-sm font-medium text-white/40">{500 - (user.xp % 500)} to Level {user.level + 1}</p>

              <div className="pt-2 flex space-x-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-gold bg-gold/10 px-2 py-1 rounded">Bronze Rank</span>
              </div>
            </div>

            <div className="text-right">
              <p className="text-[10px] font-black text-white/30 tracking-widest uppercase">Portfolio</p>
              <p className="text-xl font-mono font-bold text-white/90">${user.portfolio.balance.toLocaleString()}</p>
              <div className="flex items-center justify-end text-success space-x-1">
                <TrendingUp size={10} />
                <span className="text-xs font-bold">+2.4%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Grid */}
        <div className="grid grid-cols-2 gap-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="glass p-5 rounded-3xl flex flex-col justify-between items-start h-40 bg-xpBlue/10 border-xpBlue/20"
          >
            <div className="w-10 h-10 rounded-2xl bg-xpBlue flex items-center justify-center shadow-[0_0_15px_#6366F1]">
              <Zap size={20} />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-xpBlue/60 mb-1">Current Task</p>
              <p className="font-bold text-left leading-tight">Mastering Your <br /> First Budget</p>
            </div>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="glass p-5 rounded-3xl flex flex-col justify-between items-start h-40 bg-gold/5 border-gold/10"
          >
             <div className="w-10 h-10 rounded-2xl bg-gold flex items-center justify-center shadow-[0_0_15px_#F5C842]">
              <PieChart size={20} className="text-void" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-gold/60 mb-1">Analytics</p>
              <p className="font-bold text-left leading-tight">View Your <br /> Spending Mix</p>
            </div>
          </motion.button>
        </div>

        {/* Recommended Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-black tracking-tight">For You</h3>
            <button className="text-gold text-xs font-bold uppercase tracking-widest">See All</button>
          </div>

          {[
            { title: "Stocks vs. Bonds", sub: "Which one fits your goal?", icon: BookOpen, color: "text-wallStreet-green", bg: "bg-wallStreet-green/10" },
            { title: "The 50/30/20 Rule", sub: "Budgeting made simple.", icon: Target, color: "text-creditPink", bg: "bg-creditPink/10" }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-4 rounded-2xl flex items-center space-x-4 border-white/5 hover:border-white/10 transition-colors cursor-pointer group"
            >
              <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center ${item.color}`}>
                <item.icon size={22} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-white/90">{item.title}</p>
                <p className="text-xs font-medium text-white/40">{item.sub}</p>
              </div>
              <ChevronRight size={16} className="text-white/20 group-hover:text-gold transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
