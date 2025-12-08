import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useRef } from "react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
}: BeforeAfterSliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full aspect-[4/5] overflow-hidden cursor-ew-resize select-none"
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      onTouchMove={handleTouchMove}
      data-cursor-text="Drag"
    >
      {/* After Image (background) */}
      <div className="absolute inset-0">
        <img
          src={afterImage}
          alt={afterLabel}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1 text-xs font-body uppercase letter-spacing-wide text-foreground">
          {afterLabel}
        </div>
      </div>

      {/* Before Image (clipped) */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ 
            width: containerRef.current?.offsetWidth || '100%',
            maxWidth: 'none'
          }}
        />
        <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 text-xs font-body uppercase letter-spacing-wide text-foreground">
          {beforeLabel}
        </div>
      </motion.div>

      {/* Slider Handle */}
      <motion.div
        className="absolute top-0 bottom-0 w-1 bg-primary cursor-ew-resize z-10"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        animate={{ 
          boxShadow: isDragging 
            ? '0 0 20px hsl(var(--primary))' 
            : '0 0 10px hsl(var(--primary) / 0.5)' 
        }}
      >
        {/* Handle Circle */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-full flex items-center justify-center"
          animate={{ scale: isDragging ? 1.2 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-1">
            <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-4 border-r-primary-foreground" />
            <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-primary-foreground" />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
