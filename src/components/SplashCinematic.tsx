import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashCinematicProps {
  onComplete: () => void;
}

const Particle = () => {
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  const size = Math.random() * 2 + 1;
  const duration = Math.random() * 3 + 3;

  return (
    <motion.div
      initial={{ opacity: 0, x: `${x}vw`, y: `${y}vh` }}
      animate={{
        opacity: [0, 0.4, 0],
        scale: [0.5, 1, 0.5],
        y: [`${y}vh`, `${y - 10}vh`],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear"
      }}
      className="absolute bg-gold rounded-full"
      style={{ width: size, height: size }}
    />
  );
};

export function SplashCinematic({ onComplete }: SplashCinematicProps) {
  const [phase, setPhase] = useState(0);
  const [loadingText, setLoadingText] = useState("INITIALIZING TRAJECTORY...");

  useEffect(() => {
    const textSequence = [
      { t: 800, text: "CALIBRATING DISCIPLINE INDEX..." },
      { t: 1600, text: "MAPPING NET WORTH PATHWAY..." },
      { t: 2400, text: "ACCESSING SECRET OPERATING SYSTEM..." },
      { t: 3200, text: "WELCOME, STRATEGIST." },
    ];

    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1400),
      setTimeout(() => setPhase(3), 3600),
      setTimeout(() => onComplete(), 4500),
      ...textSequence.map(item => setTimeout(() => setLoadingText(item.text), item.t))
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-void flex flex-col items-center justify-center overflow-hidden text-white">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        {Array.from({ length: 40 }).map((_, i) => (
          <Particle key={i} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)]"
      />

      <div className="relative flex flex-col items-center z-10">
        {/* The Core OS Symbol */}
        <div className="relative w-40 h-40 mb-16">
          <AnimatePresence>
            {phase >= 1 && (
              <>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 1.5, filter: "blur(40px)" }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {/* Rotating Rings */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-4 rounded-full border border-gold/20"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-8 rounded-full border border-gold/10"
                  />

                  {/* Central Diamond/Core */}
                  <motion.div
                    className="w-16 h-16 bg-gold/10 backdrop-blur-md border border-gold/50 rotate-45 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                  >
                    <motion.div
                      className="w-8 h-8 bg-gold shadow-gold-bloom"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Status Feed */}
        <div className="flex flex-col items-center space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={loadingText}
                initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
                transition={{ duration: 0.4 }}
                className="micro-label text-gold/60 h-4"
              >
                {loadingText}
              </motion.span>
            </AnimatePresence>

            <motion.div
              className="w-48 h-[1px] bg-white/10 mt-4 relative overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: 192 }}
              transition={{ duration: 3.5, ease: "easeInOut" }}
            >
              <motion.div
                className="absolute inset-0 bg-gold"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 3.5, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>

          {phase >= 2 && phase < 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="text-center"
            >
              <h1 className="text-display text-5xl gold-gradient mb-2">
                ECILY OS
              </h1>
            </motion.div>
          )}
        </div>
      </div>

      {/* Screen Glitch/Scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%]" />
    </div>
  );
}
