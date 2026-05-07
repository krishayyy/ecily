import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashCinematicProps {
  onComplete: () => void;
}

const Particle = () => {
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  const size = Math.random() * 4 + 1;
  const duration = Math.random() * 4 + 4;
  const delay = Math.random() * 2;

  return (
    <motion.div
      initial={{ opacity: 0, x: `${x}%`, y: `${y}%`, scale: 0 }}
      animate={{
        opacity: [0, 0.7, 0],
        scale: [0, 1, 0],
        y: [`${y}%`, `${y - 15}%`],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
      className="absolute bg-gold rounded-full blur-[1px]"
      style={{ width: size, height: size }}
    />
  );
};

export function SplashCinematic({ onComplete }: SplashCinematicProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    console.log("Splash Sequence Started");
    const timers = [
      setTimeout(() => setPhase(1), 400),   // Symbol reveal
      setTimeout(() => setPhase(2), 1400),  // Text reveal
      setTimeout(() => setPhase(3), 2600),  // Outro
      setTimeout(() => {
        console.log("Splash Sequence Ending");
        onComplete();
      }, 3200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#030303] flex flex-col items-center justify-center overflow-hidden text-white">
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <Particle key={i} />
        ))}
      </div>

      {/* Extreme Radial Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: phase >= 1 ? [0.2, 0.5, 0.2] : 0,
          scale: phase >= 1 ? [1, 1.3, 1] : 0.5
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute w-[600px] h-[600px] rounded-full bg-gold/20 blur-[120px]"
      />

      <div className="relative flex flex-col items-center">
        {/* Cinematic Symbol */}
        <div className="relative w-48 h-48 mb-12">
          <AnimatePresence>
            {phase >= 1 && (
              <>
                {/* Outer Spinning Ring */}
                <motion.div
                  initial={{ opacity: 0, rotate: -180, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -inset-8 rounded-full border border-gold/30"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold shadow-glow-gold"
                  />
                </motion.div>

                {/* Inner Glow Ring */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="absolute -inset-2 rounded-full border-2 border-gold/50 shadow-[inset_0_0_30px_rgba(245,200,66,0.3)]"
                />

                {/* The Core Coin */}
                <motion.div
                  initial={{ scale: 0, rotateY: -90 }}
                  animate={{
                    scale: phase === 3 ? 2 : 1,
                    rotateY: 0,
                    opacity: phase === 3 ? 0 : 1
                  }}
                  transition={{
                    scale: { type: "spring", stiffness: 100, damping: 20 },
                    opacity: { duration: 0.6 }
                  }}
                  className="w-full h-full rounded-full bg-gradient-to-br from-gold-glow via-gold to-gold-deep shadow-2xl flex items-center justify-center relative overflow-hidden"
                >
                  <motion.div
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
                  />
                  <span className="text-6xl font-black text-void drop-shadow-lg">$</span>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Cinematic Branding */}
        <div className="h-24 overflow-hidden flex flex-col items-center">
          <AnimatePresence>
            {phase >= 2 && phase < 3 && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <h1 className="text-7xl font-black tracking-[-0.05em] text-gradient-gold mb-2">
                  ECILY
                </h1>
                <motion.p
                  initial={{ opacity: 0, letterSpacing: "0.1em" }}
                  animate={{ opacity: 0.8, letterSpacing: "0.4em" }}
                  className="text-white font-bold uppercase text-[10px]"
                >
                  The Future of Finance
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
