import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store';
import { CURRICULUM } from '../curriculum';
import { LessonRunner } from './LessonRunner';
import { type World, type Lesson } from '../types';
import { Lock, Play, CheckCircle2 } from 'lucide-react';

export const Worlds: React.FC = () => {
  const user = useAppStore((state) => state.user);
  const [selectedLesson, setSelectedLesson] = useState<{ world: World, lesson: Lesson } | null>(null);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-dark-base pb-32">
      <div className="px-6 pt-12 pb-8">
        <h1 className="text-3xl font-black tracking-tight">Learning Worlds</h1>
        <p className="text-white/40 font-medium">Bite-sized financial mastery.</p>
      </div>

      <div className="px-6 space-y-12">
        {CURRICULUM.map((world, wIdx) => {
          const isLocked = wIdx > 0 && !user.completedLessons.includes(CURRICULUM[wIdx-1].lessons[0].id); // Simplified locking

          return (
            <div key={world.id} className="space-y-6">
              <div className="flex items-center space-x-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-black/20"
                  style={{ backgroundColor: world.color, color: '#050508' }}
                >
                  {world.icon}
                </div>
                <div>
                  <h2 className="text-xl font-black tracking-tight">{world.name}</h2>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-40">{world.subtitle}</p>
                </div>
              </div>

              <div className="space-y-3">
                {world.lessons.map((lesson) => {
                  const isCompleted = user.completedLessons.includes(lesson.id);

                  return (
                    <motion.div
                      key={lesson.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => !isLocked && setSelectedLesson({ world, lesson })}
                      className={`glass p-5 rounded-[24px] border-white/5 flex items-center justify-between group cursor-pointer transition-all ${
                        isLocked ? 'opacity-40 grayscale' : 'hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isCompleted ? 'bg-success/20 text-success' : 'bg-white/5 text-white/40'
                        }`}>
                          {isCompleted ? <CheckCircle2 size={20} /> : (isLocked ? <Lock size={18} /> : <Play size={18} className="fill-current" />)}
                        </div>
                        <div>
                          <p className="font-bold text-white/90">{lesson.title}</p>
                          <p className="text-xs font-medium text-white/30">{lesson.subtitle}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-xs font-black text-gold">+{lesson.xpReward} XP</p>
                        <p className="text-[10px] font-bold opacity-20 group-hover:opacity-40 transition-opacity">5 MINS</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
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
};
