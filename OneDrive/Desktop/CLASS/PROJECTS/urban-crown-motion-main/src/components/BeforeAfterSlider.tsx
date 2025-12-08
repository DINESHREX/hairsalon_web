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
  // Automatic scanning animation
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full aspect-[4/5] overflow-hidden select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* After Image (background) */}
      <div className="absolute inset-0">
        <img
          src={afterImage}
          alt={afterLabel}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1 text-xs font-body uppercase letter-spacing-wide text-foreground z-10">
          {afterLabel}
        </div>
      </div>

      {/* Before Image (clipped) */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        animate={{ width: ["0%", "100%", "0%"] }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 0.5 
        }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ 
            width: '100%',
            maxWidth: 'none'
          }}
        />
        <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 text-xs font-body uppercase letter-spacing-wide text-foreground z-10">
          {beforeLabel}
        </div>
      </motion.div>

      {/* Slider Handle */}
      <motion.div
        className="absolute top-0 bottom-0 w-1 bg-primary z-20 shadow-[0_0_10px_rgba(0,0,0,0.3)]"
        animate={{ left: ["0%", "100%", "0%"] }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 0.5 
        }}
      >
        {/* Handle Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg">
          <div className="flex items-center gap-0.5">
            <div className="w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-r-[3px] border-r-primary-foreground" />
            <div className="w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[3px] border-l-primary-foreground" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
