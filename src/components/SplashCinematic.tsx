import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SplashCinematicProps {
  onComplete: () => void;
}

const Particle = () => {
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  const size = Math.random() * 3 + 1;
  const duration = Math.random() * 5 + 3;
  const delay = Math.random() * 2;

  return (
    <motion.div
      initial={{ opacity: 0, x: `${x}%`, y: `${y}%` }}
      animate={{
        opacity: [0, 0.5, 0],
        y: [`${y}%`, `${y - 10}%`],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "linear"
      }}
      className="absolute bg-gold rounded-full"
      style={{ width: size, height: size }}
    />
  );
};

export const SplashCinematic: React.FC<SplashCinematicProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    console.log("SplashCinematic mounted");
    const timers = [
      setTimeout(() => { console.log("Step 1"); setStep(1); }, 500),
      setTimeout(() => { console.log("Step 2"); setStep(2); }, 2000),
      setTimeout(() => { console.log("Step 3"); setStep(3); }, 3500),
      setTimeout(() => { console.log("Splash complete"); onComplete(); }, 5000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#050508] flex flex-col items-center justify-center overflow-hidden">
      {/* Particle Field */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <Particle key={i} />
        ))}
      </div>

      {/* Radial Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.3, scale: 1.2 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
        className="absolute w-[400px] h-[400px] rounded-full bg-gold/20 blur-[100px]"
      />

      <div className="relative flex flex-col items-center">
        {/* Animated Coin Logo */}
        <motion.div
          initial={{ scale: 0, rotateY: 0 }}
          animate={{ scale: 1, rotateY: 360 }}
          transition={{
            scale: { type: "spring", stiffness: 100, damping: 15 },
            rotateY: { duration: 3, repeat: Infinity, ease: "linear" }
          }}
          className="relative w-32 h-32 mb-8"
        >
          <div className="absolute inset-0 rounded-full border-4 border-gold bg-gradient-to-br from-[#FFE066] via-[#F5C842] to-[#D4A017] shadow-[0_0_40px_rgba(245,200,66,0.6)] flex items-center justify-center">
            <span className="text-4xl font-black text-[#050508]">$</span>
          </div>

          {/* Orbital Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4 rounded-full border border-gold/30"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gold shadow-[0_0_10px_#F5C842]" />
          </motion.div>
        </motion.div>

        {/* Branding */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 20 }}
          className="text-center"
        >
          <h1 className="text-6xl font-black tracking-tighter text-gradient-gold mb-2">
            ECILY
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 2 ? 1 : 0 }}
            className="text-white/40 font-medium tracking-[0.3em] uppercase text-xs"
          >
            Learn Finance Easy
          </motion.p>
        </motion.div>

        {/* Loading Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 2 ? 1 : 0 }}
          className="mt-12 flex space-x-2"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-1.5 h-1.5 rounded-full bg-gold"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};
