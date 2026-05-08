import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store';
import { WheelPicker } from './WheelPicker';
import { type User, type USState, type MoneySituation, type FinancialGoal } from '../types';
import { ChevronRight, ChevronLeft, Shield, Landmark, Zap, BarChart3, GraduationCap, Car, Home, Receipt } from 'lucide-react';

const STATES: USState[] = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

const AGE_RANGE = Array.from({ length: 16 }, (_, i) => i + 10);

const GOAL_CONFIG: { id: FinancialGoal; icon: any; label: string }[] = [
  { id: 'Build savings', icon: Landmark, label: 'Capital Reserve' },
  { id: 'Start investing', icon: BarChart3, label: 'Market Growth' },
  { id: 'Master budgeting', icon: Zap, label: 'Flow Control' },
  { id: 'Build credit', icon: Shield, label: 'Credit Velocity' },
  { id: 'Pay for college', icon: GraduationCap, label: 'Intellectual ROI' },
  { id: 'Own a home', icon: Home, label: 'Asset Acquisition' },
  { id: 'Buy a car', icon: Car, label: 'Mobility Tech' },
  { id: 'Kill debt', icon: Receipt, label: 'Liability Erasure' },
];

export function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const setUser = useAppStore((state) => state.setUser);

  const [formData, setFormData] = useState<Partial<User>>({
    name: 'STRATEGIST',
    age: 16,
    state: 'California',
    moneySituation: 'noIncomeYet',
    goals: [],
    explanationStyle: 'Normal',
    xp: 0,
    level: 1,
    streak: 0,
    ecilyCoins: 100,
    completedLessons: [],
    portfolio: { balance: 10000, holdings: [] }
  });

  const advance = () => {
    setDirection(1);
    setStep(step + 1);
  };

  const retreat = () => {
    setDirection(-1);
    setStep(step - 1);
  };

  const finish = () => {
    const finalUser = {
      uid: 'user_' + Math.random().toString(36).substr(2, 9),
      email: 'strategist@ecily.os',
      ...formData,
      isOnboardingComplete: true,
    } as User;
    setUser(finalUser);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '5vw' : '-5vw',
      opacity: 0,
      filter: "blur(20px)",
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '5vw' : '-5vw',
      opacity: 0,
      filter: "blur(20px)",
    }),
  };

  return (
    <div className="min-h-screen bg-void flex flex-col relative overflow-hidden text-white font-display">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/10 rounded-full blur-[150px]"
        />
      </div>

      {/* Progress Line */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/5 z-50">
        <motion.div
          className="h-full bg-gold shadow-gold-bloom"
          initial={{ width: "0%" }}
          animate={{ width: `${(step / 5) * 100}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="w-full max-w-xl"
          >
            {step === 1 && (
              <div className="space-y-12">
                <div className="space-y-4 text-center">
                  <span className="micro-label text-gold/50 tracking-widest-xl">IDENTITY VERIFICATION</span>
                  <h2 className="text-display-md text-display italic">
                    Establish Your <br />
                    <span className="gold-gradient">Age Index</span>
                  </h2>
                </div>

                <div className="flex justify-center">
                  <div className="relative p-1 rounded-[3rem] bg-gradient-to-b from-white/10 to-transparent">
                    <div className="premium-glass p-12 rounded-super">
                      <WheelPicker
                        value={formData.age || 16}
                        onChange={(age) => setFormData({ ...formData, age })}
                        range={AGE_RANGE}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <OnboardingButton onClick={advance} label="ESTABLISH AGE" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-12">
                <div className="space-y-4 text-center">
                  <span className="micro-label text-gold/50">JURISDICTION MAPPING</span>
                  <h2 className="text-display-md text-display italic">Select Your <br /><span className="gold-gradient">Operational Zone</span></h2>
                </div>

                <div className="grid grid-cols-1 gap-3 max-h-[350px] overflow-y-auto no-scrollbar px-2 mask-fade-edges">
                  {STATES.map((st) => (
                    <button
                      key={st}
                      onClick={() => {
                        setFormData({ ...formData, state: st });
                        if (window.navigator.vibrate) window.navigator.vibrate(5);
                      }}
                      className={`p-5 premium-card text-left flex justify-between items-center group overflow-hidden relative ${
                        formData.state === st
                        ? 'bg-gold/10 border-gold/30 shadow-gold-bloom'
                        : 'hover:bg-white/5 border-white/5'
                      }`}
                    >
                      {formData.state === st && (
                        <motion.div layoutId="state-active" className="absolute inset-0 bg-gold/5 pointer-events-none" />
                      )}
                      <span className={`font-black uppercase tracking-widest text-xs transition-colors duration-500 ${formData.state === st ? 'text-gold' : 'text-white/40 group-hover:text-white/70'}`}>
                        {st}
                      </span>
                      <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${formData.state === st ? 'bg-gold scale-125 shadow-gold-bloom' : 'bg-white/10'}`} />
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-4">
                  <IconButton onClick={retreat} icon={ChevronLeft} />
                  <OnboardingButton onClick={advance} label="CONFIRM JURISDICTION" />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-12">
                <div className="space-y-4 text-center">
                  <span className="micro-label text-gold/50">CAPITAL INFLOW</span>
                  <h2 className="text-display-md text-display italic">Define Your <br /><span className="gold-gradient">Current Flow</span></h2>
                </div>

                <div className="space-y-4">
                  {[
                    { id: 'noIncomeYet', title: 'Zero Inflow', sub: 'INITIALIZING PHASE' },
                    { id: 'allowanceGifts', title: 'Support Network', sub: 'EXTERNAL CAPITAL' },
                    { id: 'partTimeJob', title: 'Active Hustle', sub: 'INTERMITTENT REVENUE' },
                    { id: 'fullTimeJob', title: 'Full Access', sub: 'SUSTAINED YIELD' }
                  ].map((sit) => (
                    <button
                      key={sit.id}
                      onClick={() => setFormData({ ...formData, moneySituation: sit.id as MoneySituation })}
                      className={`w-full p-6 premium-card text-left flex items-center space-x-6 relative group ${
                        formData.moneySituation === sit.id
                        ? 'bg-gold/10 border-gold/30 shadow-gold-bloom'
                        : 'hover:bg-white/5 border-white/5'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-700 ${
                        formData.moneySituation === sit.id ? 'bg-gold text-black shadow-gold-bloom' : 'bg-white/5 text-white/20'
                      }`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-current" />
                      </div>
                      <div>
                        <p className={`font-black uppercase tracking-widest text-sm ${formData.moneySituation === sit.id ? 'text-white' : 'text-white/40'}`}>{sit.title}</p>
                        <p className="micro-label !text-[10px] mt-1 opacity-50">{sit.sub}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-4">
                  <IconButton onClick={retreat} icon={ChevronLeft} />
                  <OnboardingButton onClick={advance} label="PROCESS DATA" />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-10">
                <div className="space-y-4 text-center">
                  <span className="micro-label text-gold/50">STRATEGIC OBJECTIVES</span>
                  <h2 className="text-display-md text-display italic">Target <br /><span className="gold-gradient">Milestones</span></h2>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {GOAL_CONFIG.map((goal) => {
                    const isSelected = formData.goals?.includes(goal.id);
                    const Icon = goal.icon;
                    return (
                      <button
                        key={goal.id}
                        onClick={() => {
                          const newGoals = isSelected
                            ? formData.goals?.filter(g => g !== goal.id)
                            : [...(formData.goals || []), goal.id];
                          setFormData({ ...formData, goals: newGoals });
                          if (window.navigator.vibrate) window.navigator.vibrate(3);
                        }}
                        className={`p-5 premium-card text-left flex flex-col justify-between h-36 relative group transition-all duration-500 ${
                          isSelected
                          ? 'bg-gold/15 border-gold/50 shadow-gold-bloom scale-[1.02] z-10'
                          : 'hover:bg-white/5 border-white/5 opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0'
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-500 ${isSelected ? 'bg-gold text-black rotate-[360deg]' : 'bg-white/5 text-white/40'}`}>
                          <Icon size={18} strokeWidth={isSelected ? 3 : 2} />
                        </div>
                        <div className="space-y-1">
                            <span className={`font-black uppercase tracking-tighter text-[10px] leading-tight block transition-colors ${isSelected ? 'text-white' : 'text-white/30'}`}>{goal.label}</span>
                            <span className={`font-display italic text-[9px] block opacity-40 ${isSelected ? 'text-gold' : 'text-white'}`}>{goal.id}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>

                <div className="flex items-center justify-between gap-4">
                  <IconButton onClick={retreat} icon={ChevronLeft} />
                  <OnboardingButton onClick={advance} label="FINALIZE STRATEGY" />
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-16 py-12 text-center">
                <div className="relative inline-block">
                   <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-16 rounded-full border border-dashed border-gold/10"
                   />
                   <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-10 rounded-full border border-gold/5"
                   />
                   <div className="w-32 h-32 rounded-full premium-glass flex items-center justify-center relative z-10 border border-gold/30 shadow-gold-bloom">
                     <Shield className="text-gold" size={48} strokeWidth={1} />
                   </div>
                </div>

                <div className="space-y-6">
                  <span className="micro-label text-gold tracking-widest-xl">SYSTEM READY</span>
                  <h2 className="text-display-md text-display italic gold-gradient">Authorize Access</h2>
                  <p className="text-white/40 text-xs font-lux max-w-xs mx-auto leading-relaxed uppercase tracking-widest">
                    Trajectory mapped. <br />
                    Discipline index synchronized. <br />
                    The future belongs to you.
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={finish}
                  className="w-full py-6 bg-gold text-black font-black uppercase tracking-[0.25em] text-xs rounded-2xl shadow-gold-bloom relative overflow-hidden"
                >
                  <motion.div
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
                  />
                  INITIALIZE SYSTEM
                </motion.button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* OS Meta info */}
      <div className="fixed bottom-10 left-10 opacity-20 hidden lg:block">
        <div className="flex flex-col space-y-1">
          <span className="micro-label !text-[8px]">TERMINAL: ECILY-SECURE-ACCESS</span>
          <span className="micro-label !text-[8px]">ENCRYPTION: AES-512-OS</span>
          <span className="micro-label !text-[8px]">Uptime: 99.9992%</span>
        </div>
      </div>
    </div>
  );
}

function OnboardingButton({ onClick, label }: { onClick: () => void, label: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="flex-1 py-6 premium-glass border border-white/10 rounded-2xl flex items-center justify-center space-x-3 group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="font-black uppercase tracking-widest text-[10px] text-white/80 group-hover:text-gold transition-colors">{label}</span>
      <ChevronRight size={14} className="text-gold group-hover:translate-x-1 transition-transform" />
    </motion.button>
  )
}

function IconButton({ onClick, icon: Icon }: { onClick: () => void, icon: any }) {
  return (
    <button
      onClick={onClick}
      className="w-20 h-[70px] premium-glass border border-white/10 rounded-2xl flex items-center justify-center text-white/30 hover:text-white/70 transition-colors"
    >
      <Icon size={20} />
    </button>
  )
}
