import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SectionDividerProps {
  variant?: "line" | "ornament" | "gradient";
}

export const SectionDivider = ({ variant = "line" }: SectionDividerProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (variant === "ornament") {
    return (
      <div ref={ref} className="flex items-center justify-center gap-4 py-8">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-px w-24 bg-gradient-to-l from-primary to-transparent origin-right"
        />
        <motion.div
          initial={{ scale: 0, rotate: 45 }}
          animate={isInView ? { scale: 1, rotate: 45 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-2 h-2 border border-primary"
        />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-px w-24 bg-gradient-to-r from-primary to-transparent origin-left"
        />
      </div>
    );
  }

  if (variant === "gradient") {
    return (
      <div ref={ref} className="py-8">
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-px w-full max-w-md mx-auto bg-gradient-to-r from-transparent via-primary to-transparent"
        />
      </div>
    );
  }

  return (
    <div ref={ref} className="py-8">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-px w-full max-w-xs mx-auto bg-primary/50 origin-center"
      />
    </div>
  );
};
