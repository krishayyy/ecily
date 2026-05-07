import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store';
import { type World, type Lesson } from '../types';
import { X, ChevronRight, Trophy, Star, Sparkles } from 'lucide-react';

interface LessonRunnerProps {
  world: World;
  lesson: Lesson;
  onClose: () => void;
}

export const LessonRunner: React.FC<LessonRunnerProps> = ({ world, lesson, onClose }) => {
  const [phase, setPhase] = useState<'learning' | 'quiz' | 'completed'>('learning');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const completeLesson = useAppStore(state => state.completeLesson);

  const handleAnswer = (idx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    const correct = idx === lesson.quiz[currentQuestion].correctIndex;
    setIsCorrect(correct);
  };

  const next = () => {
    if (phase === 'learning') {
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
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] bg-[#030303]/95 backdrop-blur-2xl flex flex-col text-white"
    >
      {/* Immersive HUD */}
      <div className="px-8 pt-16 pb-6 flex justify-between items-center relative">
        <div className="flex items-center space-x-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-glow-gold relative overflow-hidden group"
            style={{ backgroundColor: `${world.color}20` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            <span className="relative z-10">{world.icon}</span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">{world.name}</span>
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gold">Mission 0{lesson.id.split('_')[1]}</span>
            </div>
            <h2 className="text-xl font-black uppercase italic tracking-tight">{lesson.title}</h2>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-12 h-12 rounded-full glass border-white/10 flex items-center justify-center hover:bg-white/10 transition-all hover:rotate-90 duration-500"
        >
          <X size={20} />
        </button>
      </div>

      {/* Progress Line */}
      <div className="px-8 mb-8">
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-gold to-gold-deep shadow-glow-gold"
            initial={{ width: "0%" }}
            animate={{
              width: phase === 'learning' ? '33%' : phase === 'quiz' ? '66%' : '100%'
            }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      {/* Main Content Stage */}
      <div className="flex-1 overflow-hidden relative px-8">
        <AnimatePresence mode="wait">
          {phase === 'learning' && (
            <motion.div
              key="learning"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 1.05, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="h-full flex flex-col justify-center"
            >
              <div className="glass p-10 rounded-[48px] border-white/5 relative overflow-hidden shadow-premium">
                <div className="absolute top-0 right-0 w-64 h-64 blur-[120px] opacity-20 pointer-events-none" style={{ backgroundColor: world.color }} />
                <Sparkles className="text-gold mb-6 opacity-50" size={32} />
                <p className="text-3xl font-bold leading-tight text-white/90 italic uppercase tracking-tight">
                  {lesson.content}
                </p>
              </div>

              <div className="mt-12 flex space-x-6">
                 <div className="flex-1 glass p-6 rounded-3xl border-white/5 flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold shadow-glow-gold">
                      <Trophy size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-30">Goal Reward</p>
                      <p className="text-lg font-black text-white italic">+{lesson.xpReward} XP</p>
                    </div>
                 </div>
                 <div className="flex-1 glass p-6 rounded-3xl border-white/5 flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-success/10 flex items-center justify-center text-success shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                      <Star size={24} fill="currentColor" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-30">Credits</p>
                      <p className="text-lg font-black text-white italic">+{lesson.coinReward} EC</p>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}

          {phase === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100, filter: "blur(20px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="h-full flex flex-col justify-center space-y-10"
            >
              <h3 className="text-4xl font-black italic uppercase tracking-tighter leading-none">
                {lesson.quiz[currentQuestion].question}
              </h3>

              <div className="grid grid-cols-1 gap-4">
                {lesson.quiz[currentQuestion].options.map((opt, i) => {
                  const isSelected = selectedAnswer === i;
                  const isAnswerCorrect = i === lesson.quiz[currentQuestion].correctIndex;

                  let style = "bg-white/5 border-white/5 text-white/40 hover:bg-white/10 hover:border-white/10";
                  if (isSelected) {
                    style = isAnswerCorrect
                      ? "bg-success/20 border-success text-success shadow-[0_0_40px_rgba(34,197,94,0.3)] scale-[1.02]"
                      : "bg-error/20 border-error text-error shadow-[0_0_40px_rgba(239,68,68,0.3)] scale-[0.98]";
                  } else if (selectedAnswer !== null && isAnswerCorrect) {
                    style = "bg-success/10 border-success/50 text-success opacity-80";
                  }

                  return (
                    <motion.button
                      key={i}
                      whileHover={selectedAnswer === null ? { x: 10 } : {}}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(i)}
                      className={`w-full p-8 rounded-3xl border text-left font-black italic uppercase text-lg transition-all duration-500 ${style}`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{opt}</span>
                        {isSelected && (isAnswerCorrect ? <Trophy size={20} /> : <X size={20} />)}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <AnimatePresence>
                {selectedAnswer !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-8 rounded-[32px] border ${isCorrect ? 'bg-success/5 border-success/20' : 'bg-warning/5 border-warning/20'} shadow-premium`}
                  >
                    <p className={`text-xs font-black uppercase tracking-[0.2em] mb-2 ${isCorrect ? 'text-success' : 'text-warning'}`}>
                      {isCorrect ? 'Analysis: Positive' : 'Analysis: Gap Detected'}
                    </p>
                    <p className="text-lg font-medium opacity-80 leading-snug">
                      {lesson.quiz[currentQuestion].explanation}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {phase === 'completed' && (
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="h-full flex flex-col items-center justify-center text-center space-y-12"
            >
              <div className="relative">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                    boxShadow: [
                      "0 0 50px rgba(245,200,66,0.3)",
                      "0 0 100px rgba(245,200,66,0.6)",
                      "0 0 50px rgba(245,200,66,0.3)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-48 h-48 rounded-full bg-gradient-to-br from-gold-glow to-gold-deep flex items-center justify-center relative z-10"
                >
                  <Trophy size={90} className="text-void drop-shadow-2xl" strokeWidth={2.5} />
                </motion.div>

                {/* Energetic Particles */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, x: 0, y: 0 }}
                    animate={{
                      scale: [0, 1, 0],
                      x: Math.cos(i * 30 * (Math.PI / 180)) * 150,
                      y: Math.sin(i * 30 * (Math.PI / 180)) * 150,
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                    className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-gold shadow-glow-gold"
                  />
                ))}
              </div>

              <div className="space-y-4">
                <h2 className="text-6xl font-black uppercase italic tracking-tighter text-gradient-gold">Mission Success</h2>
                <p className="text-white/40 font-bold uppercase tracking-[0.3em] text-sm">Strategic Objectives Achieved</p>
              </div>

              <div className="grid grid-cols-2 gap-6 w-full max-w-md">
                <div className="glass p-8 rounded-[32px] border-white/10 shadow-premium">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-2">Power Level</p>
                  <p className="text-4xl font-black text-gold italic">+{lesson.xpReward} XP</p>
                </div>
                <div className="glass p-8 rounded-[32px] border-white/10 shadow-premium">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-2">Capital Gain</p>
                  <p className="text-4xl font-black text-gold italic">+{lesson.coinReward} EC</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Cyber-Premium Action Bar */}
      <div className="p-8 pb-12">
        {phase === 'completed' ? (
          <motion.button
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="w-full h-20 bg-white text-void font-black rounded-3xl shadow-premium uppercase italic tracking-tighter text-xl transition-all"
          >
            Return to Command Center
          </motion.button>
        ) : (
          <motion.button
            disabled={phase === 'quiz' && selectedAnswer === null}
            whileHover={!(phase === 'quiz' && selectedAnswer === null) ? { scale: 1.02, y: -5 } : {}}
            whileTap={{ scale: 0.98 }}
            onClick={next}
            className={`w-full h-20 rounded-3xl font-black uppercase italic tracking-tighter text-xl flex items-center justify-center space-x-3 transition-all ${
              (phase === 'quiz' && selectedAnswer === null)
              ? 'bg-white/5 text-white/10 border border-white/5'
              : 'bg-gold text-void shadow-glow-gold shadow-2xl'
            }`}
          >
            <span>{phase === 'learning' ? 'Begin Evaluation' : 'Confirm & Proceed'}</span>
            <ChevronRight size={24} strokeWidth={3} />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};
