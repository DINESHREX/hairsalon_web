import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const letterVariants = {
  hidden: { y: 50, opacity: 0, rotateX: -90 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: {
      delay: 0.5 + i * 0.08,
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99] as const,
    },
  }),
};

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Increment to finish in ~2 seconds (avg ~5% per tick over 20 ticks)
        return prev + Math.random() * 4 + 3; 
      });
    }, 100);

    // Timeout set to 2 seconds as requested
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 800);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onComplete]);

  const brandName = "Urban Crown";
  const tagline = "Studio";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Animated Background Lines */}
          <div className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 1.5, ease: "easeOut" }}
                className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent origin-top"
                style={{ left: `${20 + i * 15}%` }}
              />
            ))}
          </div>

          {/* Cinematic Reveal Mask - revealing immediately */}
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 bg-background origin-bottom z-20"
          />

          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            className="text-center relative z-20"
            style={{ perspective: 1000 }}
          >
            {/* Main Title - Letter by Letter */}
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl mb-4 overflow-hidden">
              {brandName.split("").map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block text-gradient"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h1>

            {/* Tagline with stagger */}
            <motion.div className="overflow-hidden">
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
                className="text-muted-foreground font-body uppercase letter-spacing-wider text-sm md:text-base"
              >
                {tagline}
              </motion.p>
            </motion.div>

            {/* Decorative line under text */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="w-16 h-px bg-primary mx-auto mt-6 origin-center"
            />
          </motion.div>

          {/* Loading Bar */}
          <motion.div
            className="absolute bottom-24 left-1/2 -translate-x-1/2 w-48 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground text-xs font-body uppercase letter-spacing-wide">
                Loading
              </span>
              <motion.span 
                className="text-primary text-xs font-body"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {Math.min(100, Math.round(loadProgress))}%
              </motion.span>
            </div>
            <div className="h-px bg-border overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-gold-light to-primary"
                style={{ width: `${Math.min(100, loadProgress)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </motion.div>

          {/* Animated Corner Frames */}
          <div className="absolute inset-12 pointer-events-none">
            {/* Top Left */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="absolute top-0 left-0 w-20 h-px bg-gradient-to-r from-primary to-transparent origin-left"
            />
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="absolute top-0 left-0 w-px h-20 bg-gradient-to-b from-primary to-transparent origin-top"
            />

            {/* Top Right */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="absolute top-0 right-0 w-20 h-px bg-gradient-to-l from-primary to-transparent origin-right"
            />
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="absolute top-0 right-0 w-px h-20 bg-gradient-to-b from-primary to-transparent origin-top"
            />

            {/* Bottom Left */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="absolute bottom-0 left-0 w-20 h-px bg-gradient-to-r from-primary to-transparent origin-left"
            />
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="absolute bottom-0 left-0 w-px h-20 bg-gradient-to-t from-primary to-transparent origin-bottom"
            />

            {/* Bottom Right */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="absolute bottom-0 right-0 w-20 h-px bg-gradient-to-l from-primary to-transparent origin-right"
            />
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="absolute bottom-0 right-0 w-px h-20 bg-gradient-to-t from-primary to-transparent origin-bottom"
            />
          </div>

          {/* Pulsing Glow */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary rounded-full blur-3xl pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
