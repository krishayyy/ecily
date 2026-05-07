import React, { useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const GlobalBackground: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const particles = useMemo(() => Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    size: Math.random() * 5 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  })), []);

  return (
    <div className="fixed inset-0 -z-10 bg-[#030303] overflow-hidden pointer-events-none">
      {/* Dynamic Mesh Gradients - Brighter and More Vivid */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute -top-[500px] -left-[500px] w-[1200px] h-[1200px] rounded-full bg-gold/15 blur-[150px]"
      />
      <motion.div
        style={{
          x: useSpring(mouseX, { stiffness: 30, damping: 25 }),
          y: useSpring(mouseY, { stiffness: 30, damping: 25 })
        }}
        className="absolute -bottom-[500px] -right-[500px] w-[1000px] h-[1000px] rounded-full bg-xpBlue/15 blur-[150px]"
      />

      {/* Floating Particles */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ x: `${p.x}%`, y: `${p.y}%`, opacity: 0 }}
          animate={{
            y: [`${p.y}%`, `${p.y - 15}%`, `${p.y}%`],
            opacity: [0, 0.4, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
          className="absolute bg-white/30 rounded-full"
          style={{ width: p.size, height: p.size }}
        />
      ))}

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:64px_64px]" />
    </div>
  );
};
