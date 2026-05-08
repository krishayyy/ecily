import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store';
import { type User, type FinancialGoal, type USState, type MoneySituation, type ExplanationStyle } from '../types';
import {
  ChevronRight,
  CheckCircle2,
  PiggyBank,
  TrendingUp,
  Scale,
  CreditCard,
  GraduationCap,
  Home,
  Car,
  Skull,
  MapPin,
  Briefcase,
  Zap
} from 'lucide-react';
import { WheelPicker } from './WheelPicker';

const GOAL_CONFIG: { id: FinancialGoal; label: string; icon: React.ElementType }[] = [
  { id: 'Build savings', label: 'Build Savings', icon: PiggyBank },
  { id: 'Start investing', label: 'Start Investing', icon: TrendingUp },
  { id: 'Master budgeting', label: 'Master Budgeting', icon: Scale },
  { id: 'Build credit', label: 'Build Credit', icon: CreditCard },
  { id: 'Pay for college', label: 'Pay for College', icon: GraduationCap },
  { id: 'Own a home', label: 'Own a Home', icon: Home },
  { id: 'Buy a car', label: 'Buy a Car', icon: Car },
  { id: 'Kill debt', label: 'Kill Debt', icon: Skull },
];

const STATES: USState[] = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
  'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
  'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

const SITUATIONS: { id: MoneySituation; label: string; sub: string }[] = [
  { id: 'noIncomeYet', label: 'No Income', sub: 'I am just starting out.' },
  { id: 'allowanceGifts', label: 'Allowance', sub: 'I get money from family/gifts.' },
  { id: 'partTimeJob', label: 'Part-time', sub: 'I work a few hours a week.' },
  { id: 'fullTimeJob', label: 'Full-time', sub: 'I have a steady paycheck.' },
];

const STYLES: { id: ExplanationStyle; label: string; sub: string }[] = [
  { id: 'Simple', label: 'Simple', sub: 'Keep it short and jargon-free.' },
  { id: 'Normal', label: 'Balanced', sub: 'Clear explanations with context.' },
  { id: 'Deep', label: 'Deep Dive', sub: 'Show me the technical details.' },
];

export function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const setUser = useAppStore((state) => state.setUser);

  const [formData, setFormData] = useState<Partial<User>>({
    name: '',
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
      email: 'alex@example.com',
      ...formData,
      isOnboardingComplete: true,
    } as User;
    setUser(finalUser);
  };

  return (
    <div className={`min-h-screen bg-void text-white transition-colors duration-1000 overflow-hidden relative flex flex-col`}>
      <div className="fixed inset-0 bg-midnight -z-10" />

      <motion.div
        animate={{
            opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="fixed inset-0 pointer-events-none -z-5"
        style={{
            background: `radial-gradient(circle at 50% 40%, rgba(197, 160, 89, 0.05) 0%, transparent 60%)`
        }}
      />

      <div className="flex-1 flex flex-col relative z-10 px-6">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 50 : -50, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: direction > 0 ? -50 : 50, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full py-12"
          >
            {step === 1 && (
              <div className="space-y-12 text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-20 h-20 bg-surface rounded-3xl mx-auto flex items-center justify-center border border-border/50 shadow-premium"
                >
                  <div className="w-8 h-8 bg-gold rounded-lg rotate-45 shadow-gold-glow" />
                </motion.div>

                <div className="space-y-4">
                  <h1 className="text-5xl font-black tracking-tighter uppercase italic gold-gradient leading-tight">Secret <br />Protocol</h1>
                  <p className="text-white/40 font-mono text-xs tracking-widest">INITIALIZING WEALTH ACQUISITION</p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={advance}
                  className="w-full h-16 bg-gold text-void rounded-2xl flex items-center justify-center space-x-4 font-black uppercase italic text-sm tracking-widest shadow-gold-glow transition-all"
                >
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5 brightness-0" alt="Google" />
                  <span>Authorize with Google</span>
                </motion.button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-10">
                <h2 className="text-4xl font-bold tracking-tight">What should we <br />call you?</h2>

                <div className="relative">
                  <input
                    autoFocus
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                    }}
                    placeholder="Enter your name"
                    className={`w-full bg-transparent border-none text-4xl font-bold focus:outline-none placeholder:opacity-20 text-white`}
                  />
                  {formData.name && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -bottom-8 left-0 text-sm font-medium opacity-50"
                    >
                        Nice to meet you, {formData.name}.
                    </motion.div>
                  )}
                </div>

                <div className="pt-12">
                   <CTAButton onClick={advance} disabled={!formData.name} label="Continue" />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-12 flex flex-col items-center">
                <div className="space-y-2 text-center w-full">
                  <h2 className="text-4xl font-bold tracking-tight">How old are you?</h2>
                  <p className="opacity-40 font-medium">We tailor the journey to your stage.</p>
                </div>

                <div className="py-8">
                  <WheelPicker
                    value={formData.age || 16}
                    onChange={(age) => setFormData({ ...formData, age })}
                    range={Array.from({ length: 16 }, (_, i) => i + 10)}
                  />
                </div>

                {formData.age! < 13 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-6 rounded-3xl bg-red-500/10 border border-red-500/20 text-red-500 text-center w-full"
                    >
                        <p className="font-bold">You need to be at least 13 to continue.</p>
                    </motion.div>
                ) : (
                    <CTAButton onClick={advance} label="That's me" />
                )}

                <button onClick={retreat} className="w-full text-center opacity-30 text-sm font-bold uppercase tracking-widest mt-4">Back</button>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-10">
                <h2 className="text-4xl font-bold tracking-tight">Which state <br />are you in?</h2>
                <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto no-scrollbar py-2 mask-fade-edges px-1">
                  {STATES.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setFormData({ ...formData, state: s });
                        advance();
                      }}
                      className={`p-6 rounded-2xl text-left flex items-center justify-between border transition-all ${
                        formData.state === s
                        ? 'bg-gold text-void border-gold shadow-gold-glow'
                        : 'bg-surface border-border hover:border-gold/30'
                      }`}
                    >
                      <span className="font-bold uppercase italic tracking-tight">{s}</span>
                      <MapPin size={18} className={formData.state === s ? 'text-void' : 'text-gold/30'} />
                    </button>
                  ))}
                </div>
                <button onClick={retreat} className="w-full text-center opacity-30 text-sm font-bold uppercase tracking-widest mt-4">Back</button>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-10">
                <h2 className="text-4xl font-bold tracking-tight uppercase italic gold-gradient">Current Status</h2>
                <div className="space-y-4">
                  {SITUATIONS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        setFormData({ ...formData, moneySituation: s.id });
                        advance();
                      }}
                      className={`p-6 rounded-2xl text-left w-full border transition-all ${
                        formData.moneySituation === s.id
                        ? 'bg-gold text-void border-gold shadow-gold-glow'
                        : 'bg-surface border-border hover:border-gold/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-black uppercase italic text-lg">{s.label}</span>
                        <Briefcase size={20} className={formData.moneySituation === s.id ? 'text-void' : 'text-gold/30'} />
                      </div>
                      <p className={`text-xs font-medium ${formData.moneySituation === s.id ? 'text-void/60' : 'text-white/40'}`}>{s.sub}</p>
                    </button>
                  ))}
                </div>
                <button onClick={retreat} className="w-full text-center opacity-30 text-sm font-bold uppercase tracking-widest mt-4">Back</button>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-8">
                <div className="space-y-2 text-center">
                  <h2 className="text-4xl font-bold tracking-tight uppercase italic gold-gradient">Objectives</h2>
                  <p className="opacity-40 font-mono text-[10px] tracking-widest">SELECT MISSIONS TO PRIORITIZE</p>
                </div>

                <div className="grid grid-cols-2 gap-4 h-[400px] overflow-y-auto no-scrollbar py-4 px-2 mask-fade-edges">
                  {GOAL_CONFIG.map((goal) => {
                    const isSelected = formData.goals?.includes(goal.id);
                    return (
                      <motion.button
                        key={goal.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          const newGoals = isSelected
                            ? formData.goals?.filter(g => g !== goal.id)
                            : [...(formData.goals || []), goal.id];
                          setFormData({ ...formData, goals: newGoals });
                        }}
                        className={`p-6 rounded-super text-left flex flex-col justify-between h-40 transition-all duration-500 relative group ${
                          isSelected
                          ? 'bg-gold text-void shadow-gold-glow scale-[1.02] z-10'
                          : 'bg-surface hover:bg-surface-bright border border-border'
                        }`}
                      >
                        <goal.icon size={24} strokeWidth={isSelected ? 3 : 1.5} className={isSelected ? 'text-void' : 'text-gold'} />
                        <div className="space-y-1">
                            <span className="font-black italic uppercase text-xs leading-tight block tracking-tight">{goal.label}</span>
                        </div>
                        {isSelected && (
                            <motion.div
                                layoutId="check"
                                className="absolute top-4 right-4"
                            >
                                <CheckCircle2 className="text-void" size={18} strokeWidth={3} />
                            </motion.div>
                        )}
                      </motion.button>
                    )
                  })}
                </div>

                <CTAButton onClick={advance} disabled={formData.goals?.length === 0} label="Continue" />
                <button onClick={retreat} className="w-full text-center opacity-30 text-[10px] font-black uppercase tracking-[0.2em] mt-4">Previous Step</button>
              </div>
            )}

            {step === 7 && (
              <div className="space-y-10">
                <div className="text-center space-y-2">
                    <h2 className="text-4xl font-bold tracking-tight uppercase italic gold-gradient">Intelligence Style</h2>
                    <p className="opacity-40 font-mono text-[10px] tracking-widest">HOW SHOULD CILY COMMUNICATE?</p>
                </div>
                <div className="space-y-4">
                  {STYLES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        setFormData({ ...formData, explanationStyle: s.id });
                      }}
                      className={`p-6 rounded-2xl text-left w-full border transition-all ${
                        formData.explanationStyle === s.id
                        ? 'bg-gold text-void border-gold shadow-gold-glow'
                        : 'bg-surface border-border hover:border-gold/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-black uppercase italic text-lg">{s.label}</span>
                        <Zap size={20} className={formData.explanationStyle === s.id ? 'text-void' : 'text-gold/30'} />
                      </div>
                      <p className={`text-xs font-medium ${formData.explanationStyle === s.id ? 'text-void/60' : 'text-white/40'}`}>{s.sub}</p>
                    </button>
                  ))}
                </div>

                <div className="pt-8">
                    <CTAButton onClick={finish} label="Synchronize OS" />
                </div>
                <button onClick={retreat} className="w-full text-center opacity-30 text-sm font-bold uppercase tracking-widest mt-4">Back</button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function CTAButton({ onClick, disabled, label }: { onClick: () => void; disabled?: boolean; label: string }) {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02, backgroundColor: "rgba(197, 160, 89, 1)" } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`w-full h-18 rounded-2xl flex items-center justify-center space-x-3 font-black uppercase italic text-sm tracking-widest transition-all ${
        disabled ? 'bg-white/5 text-white/10' : 'bg-gold text-void shadow-gold-glow'
      }`}
    >
      <span>{label}</span>
      <ChevronRight size={18} strokeWidth={3} />
    </motion.button>
  );
}
