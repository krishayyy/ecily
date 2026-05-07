import React from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../store'
import {
  Trophy,
  Target,
  Zap,
  Coins,
  Settings,
  LogOut,
  ChevronRight,
  ShieldCheck,
  CreditCard,
  PieChart as ChartPieIcon
} from 'lucide-react'

export const Profile: React.FC = () => {
  const user = useAppStore((state) => state.user)

  if (!user) return null

  const stats = [
    { label: 'Current Level', value: user.level, icon: Zap, color: 'text-gold' },
    { label: 'Total XP', value: user.xp, icon: Target, color: 'text-blue-400' },
    { label: 'Ecily Coins', value: user.ecilyCoins, icon: Coins, color: 'text-yellow-400' },
    { label: 'Lessons Done', value: user.completedLessons.length, icon: Trophy, color: 'text-green-400' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-2xl mx-auto px-6 py-12 space-y-10 pb-40"
    >
      {/* Header / Avatar */}
      <motion.div variants={itemVariants} className="flex flex-col items-center text-center space-y-4">
        <div className="relative group">
          <div className="absolute -inset-4 bg-gold/20 rounded-full blur-2xl group-hover:bg-gold/30 transition-all duration-500" />
          <div className="w-32 h-32 rounded-full glass border-2 border-gold/50 flex items-center justify-center relative overflow-hidden">
            <span className="text-5xl font-black text-gold">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="absolute -bottom-2 right-0 w-10 h-10 rounded-full bg-gold flex items-center justify-center text-black border-4 border-[#030303]">
            <Zap size={18} fill="currentColor" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">
            {user.name}
          </h1>
          <p className="text-white/40 font-medium uppercase tracking-widest text-xs">
            Member Since May 2024
          </p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="glass p-6 rounded-3xl border-white/5 space-y-2 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <stat.icon size={48} />
            </div>
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider">{stat.label}</p>
            <p className={`text-3xl font-black italic tracking-tighter ${stat.color}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Settings List */}
      <motion.div variants={itemVariants} className="space-y-3">
        <h2 className="text-xs font-black text-white/30 uppercase tracking-[0.2em] px-4">Account Settings</h2>
        <div className="glass rounded-[2rem] border-white/5 overflow-hidden divide-y divide-white/5">
          <MenuButton icon={ShieldCheck} label="Security & Privacy" />
          <MenuButton icon={CreditCard} label="Billing Methods" />
          <MenuButton icon={ChartPieIcon} label="Financial Reports" />
          <MenuButton icon={Settings} label="App Preferences" />
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <button className="w-full h-16 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 font-bold flex items-center justify-center space-x-3 hover:bg-red-500/20 transition-colors">
          <LogOut size={20} />
          <span className="uppercase tracking-widest text-sm">Sign Out</span>
        </button>
      </motion.div>
    </motion.div>
  )
}

const MenuButton: React.FC<{ icon: any, label: string }> = ({ icon: Icon, label }) => (
  <button className="w-full px-6 py-5 flex items-center justify-between group hover:bg-white/5 transition-colors">
    <div className="flex items-center space-x-4">
      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/60 group-hover:text-gold transition-colors">
        <Icon size={20} />
      </div>
      <span className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">{label}</span>
    </div>
    <ChevronRight size={16} className="text-white/20 group-hover:text-gold transition-colors" />
  </button>
)
