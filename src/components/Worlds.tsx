import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store';
import { CURRICULUM } from '../curriculum';
import { LessonRunner } from './LessonRunner';
import { type World, type Lesson } from '../types';
import { Lock, Play, CheckCircle2, ChevronRight } from 'lucide-react';

export function Worlds() {
  const user = useAppStore((state) => state.user);
  const [selectedLesson, setSelectedLesson] = useState<{ world: World, lesson: Lesson } | null>(null);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-void pb-32 text-white font-display">
      {/* Dynamic Header */}
      <div className="px-6 pt-20 pb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[100px] -mr-32 -mt-32" />
        <div className="relative z-10">
          <span className="micro-label text-gold/50 mb-2">Curriculum Architecture</span>
          <h1 className="text-display-md text-display italic">Learning <span className="gold-gradient">Worlds</span></h1>
          <p className="text-white/30 text-xs font-lux uppercase tracking-[0.2em] mt-1">Multi-phase financial synchronization protocol.</p>
        </div>
      </div>

      <div className="px-6 space-y-16">
        {CURRICULUM.map((world, wIdx) => {
          // A world is locked if the previous world's last lesson isn't completed.
          // For simplicity and demo, we'll just check if they've finished any lesson in the previous world.
          const isLocked = wIdx > 0 && !CURRICULUM[wIdx-1].lessons.some(l => user.completedLessons.includes(l.id));

          return (
            <motion.div
              key={world.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center space-x-6">
                <div
                  className="w-16 h-16 rounded-super premium-glass flex items-center justify-center text-3xl shadow-gold-bloom/10 relative overflow-hidden"
                  style={{ border: `1px solid ${world.color}44` }}
                >
                  <div className="absolute inset-0 opacity-10" style={{ backgroundColor: world.color }} />
                  <span className="relative z-10 drop-shadow-sm">{world.icon}</span>
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    {isLocked && <Lock size={12} className="text-white/20" />}
                    <h2 className={`text-2xl font-black italic uppercase tracking-tighter ${isLocked ? 'text-white/20' : 'text-white'}`}>{world.name}</h2>
                  </div>
                  <p className="micro-label !tracking-widest opacity-40">{world.subtitle}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {world.lessons.map((lesson, lIdx) => {
                  const isCompleted = user.completedLessons.includes(lesson.id);
                  const isLessonLocked = isLocked || (lIdx > 0 && !user.completedLessons.includes(world.lessons[lIdx-1].id));

                  return (
                    <motion.div
                      key={lesson.id}
                      whileHover={!isLessonLocked ? { scale: 1.01, x: 10 } : {}}
                      whileTap={!isLessonLocked ? { scale: 0.99 } : {}}
                      onClick={() => !isLessonLocked && setSelectedLesson({ world, lesson })}
                      className={`premium-glass p-6 rounded-[2rem] border-white/5 flex items-center justify-between group cursor-pointer transition-all duration-500 ${
                        isLessonLocked ? 'opacity-30 grayscale pointer-events-none' : 'hover:bg-white/[0.03] hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center space-x-5">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-700 ${
                          isCompleted
                          ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                          : 'bg-white/5 text-white/20 border border-white/5'
                        }`}>
                          {isCompleted ? (
                             <CheckCircle2 size={24} strokeWidth={2.5} />
                          ) : (
                             <Play size={20} className={!isLessonLocked ? "text-gold fill-gold/20" : ""} />
                          )}
                        </div>
                        <div>
                          <p className={`text-lg font-black italic uppercase tracking-tight transition-colors ${isCompleted ? 'text-white/90' : 'text-white/60'}`}>{lesson.title}</p>
                          <div className="flex items-center space-x-3 mt-1">
                            <span className="micro-label !text-[8px] opacity-40">{lesson.subtitle}</span>
                            <span className="w-1 h-1 rounded-full bg-white/10" />
                            <span className="micro-label !text-[8px] !text-gold/50">{lesson.xpReward} XP REWARD</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="hidden md:flex flex-col items-end">
                            <span className="micro-label !text-[8px] mb-0.5">EST. TIME</span>
                            <span className="font-mono text-[10px] text-white/30">05:00M</span>
                        </div>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-gold group-hover:text-void transition-all duration-500">
                          <ChevronRight size={18} strokeWidth={3} />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedLesson && (
          <LessonRunner
            world={selectedLesson.world}
            lesson={selectedLesson.lesson}
            onClose={() => setSelectedLesson(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
