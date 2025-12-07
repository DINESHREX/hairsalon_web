"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ParallaxProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
  direction?: "up" | "down";
}

export const Parallax = ({ 
  children, 
  offset = 50, 
  className = "",
  direction = "up" 
}: ParallaxProps) => {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Use spring for smoother parallax movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const yRange = direction === "up" ? [offset, -offset] : [-offset, offset];
  const y = useTransform(smoothProgress, [0, 1], yRange);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="h-full w-full">{children}</motion.div>
    </div>
  );
};
