import { OnboardingFlow } from './components/OnboardingFlow'
import { Home } from './components/Home'
import { Worlds } from './components/Worlds'
import { Trading } from './components/Trading'
import { Coach } from './components/Coach'
import { useAppStore } from './store'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home as HomeIcon,
  Globe,
  BarChart3,
  MessageSquare,
  User as UserIcon
} from 'lucide-react'
import { useState } from 'react'
import { SplashCinematic } from './components/SplashCinematic'

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [activeTab, setActiveTab] = useState('home')
  const { isAuthenticated } = useAppStore((state) => ({
    isAuthenticated: state.isAuthenticated
  }))

  const navItems = [
    { id: 'home', icon: HomeIcon, label: 'Home' },
    { id: 'worlds', icon: Globe, label: 'Worlds' },
    { id: 'trade', icon: BarChart3, label: 'Trade' },
    { id: 'coach', icon: MessageSquare, label: 'Coach' },
    { id: 'profile', icon: UserIcon, label: 'Profile' },
  ]

  return (
    <div className="min-h-screen bg-void text-white selection:bg-gold/30">
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashCinematic key="splash" onComplete={() => setShowSplash(false)} />
        ) : (
          <motion.main
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full relative min-h-screen"
          >
            {!isAuthenticated ? (
              <OnboardingFlow />
            ) : (
              <>
                <div className="pb-0">
                  {activeTab === 'home' && <Home />}
                  {activeTab === 'worlds' && <Worlds />}
                  {activeTab === 'trade' && <Trading />}
                  {activeTab === 'coach' && <Coach />}
                  {activeTab === 'profile' && (
                    <div className="flex items-center justify-center min-h-screen">
                      <h1 className="text-2xl font-black text-gradient-gold uppercase tracking-tighter">
                        Profile Coming Soon
                      </h1>
                    </div>
                  )}
                </div>

                {/* Premium Navigation Bar */}
                <div className="fixed bottom-8 inset-x-6 z-40 pointer-events-none">
                  <div className="glass h-20 rounded-[32px] px-4 flex items-center justify-between shadow-2xl shadow-black/50 pointer-events-auto">
                    {navItems.map((item) => {
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setActiveTab(item.id)}
                          className={`relative flex flex-col items-center justify-center flex-1 h-full transition-all duration-300 ${
                            isActive ? 'text-gold' : 'text-white/20 hover:text-white/40'
                          }`}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="nav-glow"
                              className="absolute -top-1 w-12 h-1 bg-gold rounded-full shadow-[0_0_15px_#F5C842]"
                            />
                          )}
                          <item.icon size={isActive ? 24 : 22} strokeWidth={isActive ? 2.5 : 2} />
                          <span className={`text-[10px] font-black uppercase tracking-widest mt-1 transition-all ${
                            isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75 h-0'
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
