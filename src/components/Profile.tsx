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
  ShieldCheck,
  CreditCard,
  PieChart as ChartPieIcon,
  User as UserIcon,
  ArrowRight,
  Mail,
  Calendar
} from 'lucide-react'

export const Profile: React.FC = () => {
  const user = useAppStore((state) => state.user)

  if (!user) return null

  const stats = [
    { label: 'Access Level', value: `0${user.level}`, icon: Zap, color: 'text-gold', sub: 'QUANTUM RANK' },
    { label: 'Synchronization', value: user.xp.toLocaleString(), icon: Target, color: 'text-blue-400', sub: 'XP ACCUMULATED' },
    { label: 'Credits', value: user.ecilyCoins.toLocaleString(), icon: Coins, color: 'text-emerald-400', sub: 'SYSTEM CURRENCY' },
    { label: 'Objectives', value: user.completedLessons.length, icon: Trophy, color: 'text-rose-400', sub: 'MISSIONS SECURED' },
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
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto px-6 py-20 space-y-16 pb-48 font-display text-white"
    >
      {/* Dynamic Profile HUD */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center md:items-end gap-10 md:px-8">
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-6 rounded-full border border-dashed border-gold/20"
          />
          <div className="w-40 h-48 rounded-super premium-glass flex items-center justify-center relative overflow-hidden group border-gold/30 shadow-gold-bloom/10">
            <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <span className="text-7xl font-black text-gold italic gold-gradient relative z-10 select-none">
              {user.name.charAt(0).toUpperCase()}
            </span>
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gold/20 to-transparent" />
          </div>
          <motion.div
             whileHover={{ scale: 1.1 }}
             className="absolute -bottom-4 -right-4 w-14 h-14 rounded-2xl bg-gold flex items-center justify-center text-void border-4 border-void shadow-gold-bloom z-20"
          >
            <UserIcon size={24} strokeWidth={3} />
          </motion.div>
        </div>

        <div className="flex-1 space-y-4 text-center md:text-left">
          <div className="space-y-1">
            <span className="micro-label text-gold">Identity Protocol // Verified</span>
            <h1 className="text-5xl font-black tracking-tighter uppercase italic gold-gradient">
              {user.name}
            </h1>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <div className="flex items-center space-x-2 premium-glass px-4 py-2 rounded-xl border-white/5">
                <Mail size={12} className="text-white/20" />
                <span className="font-mono text-[10px] text-white/40 tracking-wider">strategist@ecily.os</span>
            </div>
            <div className="flex items-center space-x-2 premium-glass px-4 py-2 rounded-xl border-white/5">
                <Calendar size={12} className="text-white/20" />
                <span className="font-mono text-[10px] text-white/40 tracking-wider">EST. 2024.05.12</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tactical Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            whileHover={{ scale: 1.02, y: -5 }}
            className="premium-glass p-8 rounded-super border-white/5 space-y-4 relative overflow-hidden group"
          >
            <div className={`absolute -top-4 -right-4 w-24 h-24 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 ${stat.color.replace('text-', 'bg-')}`} />
            <div className={`w-12 h-12 rounded-2xl bg-white/[0.03] flex items-center justify-center ${stat.color} border border-white/5`}>
              <stat.icon size={22} />
            </div>
            <div>
                <p className="micro-label !text-[8px] mb-1">{stat.label}</p>
                <p className={`text-4xl font-black italic tracking-tighter ${stat.color} group-hover:scale-105 transition-transform duration-500`}>
                {stat.value}
                </p>
                <p className="micro-label !text-[7px] mt-2 opacity-20">{stat.sub}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Operational Settings */}
      <motion.div variants={itemVariants} className="space-y-6">
        <div className="flex items-center space-x-4 px-4">
            <h2 className="text-display text-lg italic whitespace-nowrap">System <span className="gold-gradient">Settings</span></h2>
            <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
                <MenuButton icon={ShieldCheck} label="Security Architecture" sub="Privacy and encryption protocols" />
                <MenuButton icon={CreditCard} label="Billing Interface" sub="Manage financial link resources" />
            </div>
            <div className="space-y-3">
                <MenuButton icon={ChartPieIcon} label="Tactical Reports" sub="Export synchronization data" />
                <MenuButton icon={Settings} label="Core Preferences" sub="Adjust OS interface parameters" />
            </div>
        </div>
      </motion.div>

      {/* Destructive Actions */}
      <motion.div variants={itemVariants} className="pt-8 flex flex-col md:flex-row gap-4">
        <button className="flex-1 h-20 rounded-super premium-glass border-rose-500/20 text-rose-500 font-black uppercase italic tracking-widest text-xs flex items-center justify-center space-x-3 hover:bg-rose-500/10 transition-all duration-500 group">
          <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span>Terminate Session</span>
        </button>
        <button className="flex-1 h-20 rounded-super premium-glass border-white/5 text-white/30 font-black uppercase italic tracking-widest text-xs flex items-center justify-center hover:text-white/60 hover:bg-white/5 transition-all duration-500">
          Sync Database
        </button>
      </motion.div>
    </motion.div>
  )
}

const MenuButton: React.FC<{ icon: any, label: string, subText?: string, sub: string }> = ({ icon: Icon, label, sub }) => (
  <motion.button
    whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.02)" }}
    className="w-full p-6 rounded-super premium-glass border-white/5 flex items-center justify-between group transition-all duration-500"
  >
    <div className="flex items-center space-x-5">
      <div className="w-14 h-14 rounded-2xl bg-white/[0.03] flex items-center justify-center text-white/20 group-hover:text-gold border border-white/5 transition-colors duration-500">
        <Icon size={24} strokeWidth={1.5} />
      </div>
      <div className="text-left space-y-1">
        <span className="text-lg font-black italic uppercase text-white/80 group-hover:text-white transition-colors tracking-tight">{label}</span>
        <p className="micro-label !text-[8px] opacity-30 group-hover:opacity-60 transition-opacity tracking-widest">{sub}</p>
      </div>
    </div>
    <div className="w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0">
        <ArrowRight size={20} className="text-gold" />
    </div>
  </motion.button>
)
