import { useRef, useEffect } from 'react';

interface WheelPickerProps {
  value: number;
  onChange: (value: number) => void;
  range: number[];
  accent: string;
}

export const WheelPicker: React.FC<WheelPickerProps> = ({ value, onChange, range, accent }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemHeight = 60;

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
    <div className="relative h-[180px] w-32 overflow-hidden flex items-center justify-center">
      {/* Selection Overlay */}
      <div
        className="absolute inset-x-0 h-[60px] top-1/2 -translate-y-1/2 border-y border-white/10 pointer-events-none z-10"
        style={{ boxShadow: `0 0 20px ${accent}20` }}
      />

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full w-full overflow-y-scroll scroll-smooth no-scrollbar snap-y snap-mandatory py-[60px]"
      >
        {range.map((num) => {
          const isSelected = num === value;
          return (
            <div
              key={num}
              className="h-[60px] flex items-center justify-center snap-center transition-all duration-300"
            >
              <span className={`text-4xl font-black transition-all duration-300 ${
                isSelected ? 'text-white scale-110 opacity-100' : 'text-white/20 scale-90 opacity-40'
              }`}
              style={{ color: isSelected ? accent : undefined }}
              >
                {num}
              </span>
            </div>
          );
        })}
      </div>

      {/* 3D Gradients */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-dark-base to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-dark-base to-transparent pointer-events-none z-10" />
    </div>
  );
};
