import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store';
import { WheelPicker } from './WheelPicker';
import { type User, type USState, type MoneySituation, type FinancialGoal } from '../types';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const STATES: USState[] = ['California', 'New York', 'Texas', 'Florida', 'Illinois', 'Washington', 'Massachusetts', 'Georgia']; // Simplified for now

export const OnboardingFlow: React.FC = () => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const setUser = useAppStore((state) => state.setUser);

  const [formData, setFormData] = useState<Partial<User>>({
    name: 'Student',
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
      email: 'student@example.com',
      ...formData,
      isOnboardingComplete: true,
    } as User;
    setUser(finalUser);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <div className="min-h-screen bg-dark-base flex flex-col relative overflow-hidden">
      {/* Background Mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-gold/20 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-xpBlue/20 blur-[120px]"
        />
      </div>

      {/* Header Progress */}
      <div className="relative z-10 px-8 pt-16 flex justify-between items-center">
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`h-1 rounded-full transition-all duration-500 ${
                s <= step ? 'w-8 bg-gold shadow-[0_0_10px_#F5C842]' : 'w-4 bg-white/10'
              }`}
            />
          ))}
        </div>
        {step > 1 && (
          <button
            onClick={retreat}
            className="text-white/40 hover:text-white transition-colors flex items-center space-x-1"
          >
            <ChevronLeft size={16} />
            <span className="text-sm font-medium">Back</span>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 relative mt-12 px-8">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.3 }
            }}
            className="absolute inset-x-8"
          >
            {step === 1 && (
              <div className="space-y-12">
                <div className="space-y-4">
                  <h2 className="text-4xl font-black tracking-tight leading-tight">
                    How old <br /> are you?
                  </h2>
                  <p className="text-white/40 text-lg">We tailor everything to your life stage.</p>
                </div>

                <div className="flex justify-center py-8">
                  <div className="glass p-8 rounded-xl relative">
                    <WheelPicker
                      value={formData.age || 16}
                      onChange={(age) => setFormData({ ...formData, age })}
                      range={Array.from({ length: 16 }, (_, i) => i + 10)}
                      accent="#F5C842"
                    />
                  </div>
                </div>

                <button
                  onClick={advance}
                  className="w-full h-16 bg-gold text-void font-black rounded-2xl flex items-center justify-center space-x-2 shadow-[0_10px_30px_rgba(245,200,66,0.3)] group"
                >
                  <span>Continue</span>
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-12">
                <div className="space-y-4">
                  <h2 className="text-4xl font-black tracking-tight">Where do <br /> you live?</h2>
                  <p className="text-white/40 text-lg">Finance laws vary by state.</p>
                </div>

                <div className="grid grid-cols-1 gap-3 max-h-[350px] overflow-y-auto no-scrollbar pr-2">
                  {STATES.map((st) => (
                    <button
                      key={st}
                      onClick={() => setFormData({ ...formData, state: st })}
                      className={`p-5 rounded-2xl border transition-all duration-300 text-left flex justify-between items-center ${
                        formData.state === st
                        ? 'bg-gold/10 border-gold text-gold shadow-[0_0_20px_#F5C84220]'
                        : 'bg-white/5 border-white/5 text-white/60'
                      }`}
                    >
                      <span className="font-bold">{st}</span>
                      {formData.state === st && <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />}
                    </button>
                  ))}
                </div>

                <button
                  onClick={advance}
                  className="w-full h-16 bg-gold text-void font-black rounded-2xl flex items-center justify-center space-x-2 shadow-[0_10px_30px_rgba(245,200,66,0.3)]"
                >
                  <span>Continue</span>
                  <ChevronRight />
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-12">
                <div className="space-y-4">
                  <h2 className="text-4xl font-black tracking-tight leading-tight">What's your <br /> income?</h2>
                  <p className="text-white/40 text-lg">Your path is built around your reality.</p>
                </div>

                <div className="space-y-3">
                  {[
                    { id: 'noIncomeYet', title: 'No income yet', sub: 'Just starting out' },
                    { id: 'allowanceGifts', title: 'Allowance / Gifts', sub: 'Regular family money' },
                    { id: 'partTimeJob', title: 'Part-time job', sub: 'Working few hours' },
                    { id: 'fullTimeJob', title: 'Full-time job', sub: 'Steady earned income' }
                  ].map((sit) => (
                    <button
                      key={sit.id}
                      onClick={() => setFormData({ ...formData, moneySituation: sit.id as MoneySituation })}
                      className={`w-full p-5 rounded-2xl border transition-all duration-300 text-left flex items-center space-x-4 ${
                        formData.moneySituation === sit.id
                        ? 'bg-xpBlue/10 border-xpBlue text-white shadow-[0_0_20px_#6366F120]'
                        : 'bg-white/5 border-white/5 text-white/60'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        formData.moneySituation === sit.id ? 'bg-xpBlue text-white' : 'bg-white/10'
                      }`}>
                        <div className="w-2 h-2 rounded-full bg-current" />
                      </div>
                      <div>
                        <p className="font-bold">{sit.title}</p>
                        <p className="text-xs opacity-50">{sit.sub}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={advance}
                  className="w-full h-16 bg-xpBlue text-white font-black rounded-2xl flex items-center justify-center space-x-2"
                >
                  <span>Continue</span>
                  <ChevronRight />
                </button>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-12">
                <div className="space-y-4">
                  <h2 className="text-4xl font-black tracking-tight leading-tight">Pick your <br /> goals</h2>
                  <p className="text-white/40 text-lg">Select what matters to you.</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {(['Build savings', 'Start investing', 'Master budgeting', 'Build credit', 'Pay for college', 'Buy a car'] as FinancialGoal[]).map((goal) => {
                    const isSelected = formData.goals?.includes(goal);
                    return (
                      <button
                        key={goal}
                        onClick={() => {
                          const newGoals = isSelected
                            ? formData.goals?.filter(g => g !== goal)
                            : [...(formData.goals || []), goal];
                          setFormData({ ...formData, goals: newGoals });
                        }}
                        className={`p-4 rounded-2xl border transition-all duration-300 text-left flex flex-col justify-between h-32 ${
                          isSelected
                          ? 'bg-gold/10 border-gold text-gold'
                          : 'bg-white/5 border-white/5 text-white/60'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isSelected ? 'bg-gold text-void' : 'bg-white/10'}`}>
                          {isSelected ? '✓' : ''}
                        </div>
                        <span className="font-bold text-sm">{goal}</span>
                      </button>
                    )
                  })}
                </div>

                <button
                  onClick={advance}
                  className="w-full h-16 bg-gold text-void font-black rounded-2xl flex items-center justify-center space-x-2"
                >
                  <span>Continue</span>
                  <ChevronRight />
                </button>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-12">
                <div className="space-y-8 text-center">
                  <div className="inline-block relative">
                     <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="absolute -inset-4 rounded-full border border-dashed border-gold/30"
                     />
                     <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold to-gold-deep flex items-center justify-center shadow-xl relative z-10">
                       <span className="text-4xl">💰</span>
                     </div>
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-4xl font-black tracking-tight">Ready to build?</h2>
                    <p className="text-white/40 text-lg max-w-xs mx-auto">Your personalized journey is ready. Let's start making some real money moves.</p>
                  </div>
                </div>

                <button
                  onClick={finish}
                  className="w-full h-16 bg-gold text-void font-black rounded-2xl flex items-center justify-center space-x-2 shadow-[0_10px_40px_rgba(245,200,66,0.4)]"
                >
                  <span>Enter Ecily</span>
                  <ChevronRight />
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
