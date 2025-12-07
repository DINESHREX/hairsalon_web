"use client";

import React, { useRef, useEffect } from "react";
import { motion, useInView, useAnimation, Variant } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  duration?: number;
  y?: number;
  blur?: boolean;
  className?: string;
}

export const Reveal = ({
  children,
  width = "fit-content",
  delay = 0.25,
  duration = 0.5,
  y = 20,
  blur = false,
  className = "",
}: RevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  const variants = {
    hidden: { opacity: 0, y: y, filter: blur ? "blur(10px)" : "none" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: duration, delay: delay, ease: "easeOut" as const },
    },
  };

  return (
    <div ref={ref} style={{ position: "relative", width }} className={className}>
      <motion.div
        variants={variants}
        initial="hidden"
        animate={mainControls}
      >
        {children}
      </motion.div>
    </div>
  );
};
