import React, { useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const GlobalBackground: React.FC = () => {
  const accentColor = "#C5A059";

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 40, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const glowX = useTransform(springX, (v) => v * 100 + 'px');
  const glowY = useTransform(springY, (v) => v * 100 + 'px');

  const rings = useMemo(() => Array.from({ length: 3 }).map((_, i) => ({
    id: i,
    size: 400 + i * 250,
    duration: 15 + i * 5,
    rotation: i * 45
  })), []);

  const particles = useMemo(() => Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    size: Math.random() * 2 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.3 + 0.1
  })), []);

  return (
    <div className="fixed inset-0 -z-10 bg-void overflow-hidden pointer-events-none transition-colors duration-1000">
      {/* Dynamic Ambient Glows */}
      <motion.div
        style={{ x: glowX, y: glowY, translateX: '-50%', translateY: '-50%', backgroundColor: accentColor }}
        className="absolute top-1/3 left-1/3 w-[100vw] h-[100vw] rounded-full opacity-[0.03] blur-[180px] transition-colors duration-1000"
      />
      <motion.div
        style={{ x: glowY, y: glowX, translateX: '-50%', translateY: '-50%', backgroundColor: accentColor }}
        className="absolute bottom-1/3 right-1/4 w-[80vw] h-[80vw] rounded-full opacity-[0.02] blur-[150px] transition-colors duration-1000"
      />

      {/* Futuristic Metallic Rings */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
        {rings.map(ring => (
          <motion.div
            key={ring.id}
            initial={{ rotate: ring.rotation, scale: 0.8, opacity: 0 }}
            animate={{
              rotate: ring.rotation + 360,
              scale: [0.8, 1.1, 0.8],
              opacity: 1
            }}
            transition={{
              rotate: { duration: ring.duration, repeat: Infinity, ease: "linear" },
              scale: { duration: ring.duration * 0.8, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 2 }
            }}
            style={{ width: ring.size, height: ring.size }}
            className="absolute rounded-full border border-white/40"
          />
        ))}
      </div>

      {/* High-Performance Particle Field */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ x: `${p.x}vw`, y: `${p.y}vh`, opacity: 0 }}
          animate={{
            y: [`${p.y}vh`, `${p.y - 10}vh`, `${p.y}vh`],
            opacity: [0, p.opacity, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
          className="absolute bg-white rounded-full"
          style={{ width: p.size, height: p.size }}
        />
      ))}

      {/* Subtle Digital Grid */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:100px_100px]" />

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};
