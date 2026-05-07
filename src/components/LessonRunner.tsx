import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store';
import { type World, type Lesson } from '../types';
import { X, ChevronRight, Trophy, Star } from 'lucide-react';

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
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 z-50 bg-void flex flex-col"
    >
      {/* Header */}
      <div className="px-6 pt-14 pb-4 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg" style={{ backgroundColor: `${world.color}20`, color: world.color }}>
            {world.icon}
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-40">{world.name}</p>
            <h2 className="text-sm font-bold">{lesson.title}</h2>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
          <X size={20} className="text-white/40" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {phase === 'learning' && (
            <motion.div
              key="learning"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="glass p-8 rounded-[32px] border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 blur-3xl opacity-20" style={{ backgroundColor: world.color }} />
                <p className="text-xl font-medium leading-relaxed text-white/90">
                  {lesson.content}
                </p>
              </div>

              <div className="flex items-center space-x-4 p-6 bg-white/5 rounded-3xl border border-white/5">
                <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold">
                  <Trophy size={24} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-tighter opacity-40">Rewards</p>
                  <p className="font-bold text-white/90">+{lesson.xpReward} XP & +{lesson.coinReward} Coins</p>
                </div>
              </div>
            </motion.div>
          )}

          {phase === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <h3 className="text-2xl font-black leading-tight">
                {lesson.quiz[currentQuestion].question}
              </h3>

              <div className="space-y-3">
                {lesson.quiz[currentQuestion].options.map((opt, i) => {
                  const isSelected = selectedAnswer === i;
                  const isAnswerCorrect = i === lesson.quiz[currentQuestion].correctIndex;

                  let style = "bg-white/5 border-white/5 text-white/60";
                  if (isSelected) {
                    style = isAnswerCorrect
                      ? "bg-success/10 border-success text-success shadow-[0_0_20px_rgba(34,197,94,0.2)]"
                      : "bg-error/10 border-error text-error shadow-[0_0_20px_rgba(239,68,68,0.2)]";
                  } else if (selectedAnswer !== null && isAnswerCorrect) {
                    style = "bg-success/10 border-success/50 text-success";
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      className={`w-full p-6 rounded-2xl border text-left font-bold transition-all duration-300 ${style}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {selectedAnswer !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-6 rounded-2xl border ${isCorrect ? 'bg-success/5 border-success/20' : 'bg-warning/5 border-warning/20'}`}
                >
                  <p className={`text-sm font-bold mb-1 ${isCorrect ? 'text-success' : 'text-warning'}`}>
                    {isCorrect ? 'Excellent!' : 'Not quite...'}
                  </p>
                  <p className="text-sm opacity-60 leading-relaxed">
                    {lesson.quiz[currentQuestion].explanation}
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}

          {phase === 'completed' && (
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center space-y-8 pt-12"
            >
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                  className="w-32 h-32 rounded-full bg-gold flex items-center justify-center shadow-[0_0_50px_rgba(245,200,66,0.5)]"
                >
                  <Trophy size={60} className="text-void" />
                </motion.div>
                <div className="absolute -top-4 -right-4 flex space-x-1">
                  {[1, 2, 3].map(i => <Star key={i} size={24} className="text-gold fill-gold" />)}
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-4xl font-black uppercase italic tracking-tighter italic">Lesson Crushed!</h2>
                <p className="text-white/40 font-medium">You're making some serious moves.</p>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="glass p-5 rounded-3xl">
                  <p className="text-xs font-black uppercase tracking-widest opacity-30 mb-1">XP Earned</p>
                  <p className="text-2xl font-black text-gold">+{lesson.xpReward}</p>
                </div>
                <div className="glass p-5 rounded-3xl">
                  <p className="text-xs font-black uppercase tracking-widest opacity-30 mb-1">Coins</p>
                  <p className="text-2xl font-black text-gold">+{lesson.coinReward}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer CTA */}
      <div className="p-8">
        {phase === 'completed' ? (
          <button
            onClick={onClose}
            className="w-full h-16 bg-white text-void font-black rounded-2xl shadow-xl active:scale-95 transition-transform"
          >
            Back to Dashboard
          </button>
        ) : (
          <button
            disabled={phase === 'quiz' && selectedAnswer === null}
            onClick={next}
            className={`w-full h-16 rounded-2xl font-black flex items-center justify-center space-x-2 transition-all active:scale-95 ${
              (phase === 'quiz' && selectedAnswer === null)
              ? 'bg-white/5 text-white/20'
              : 'bg-gold text-void shadow-[0_10px_30px_rgba(245,200,66,0.3)]'
            }`}
          >
            <span>{phase === 'learning' ? 'Take Quiz' : 'Continue'}</span>
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </motion.div>
  );
};
