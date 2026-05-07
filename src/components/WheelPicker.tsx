import React, { useRef, useEffect } from 'react';

interface WheelPickerProps {
  value: number;
  onChange: (value: number) => void;
  range: number[];
  accent: string;
}

export const WheelPicker: React.FC<WheelPickerProps> = ({ value, onChange, range, accent }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemHeight = 80;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const index = Math.round(scrollTop / itemHeight);
    const newValue = range[index];
    if (newValue !== undefined && newValue !== value) {
      onChange(newValue);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      const index = range.indexOf(value);
      containerRef.current.scrollTop = index * itemHeight;
    }
  }, [value, range]);

  return (
    <div className="relative h-[240px] w-48 overflow-hidden flex items-center justify-center perspective-[1000px]">
      {/* 3D Selector Overlay */}
      <div
        className="absolute inset-x-0 h-[80px] top-1/2 -translate-y-1/2 pointer-events-none z-20 flex items-center justify-center"
      >
        <div className="w-full h-full glass rounded-2xl border-white/20 shadow-[0_0_30px_rgba(245,200,66,0.3)]" />
      </div>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full w-full overflow-y-scroll scroll-smooth no-scrollbar snap-y snap-mandatory py-[80px] z-10"
      >
        {range.map((num) => {
          const isSelected = num === value;
          const index = range.indexOf(num);
          const currentIndex = range.indexOf(value);
          const distance = Math.abs(index - currentIndex);

          return (
            <div
              key={num}
              className="h-[80px] flex items-center justify-center snap-center"
              style={{
                transform: `rotateX(${ (index - currentIndex) * -20 }deg) translateZ(${ distance * -20 }px)`,
                opacity: 1 - (distance * 0.3),
                scale: 1 - (distance * 0.1),
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <span className={`text-5xl font-black transition-all duration-500 ${
                isSelected ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'text-white/10'
              }`}
              style={{ color: isSelected ? accent : undefined }}
              >
                {num}
              </span>
            </div>
          );
        })}
      </div>

      {/* High-End Shadow Masks */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#030303] to-transparent pointer-events-none z-20" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#030303] to-transparent pointer-events-none z-20" />
    </div>
  );
};
