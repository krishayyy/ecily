import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store';
import {
  Play,
  Flame,
  Zap,
  ChevronRight,
  LayoutGrid,
  TrendingUp,
  Compass,
  Target,
  Trophy,
  MapPin,
  Calendar,
  CheckCircle2,
  Briefcase,
  Scale,
  Bitcoin
} from 'lucide-react';

export const Home: React.FC = () => {
  const user = useAppStore((state) => state.user);

  if (!user) return null;

  const accentColor = "#C5A059";
  const bgClass = "bg-void";
  const isLight = false;
  const textColor = 'text-white';
  const mutedTextColor = 'text-white/40';

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const xpProgress = (user.xp % 500) / 500;

  return (
    <div className={`min-h-screen ${bgClass} ${textColor} pb-40 transition-colors duration-1000`}>
      <div className="fixed inset-0 bg-midnight -z-10" />
      {/* Top Navigation / Background Glow */}
      <div className="fixed top-0 left-0 right-0 h-96 pointer-events-none overflow-hidden -z-10">
        <motion.div
            animate={{
                opacity: [0.05, 0.1, 0.05],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -top-48 -left-48 w-[600px] h-[200px] blur-[120px] rounded-full bg-gold/20"
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-16 space-y-12">
        {/* Top Header Area */}
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-sm font-bold uppercase tracking-widest ${mutedTextColor}`}
            >
              {greeting()}, {user.name}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold tracking-tight"
            >
              Ready to continue your <br />
              <span style={{ color: accentColor }}>investing streak?</span>
            </motion.h1>
          </div>

          {/* Progress Ring in Header */}
          <div className="flex items-center space-x-6">
            <div className="relative w-20 h-20">
                <svg className="w-full h-full -rotate-90">
                    <circle cx="40" cy="40" r="36" className="fill-none stroke-white/5" strokeWidth="2" />
                    <motion.circle
                        cx="40" cy="40" r="36"
                        className="fill-none stroke-gold"
                        strokeWidth="2"
                        strokeDasharray="226"
                        initial={{ strokeDashoffset: 226 }}
                        animate={{ strokeDashoffset: 226 - (226 * xpProgress) }}
                        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Zap size={18} className="text-gold" />
                </div>
            </div>

            <div className="hidden md:flex flex-col items-end space-y-1">
                 <div className="flex items-center space-x-2">
                    <span className="font-bold">{user.streak} DAY STREAK</span>
                    <Flame size={16} className="text-orange-500" fill="currentColor" />
                 </div>
                 <div className="flex items-center space-x-2">
                    <span className="font-bold">{user.ecilyCoins} CREDITS</span>
                    <Trophy size={16} className="text-yellow-500" />
                 </div>
            </div>
          </div>
        </div>

        {/* Dashboard Sections */}
        <div className="space-y-16">

          {/* Section 1: Continue Learning (Large Hero Card) */}
          <section className="space-y-6">
            <h2 className="micro-label text-gold">Tactical Priority</h2>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className={`group relative p-10 rounded-super overflow-hidden cursor-pointer bg-white/5 border border-white/5 transition-all`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gold/5 group-hover:to-gold/10 transition-all" />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-4 max-w-lg">
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black tracking-widest bg-gold/10 text-gold uppercase border border-gold/20">Active Mission</span>
                    <span className={`text-[10px] font-mono tracking-widest ${mutedTextColor}`}>T-MINUS 05:00</span>
                  </div>
                  <h3 className="text-3xl font-black italic uppercase tracking-tighter">The Compound Interest Protocol</h3>
                  <p className={`text-sm leading-relaxed ${mutedTextColor} max-w-sm`}>Learn how your capital grows exponentially through automated reinvestment systems.</p>
                  <div className="pt-4 flex items-center space-x-6">
                     <button className="h-14 px-8 rounded-xl bg-gold text-void font-black uppercase italic text-xs tracking-widest flex items-center space-x-3 hover:bg-gold-bright transition-all shadow-gold-glow">
                        <Play size={16} fill="currentColor" />
                        <span>Resume Session</span>
                     </button>
                  </div>
                </div>

                <div className="relative w-40 h-40 hidden md:block">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border border-dashed border-gold/20 rounded-full"
                    />
                    <div className="absolute inset-6 rounded-full bg-gold/5 flex items-center justify-center backdrop-blur-xl border border-gold/10">
                        <TrendingUp size={32} className="text-gold" />
                    </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Section 2: Recommended For You (Horizontal Cards) */}
          <section className="space-y-6">
             <div className="flex justify-between items-center px-4">
               <h2 className="micro-label text-gold">Personalized Paths</h2>
               <button className={`text-[10px] font-black uppercase tracking-widest flex items-center space-x-1 ${mutedTextColor} hover:text-gold transition-colors`}>
                  <span>Explore Terminal</span>
                  <ChevronRight size={12} />
               </button>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: "Tax Optimization", icon: Target, sub: "JURISDICTION PROTOCOLS" },
                  { title: "Asset Allocation", icon: LayoutGrid, sub: "RISK MITIGATION" },
                  { title: "Real Estate 101", icon: MapPin, sub: "PHYSICAL ASSETS" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.05)" }}
                    className={`p-6 rounded-super space-y-6 cursor-pointer bg-white/5 border border-white/5 transition-all group`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-gold/30 transition-colors">
                      <item.icon size={20} className="text-gold" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold italic uppercase tracking-tight">{item.title}</h4>
                      <p className={`text-[8px] font-mono mt-1 tracking-widest opacity-30 group-hover:opacity-60 transition-opacity`}>{item.sub}</p>
                    </div>
                  </motion.div>
                ))}
             </div>
          </section>

          {/* Section 3: Trending Topics (Spotify style list) */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-xl font-bold tracking-tight">Trending Topics</h2>
              <div className="space-y-2">
                {[
                  { title: "Side Hustle Economy", listeners: "14k active", icon: Briefcase },
                  { title: "Budgeting for Graduation", listeners: "8k active", icon: Scale },
                  { title: "The Bitcoin Halving", listeners: "22k active", icon: Bitcoin },
                  { title: "Stock Market Volatility", listeners: "5k active", icon: TrendingUp }
                ].map((topic, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer group">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gold group-hover:bg-gold/20 transition-all">
                        <topic.icon size={20} />
                      </div>
                      <div>
                        <p className="font-bold">{topic.title}</p>
                        <p className={`text-xs ${mutedTextColor}`}>{topic.listeners}</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className={`opacity-0 group-hover:opacity-40 transition-opacity`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Challenge */}
            <div className="space-y-6">
              <h2 className="micro-label text-gold">Daily Objective</h2>
               <div className={`p-8 rounded-super relative overflow-hidden h-full flex flex-col justify-between bg-white text-void shadow-gold-glow`}>
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center space-x-2 opacity-40">
                       <Calendar size={14} />
                       <span className="text-[10px] font-black uppercase tracking-widest">CYCLE 2024.05.12</span>
                    </div>
                    <h3 className="text-2xl font-black italic uppercase tracking-tighter leading-none">Identify FICO <br />Components</h3>
                  </div>
                  <button className={`mt-8 h-14 rounded-xl font-black uppercase italic text-xs tracking-widest relative z-10 transition-all active:scale-95 bg-void text-gold hover:bg-black`}>
                    Initialize (+50 XP)
                  </button>
                  <div className="absolute -bottom-10 -right-10 opacity-5">
                    <Trophy size={160} />
                  </div>
               </div>
            </div>
          </section>

          {/* Section 4: Your Learning Paths (Apple Music style horizontal scroll) */}
          <section className="space-y-6">
            <h2 className="micro-label text-gold">Operational Paths</h2>
            <div className="flex space-x-6 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
              {[
                { title: "The Wealth Builder", lessons: "12 lessons", color: "from-gold/20" },
                { title: "Debt Free Protocol", lessons: "8 lessons", color: "from-white/10" },
                { title: "Market Strategist", lessons: "15 lessons", color: "from-gold/10" },
                { title: "Tax Haven Alpha", lessons: "6 lessons", color: "from-white/5" }
              ].map((path, i) => (
                <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className={`flex-shrink-0 w-72 h-72 rounded-super p-8 flex flex-col justify-end relative overflow-hidden cursor-pointer group bg-white/5 border border-white/5`}
                >
                    <div className={`absolute inset-0 bg-gradient-to-t ${path.color} to-transparent opacity-40 group-hover:opacity-60 transition-opacity`} />
                    <div className="relative z-10 space-y-2">
                        <h4 className="text-2xl font-bold leading-tight">{path.title}</h4>
                        <p className={`text-sm font-bold uppercase tracking-widest ${mutedTextColor}`}>{path.lessons}</p>
                    </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Interactive Tools */}
          <section className="space-y-6">
            <h2 className="micro-label text-gold">Tactical Tools</h2>
            <div className="flex space-x-6 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
              {[
                { title: "Net Worth Visualizer", color: "bg-gold" },
                { title: "Compound Calculator", color: "bg-white" },
                { title: "Debt Destroyer", color: "bg-gold" },
                { title: "Budget Builder", color: "bg-white" },
                { title: "Portfolio Simulator", color: "bg-gold" }
              ].map((tool, i) => (
                <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="flex-shrink-0 w-64 h-40 rounded-super p-6 flex flex-col justify-end relative overflow-hidden cursor-pointer group bg-white/5 border border-white/5"
                >
                    <div className={`absolute inset-0 ${tool.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                    <div className={`absolute top-0 right-0 p-4`}>
                        <Compass className={`${tool.color.replace('bg-', 'text-')} opacity-20`} size={40} />
                    </div>
                    <p className="font-bold text-lg leading-tight relative z-10">{tool.title}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Recently Completed */}
          <section className="space-y-6">
            <h2 className="text-xl font-bold tracking-tight opacity-40">Recently Completed</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["Capital Theory", "Priority Matrix", "Trust Index"].map((item, i) => (
                    <div key={i} className={`p-4 rounded-2xl flex items-center space-x-3 opacity-30 hover:opacity-100 transition-opacity ${isLight ? 'bg-black/5' : 'bg-white/5'}`}>
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                            <CheckCircle2 size={16} />
                        </div>
                        <span className="text-xs font-bold truncate">{item}</span>
                    </div>
                ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};
