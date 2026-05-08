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
    console.log("Splash signal received in App");
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
                  <div className="mx-auto max-w-lg premium-glass h-20 rounded-full px-4 flex items-center justify-between shadow-gold-bloom/10 border-white/5 pointer-events-auto relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-gold/5 to-transparent pointer-events-none" />

                    {navItems.map((item) => {
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveTab(item.id);
                            if (window.navigator.vibrate) window.navigator.vibrate(10);
                          }}
                          className={`relative flex flex-col items-center justify-center flex-1 h-full transition-all duration-500 group ${
                            isActive ? 'text-gold' : 'text-white/20 hover:text-white/40'
                          }`}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="nav-glow"
                              className="absolute -top-1 w-12 h-1 bg-gold rounded-full shadow-glow-gold"
                            />
                          )}
                          <item.icon
                            size={isActive ? 24 : 22}
                            strokeWidth={isActive ? 2.5 : 2}
                            className={`transition-transform duration-500 ${isActive ? 'scale-110 -translate-y-1' : 'group-hover:scale-110'}`}
                          />
                          <span className={`text-[10px] font-black uppercase tracking-widest mt-1 transition-all duration-300 ${
                            isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 h-0'
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
