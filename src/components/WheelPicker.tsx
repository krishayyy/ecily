import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface WheelPickerProps {
  value: number;
  onChange: (value: number) => void;
  range: number[];
}

export const WheelPicker: React.FC<WheelPickerProps> = ({ value, onChange, range }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemHeight = 90; // Increased height for more presence

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const index = Math.round(scrollTop / itemHeight);
    const newValue = range[index];
    if (newValue !== undefined && newValue !== value) {
      onChange(newValue);
      if (window.navigator.vibrate) window.navigator.vibrate(2);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      const index = range.indexOf(value);
      containerRef.current.scrollTop = index * itemHeight;
    }
  }, []); // Only on mount

  return (
    <div className="relative h-[270px] w-56 flex items-center justify-center perspective-[2000px]">
      {/* Visual Accents */}
      <div className="absolute -inset-x-12 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent top-1/2 -translate-y-[45px]" />
      <div className="absolute -inset-x-12 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent top-1/2 translate-y-[45px]" />

      {/* 3D Selector Overlay */}
      <div
        className="absolute inset-x-0 h-[90px] top-1/2 -translate-y-1/2 pointer-events-none z-20 flex items-center justify-center"
      >
        <div className="w-full h-full glass rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(212,175,55,0.15)] overflow-hidden">
            <div className="absolute inset-0 bg-gold/5" />
            <motion.div
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100%_4px]"
            />
        </div>
      </div>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full w-full overflow-y-scroll scroll-smooth no-scrollbar snap-y snap-mandatory py-[90px] z-10"
        style={{ scrollbarWidth: 'none' }}
      >
        {range.map((num) => {
          const isSelected = num === value;
          const index = range.indexOf(num);
          const currentIndex = range.indexOf(value);
          const distance = Math.abs(index - currentIndex);

          return (
            <div
              key={num}
              className="h-[90px] flex items-center justify-center snap-center transform-style-3d"
              style={{
                transform: `rotateX(${ (index - currentIndex) * -25 }deg) translateZ(${ distance * -40 }px)`,
                opacity: Math.max(0, 1 - (distance * 0.35)),
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <span className={`text-6xl font-black italic tracking-tighter transition-all duration-700 ${
                isSelected ? 'text-gold drop-shadow-[0_0_20px_rgba(212,175,55,0.5)] scale-110' : 'text-white/10 grayscale'
              }`}
              >
                {num}
              </span>
            </div>
          );
        })}
      </div>

      {/* High-End Shadow Masks */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#030303] to-transparent pointer-events-none z-20" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#030303] to-transparent pointer-events-none z-20" />

      {/* Side Decorative Numbers (Ghosting) */}
      <div className="absolute -left-16 inset-y-0 w-8 flex flex-col justify-between py-12 opacity-10 pointer-events-none italic font-black text-xs text-gold">
         <span>01</span>
         <span className="h-px w-full bg-gold/50" />
         <span>{value.toString().padStart(2, '0')}</span>
         <span className="h-px w-full bg-gold/50" />
         <span>99</span>
      </div>
    </div>
  );
};
