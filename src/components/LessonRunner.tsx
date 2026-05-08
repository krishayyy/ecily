import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store';
import { type World, type Lesson } from '../types';
import { X, ChevronRight, Trophy, Star, Sparkles, AlertCircle, CheckCircle2, ShoppingCart, Home, Car, Utensils } from 'lucide-react';

interface LessonRunnerProps {
  world: World;
  lesson: Lesson;
  onClose: () => void;
}

export const LessonRunner: React.FC<LessonRunnerProps> = ({ world, lesson, onClose }) => {
  const [phase, setPhase] = useState<'learning' | 'activity' | 'quiz' | 'completed'>('learning');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const completeLesson = useAppStore(state => state.completeLesson);

  const handleAnswer = (idx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    const correct = idx === lesson.quiz[currentQuestion].correctIndex;
    setIsCorrect(correct);
    if (window.navigator.vibrate) window.navigator.vibrate(correct ? 10 : [10, 50, 10]);
  };

  const next = () => {
    if (phase === 'learning') {
      if (lesson.id === 'bc_02' || lesson.id === 'ws_01' || lesson.id === 'bc_01') {
          setPhase('activity');
      } else if (lesson.quiz.length > 0) {
          setPhase('quiz');
      } else {
          finish();
      }
    } else if (phase === 'activity') {
        if (lesson.quiz.length > 0) setPhase('quiz');
        else finish();
    } else if (phase === 'quiz') {
      if (currentQuestion < lesson.quiz.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        finish();
      }
    }
  };

  const finish = () => {
    completeLesson(lesson.id, lesson.xpReward, lesson.coinReward);
    setPhase('completed');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-void flex flex-col text-white font-display overflow-hidden"
    >
      {/* Background FX */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute inset-0 bg-[radial-gradient(circle at 50% -20%, rgba(197,160,89,0.1), transparent 70%)]" />
         <motion.div
            animate={{ opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100%_4px]"
         />
      </div>

      {/* Immersive HUD */}
      <div className="px-8 pt-20 pb-8 flex justify-between items-center relative z-10">
        <div className="flex items-center space-x-6">
          <div className="w-16 h-16 rounded-super premium-glass flex items-center justify-center text-3xl shadow-gold-bloom/10 relative overflow-hidden border border-border">
            <div className="absolute inset-0 opacity-5 bg-gold" />
            {typeof world.icon === 'string' ? (
              <span className="relative z-10">{world.icon}</span>
            ) : (
              <world.icon size={32} className="relative z-10 text-gold" />
            )}
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-3">
              <span className="micro-label text-gold/60">{world.name}</span>
              <span className="w-1 h-1 rounded-full bg-white/10" />
              <span className="micro-label">Sector 0{lesson.id.split('_')[1]}</span>
            </div>
            <h2 className="text-2xl font-black text-display italic tracking-tight uppercase">{lesson.title}</h2>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-14 h-14 rounded-full premium-glass border-white/10 flex items-center justify-center hover:bg-white/10 transition-all hover:rotate-90 duration-700 group"
        >
          <X size={24} className="text-white/40 group-hover:text-white transition-colors" />
        </button>
      </div>

      {/* Main Content Stage */}
      <div className="flex-1 overflow-hidden relative px-8 z-10">
        <AnimatePresence mode="wait">
          {phase === 'learning' && (
            <motion.div
              key="learning"
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="h-full flex flex-col justify-center max-w-2xl mx-auto"
            >
              <div className="premium-glass p-12 rounded-super border-white/5 relative overflow-hidden shadow-gold-bloom/5">
                <div className="absolute top-0 right-0 w-80 h-80 blur-[150px] opacity-10 pointer-events-none bg-gold" />
                <Sparkles className="mb-8 opacity-40 text-gold" size={40} />
                <p className="text-3xl md:text-4xl font-black italic uppercase leading-[1.1] tracking-tighter">
                  {lesson.content}
                </p>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-4">
                 <div className="premium-glass p-8 rounded-super border-white/5 flex items-center space-x-5">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold border border-gold/20">
                      <Trophy size={24} />
                    </div>
                    <div>
                      <p className="micro-label !text-[10px] mb-1">Yield</p>
                      <p className="text-lg font-black italic">+{lesson.xpReward} XP</p>
                    </div>
                 </div>
                 <div className="premium-glass p-8 rounded-super border-white/5 flex items-center space-x-5">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/40 border border-white/10">
                      <Star size={24} fill="currentColor" />
                    </div>
                    <div>
                      <p className="micro-label !text-[10px] mb-1">Credits</p>
                      <p className="text-lg font-black italic">+{lesson.coinReward} EC</p>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}

          {phase === 'activity' && (
              <motion.div
                key="activity"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                className="h-full"
              >
                  {lesson.id === 'bc_02' && <WantsVsNeedsActivity onComplete={next} />}
                  {lesson.id === 'ws_01' && <StockOwnershipActivity onComplete={next} />}
                  {lesson.id === 'bc_01' && <CompoundInterestActivity onComplete={next} />}
              </motion.div>
          )}

          {phase === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 60, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -60, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="h-full flex flex-col justify-center space-y-12 max-w-3xl mx-auto"
            >
              <div className="space-y-4">
                <span className="micro-label opacity-60">Evaluation Protocol // Question 0{currentQuestion + 1}</span>
                <h3 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-tight">
                    {lesson.quiz[currentQuestion].question}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {lesson.quiz[currentQuestion].options.map((opt, i) => {
                  const isSelected = selectedAnswer === i;
                  const isAnswerCorrect = i === lesson.quiz[currentQuestion].correctIndex;

                  let stateStyle = "bg-white/[0.03] border-white/5 text-white/40 hover:bg-white/[0.06] hover:border-white/10";
                  if (isSelected) {
                    stateStyle = isAnswerCorrect
                      ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_60px_rgba(16,185,129,0.2)] scale-[1.03] z-10"
                      : "bg-rose-500/20 border-rose-500 text-rose-400 shadow-[0_0_60px_rgba(225,29,72,0.2)] scale-[0.97]";
                  } else if (selectedAnswer !== null && isAnswerCorrect) {
                    stateStyle = "bg-emerald-500/10 border-emerald-500/40 text-emerald-400/60";
                  }

                  return (
                    <motion.button
                      key={i}
                      whileHover={selectedAnswer === null ? { x: 15 } : {}}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(i)}
                      className={`w-full p-8 rounded-super border text-left font-black italic uppercase text-xl transition-all duration-700 relative overflow-hidden group ${stateStyle}`}
                    >
                      <div className="flex items-center justify-between relative z-10">
                        <span>{opt}</span>
                        <div className="flex items-center space-x-4">
                            {isSelected && (isAnswerCorrect ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />)}
                            <span className="micro-label opacity-0 group-hover:opacity-100 transition-opacity">Select Option</span>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <AnimatePresence>
                {selectedAnswer !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-10 rounded-[3rem] border ${isCorrect ? 'bg-emerald-500/[0.02] border-emerald-500/20' : 'bg-orange-500/[0.02] border-orange-500/20'} premium-glass`}
                  >
                    <div className="flex items-start space-x-6">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${isCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-orange-500/20 text-orange-400'}`}>
                            {isCorrect ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                        </div>
                        <div className="space-y-2">
                            <p className={`micro-label !tracking-widest ${isCorrect ? 'text-emerald-500' : 'text-orange-500'}`}>
                                {isCorrect ? 'SYNCHRONIZATION: OPTIMAL' : 'SYSTEM GAP: ADVISORY'}
                            </p>
                            <p className="text-xl font-lux text-white/80 leading-relaxed uppercase">
                                {lesson.quiz[currentQuestion].explanation}
                            </p>
                        </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {phase === 'completed' && (
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="h-full flex flex-col items-center justify-center text-center space-y-16"
            >
              <div className="relative">
                {/* Visual bloom */}
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 bg-gold blur-[80px] rounded-full"
                />

                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-56 h-56 rounded-full bg-gradient-to-br from-gold-bright to-gold-dim flex items-center justify-center relative z-10 border-4 border-white/20 shadow-gold-bloom"
                >
                  <Trophy size={110} className="text-void drop-shadow-2xl" strokeWidth={2.5} />
                </motion.div>
              </div>

              <div className="space-y-6">
                <h2 className="text-display text-6xl italic gold-gradient">Protocol <br />Success</h2>
                <p className="micro-label !text-sm !tracking-[0.4em]">Strategic Objectives Secured</p>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
                <div className="premium-glass p-8 rounded-super border-gold/10 shadow-gold-bloom/5">
                  <p className="micro-label mb-3">Power Inflow</p>
                  <p className="text-5xl font-black text-gold italic">+{lesson.xpReward}</p>
                  <span className="micro-label !text-[8px] opacity-20 uppercase tracking-widest">Units secured</span>
                </div>
                <div className="premium-glass p-8 rounded-super border-white/5">
                  <p className="micro-label mb-3">Capital Gain</p>
                  <p className="text-5xl font-black text-white/80 italic">+{lesson.coinReward}</p>
                   <span className="micro-label !text-[8px] opacity-20 uppercase tracking-widest">Credits earned</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Bar */}
      <div className="p-12 relative z-10">
        {phase === 'completed' ? (
          <motion.button
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="w-full h-24 bg-white text-void font-black rounded-super shadow-gold-bloom uppercase italic tracking-widest text-2xl transition-all"
          >
            Terminal Reset
          </motion.button>
        ) : (
          <motion.button
            disabled={(phase === 'quiz' && selectedAnswer === null)}
            whileHover={!(phase === 'quiz' && selectedAnswer === null) ? { scale: 1.02, y: -5 } : {}}
            whileTap={{ scale: 0.98 }}
            onClick={next}
            className={`w-full h-24 rounded-super font-black uppercase italic tracking-widest text-2xl flex items-center justify-center space-x-4 transition-all duration-500 ${
              (phase === 'quiz' && selectedAnswer === null)
              ? 'bg-white/5 text-white/10 border border-white/5 opacity-50'
              : 'bg-white text-void shadow-2xl'
            }`}
          >
            <span>{phase === 'learning' ? 'Initiate Activity' : phase === 'activity' ? 'Analyze Results' : 'Confirm Entry'}</span>
            <ChevronRight size={28} strokeWidth={4} />
          </motion.button>
        )}
      </div>

      {/* HUD Background Progress Line */}
      <div className="fixed top-0 left-0 w-full h-2 z-50 opacity-50">
        <motion.div
          className="h-full bg-gold shadow-gold-bloom"
          initial={{ width: "0%" }}
          animate={{
            width: phase === 'learning' ? '25%' : phase === 'activity' ? '50%' : phase === 'quiz' ? '75%' : '100%'
          }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  );
};

// --- Sub-Components: Interactive Activities ---

function WantsVsNeedsActivity({ onComplete }: { onComplete: () => void }) {
    const items = [
        { id: '1', name: 'Concert Tickets', type: 'want', icon: Sparkles },
        { id: '2', name: 'Emergency Groceries', type: 'need', icon: Utensils },
        { id: '3', name: 'Monthly Rent', type: 'need', icon: Home },
        { id: '4', name: 'Designer Bag', type: 'want', icon: ShoppingCart },
        { id: '5', name: 'Transportation', type: 'need', icon: Car },
    ];

    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const current = items[index];

    const handleChoice = (type: 'want' | 'need') => {
        if (type === current.type) {
            setScore(score + 1);
            if (window.navigator.vibrate) window.navigator.vibrate(10);
        } else {
            if (window.navigator.vibrate) window.navigator.vibrate([20, 50, 20]);
        }

        if (index < items.length - 1) setIndex(index + 1);
        else onComplete();
    };

    return (
        <div className="h-full flex flex-col items-center justify-center space-y-12">
            <div className="text-center space-y-4">
                <span className="micro-label text-emerald-500">Classification Training</span>
                <h3 className="text-3xl font-black italic uppercase">Sort the resource</h3>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={current.id}
                    initial={{ scale: 0.8, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 1.1, opacity: 0, x: 100 }}
                    className="w-72 h-96 premium-glass rounded-super border-white/10 flex flex-col items-center justify-center p-8 text-center space-y-8 shadow-2xl"
                >
                    <div className="w-24 h-24 rounded-[2rem] bg-white/5 flex items-center justify-center text-white/40">
                        <current.icon size={48} strokeWidth={1} />
                    </div>
                    <p className="text-2xl font-black italic uppercase tracking-tighter">{current.name}</p>
                </motion.div>
            </AnimatePresence>

            <div className="flex space-x-6 w-full max-w-md">
                <button
                    onClick={() => handleChoice('need')}
                    className="flex-1 h-20 rounded-[2rem] bg-emerald-500 text-void font-black italic uppercase text-lg shadow-emerald-500/20 shadow-xl active:scale-95 transition-transform"
                >
                    Core Need
                </button>
                <button
                    onClick={() => handleChoice('want')}
                    className="flex-1 h-20 rounded-[2rem] premium-glass border-white/10 text-white font-black italic uppercase text-lg hover:bg-white/5 active:scale-95 transition-all"
                >
                    Want
                </button>
            </div>

            <div className="flex space-x-2">
                {items.map((_, i) => (
                    <div key={i} className={`w-12 h-1 rounded-full transition-colors ${i === index ? 'bg-white' : i < index ? 'bg-white/40' : 'bg-white/10'}`} />
                ))}
            </div>
        </div>
    )
}

function StockOwnershipActivity({ onComplete }: { onComplete: () => void }) {
    return (
        <div className="h-full flex flex-col items-center justify-center p-8 space-y-12">
            <div className="text-center space-y-4">
                <span className="micro-label text-gold">Equity Simulator</span>
                <h3 className="text-3xl font-black italic uppercase">Own a piece of the world</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
                {[
                    { label: 'Market Cap', val: '$2.8T', color: 'text-gold' },
                    { label: 'Sector', val: 'TECH', color: 'text-white/60' },
                    { label: 'Risk', val: 'MED', color: 'text-white/40' },
                    { label: 'Status', val: 'ACTIVE', color: 'text-gold/60' },
                ].map(stat => (
                    <div key={stat.label} className="premium-glass p-6 rounded-2xl border-white/5 space-y-1">
                        <p className="micro-label !text-[8px] opacity-20 uppercase tracking-widest">{stat.label}</p>
                        <p className={`text-xl font-black italic uppercase ${stat.color}`}>{stat.val}</p>
                    </div>
                ))}
            </div>

            <motion.div
                whileHover={{ scale: 1.01 }}
                className="w-full max-w-lg p-10 premium-glass rounded-super border-white/10 relative overflow-hidden"
            >
                <div className="relative z-10 flex items-center justify-between">
                    <div className="space-y-2">
                        <p className="text-4xl font-black italic uppercase tracking-tighter">APPLE INC.</p>
                        <p className="micro-label text-gold/60 uppercase tracking-[0.2em]">Position: 0.0012%</p>
                    </div>
                    <div className="text-right">
                        <p className="font-mono text-2xl font-bold">$182.40</p>
                        <p className="text-gold font-bold">+1.2%</p>
                    </div>
                </div>
                <div className="absolute inset-0 bg-gold/5" />
            </motion.div>

            <button onClick={onComplete} className="w-full max-w-md h-20 rounded-2xl bg-gold text-void font-black italic uppercase text-sm tracking-widest shadow-gold-glow">
                Complete Analysis
            </button>
        </div>
    )
}

function CompoundInterestActivity({ onComplete }: { onComplete: () => void }) {
    const [rate, setRate] = useState(7);
    const [years, setYears] = useState(10);
    const principal = 1000;
    const finalValue = Math.floor(principal * Math.pow(1 + rate / 100, years));

    return (
        <div className="h-full flex flex-col items-center justify-center p-8 space-y-12">
            <div className="text-center space-y-4">
                <span className="micro-label text-gold">Exponential Growth Engine</span>
                <h3 className="text-3xl font-black italic uppercase">Project Your Wealth</h3>
            </div>

            <div className="w-full max-w-lg premium-glass p-12 rounded-[3rem] border-gold/20 text-center space-y-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.05),transparent_70%)]" />
                <div className="relative z-10">
                    <p className="micro-label opacity-40 mb-2">Projected Maturity</p>
                    <motion.p
                        key={finalValue}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-7xl font-black italic gold-gradient tracking-tight"
                    >
                        ${finalValue.toLocaleString()}
                    </motion.p>
                </div>
            </div>

            <div className="w-full max-w-lg space-y-8">
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span className="micro-label">Annual Yield (%)</span>
                        <span className="font-mono text-gold font-bold">{rate}%</span>
                    </div>
                    <input
                        type="range" min="1" max="20" value={rate}
                        onChange={(e) => setRate(parseInt(e.target.value))}
                        className="w-full h-1 bg-white/10 rounded-full appearance-none accent-gold cursor-pointer"
                    />
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between">
                        <span className="micro-label">Duration (Years)</span>
                        <span className="font-mono text-gold font-bold">{years}Y</span>
                    </div>
                    <input
                        type="range" min="1" max="40" value={years}
                        onChange={(e) => setYears(parseInt(e.target.value))}
                        className="w-full h-1 bg-white/10 rounded-full appearance-none accent-gold cursor-pointer"
                    />
                </div>
            </div>

            <button onClick={onComplete} className="w-full max-w-md h-20 rounded-[2rem] bg-gold text-void font-black italic uppercase text-lg shadow-gold-bloom shadow-xl">
                Lock in Trajectory
            </button>
        </div>
    )
}
