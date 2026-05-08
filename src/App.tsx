import { useState, useCallback } from 'react'
import { OnboardingFlow } from './components/OnboardingFlow'
import { Home } from './components/Home'
import { Worlds } from './components/Worlds'
import { Trading } from './components/Trading'
import { Coach } from './components/Coach'
import { Profile } from './components/Profile'
import { useAppStore } from './store'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home as HomeIcon,
  Globe,
  BarChart3,
  MessageSquare,
  User as UserIcon
} from 'lucide-react'
import { SplashCinematic } from './components/SplashCinematic'
import { GlobalBackground } from './components/GlobalBackground'

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [activeTab, setActiveTab] = useState('home')

  const isAuthenticated = useAppStore((state) => state.isAuthenticated)

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false)
  }, [])

  const navItems = [
    { id: 'home', icon: HomeIcon, label: 'Home' },
    { id: 'worlds', icon: Globe, label: 'Worlds' },
    { id: 'trade', icon: BarChart3, label: 'Trade' },
    { id: 'coach', icon: MessageSquare, label: 'Coach' },
    { id: 'profile', icon: UserIcon, label: 'Profile' },
  ]

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-gold/30 relative">
      <GlobalBackground />

      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashCinematic key="splash" onComplete={handleSplashComplete} />
        ) : (
          <motion.main
            key="content"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative min-h-screen z-10"
          >
            {!isAuthenticated ? (
              <OnboardingFlow />
            ) : (
              <>
                <div className="pb-32">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {activeTab === 'home' && <Home />}
                      {activeTab === 'worlds' && <Worlds />}
                      {activeTab === 'trade' && <Trading />}
                      {activeTab === 'coach' && <Coach />}
                      {activeTab === 'profile' && <Profile />}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Cyber-Premium Navigation Bar */}
                <div className="fixed bottom-8 inset-x-6 z-50 pointer-events-none">
                  <div className="mx-auto max-w-md premium-glass h-16 rounded-2xl px-2 flex items-center justify-between shadow-premium border-white/5 pointer-events-auto relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/[0.01] pointer-events-none" />

                    {navItems.map((item) => {
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveTab(item.id);
                            if (window.navigator.vibrate) window.navigator.vibrate(5);
                          }}
                          className={`relative flex flex-col items-center justify-center flex-1 h-full transition-all duration-500 group ${
                            isActive ? 'text-gold' : 'text-white/10 hover:text-white/30'
                          }`}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="nav-indicator"
                              className="absolute inset-0 bg-gold/5 rounded-xl border border-gold/10"
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                          )}
                          <item.icon
                            size={18}
                            strokeWidth={isActive ? 2.5 : 1.5}
                            className={`transition-all duration-500 relative z-10 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
                          />
                          <span className={`text-[8px] font-black uppercase tracking-widest mt-1 transition-all duration-300 relative z-10 ${
                            isActive ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'
                          }`}>
                            {item.label}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </>
            )}
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
