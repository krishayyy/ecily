import React, { useRef, useEffect } from 'react';

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
        <div className="w-full h-full rounded-2xl border-y border-white/5 bg-white/[0.01] overflow-hidden">
            <div className="absolute inset-0 bg-gold/5" />
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
                transform: `rotateX(${ (index - currentIndex) * -20 }deg) translateZ(${ distance * -60 }px)`,
                opacity: Math.max(0, 1 - (distance * 0.4)),
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <span className={`text-7xl font-black italic tracking-tighter transition-all duration-700 ${
                isSelected ? 'text-gold drop-shadow-[0_0_30px_rgba(197,160,89,0.2)] scale-110' : 'text-white/5'
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
