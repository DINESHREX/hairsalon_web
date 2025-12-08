import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { AnimatedLetters } from "../AnimatedText";
import { MagneticButton } from "../MagneticButton";
import heroImage from "@/assets/hero-image.jpg";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const blurValue = useTransform(scrollYProgress, [0, 0.5], [0, 10]);

  // Parallax mouse movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 50, stiffness: 100 };
  const parallaxX = useSpring(mouseX, springConfig);
  const parallaxY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX - innerWidth / 2) / 50;
      const y = (clientY - innerHeight / 2) / 50;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Scroll indicator progress
  const scrollIndicatorY = useTransform(scrollYProgress, [0, 0.3], [0, 30]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-[100dvh] overflow-hidden"
    >
      {/* Parallax Background with mouse movement */}
      <motion.div
        className="absolute inset-0"
        style={{ 
          y, 
          scale,
          x: parallaxX,
        }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background z-10"
          style={{ backdropFilter: `blur(${blurValue}px)` }}
        />
        <motion.img
          src={heroImage}
          alt="Urban Crown Studio - Premium Hair Styling"
          className="w-full h-full object-cover object-center"
          style={{
            x: parallaxX,
            y: parallaxY,
          }}
        />
      </motion.div>

      {/* Animated grain overlay removed for performance */}

      {/* Content */}
      <motion.div
        className="relative z-20 h-full flex flex-col items-center justify-center px-6"
        style={{ opacity }}
      >
        {/* Tagline with blur reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mb-6"
        >
          <p className="text-muted-foreground font-body uppercase letter-spacing-wider text-xs md:text-sm flex items-center gap-4">
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="w-8 h-px bg-primary origin-right hidden md:block"
            />
            Western Style • Indian Identity
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="w-8 h-px bg-primary origin-left hidden md:block"
            />
          </p>
        </motion.div>

        {/* Main Headline with stagger */}
        <h1 className="font-heading text-3xl md:text-6xl lg:text-8xl text-center mb-8">
          <AnimatedLetters
            text="Redefining"
            className="block text-foreground"
            delay={0.8}
          />
          <AnimatedLetters
            text="Hair Culture"
            className="block text-gradient mt-2"
            delay={1.2}
          />
        </h1>

        {/* Subheadline with blur reveal */}
        <motion.p
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: 2, duration: 1 }}
          className="text-muted-foreground font-body text-sm md:text-lg max-w-md text-center mb-12"
        >
          Global Trends. Indian Roots.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          <MagneticButton
            className="bg-primary text-primary-foreground px-6 py-3 md:px-10 md:py-4 font-body uppercase letter-spacing-wide text-xs md:text-sm border border-primary hover:bg-transparent hover:text-primary transition-all duration-500 hover:shadow-[0_0_30px_rgba(201,162,77,0.4)]"
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Book Your Style
          </MagneticButton>
        </motion.div>

        {/* Enhanced Scroll Indicator - Simple Arrow */}
        <motion.div
          className="absolute bottom-12 w-full flex justify-center cursor-pointer z-30 text-primary"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 1 }}
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced Corner Decorations */}
      <div className="absolute inset-8 pointer-events-none hidden md:block">
        {/* Top Left */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute top-0 left-0 w-24 h-px bg-gradient-to-r from-primary to-transparent origin-left"
        />
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1.7, duration: 1 }}
          className="absolute top-0 left-0 w-px h-24 bg-gradient-to-b from-primary to-transparent origin-top"
        />
        
        {/* Floating corner accent */}
        <motion.div
          initial={{ scale: 0, rotate: 45 }}
          animate={{ scale: 1, rotate: 45 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="absolute top-6 left-6 w-2 h-2 border border-primary"
        />

        {/* Bottom Right */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-0 right-0 w-24 h-px bg-gradient-to-l from-primary to-transparent origin-right"
        />
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1.7, duration: 1 }}
          className="absolute bottom-0 right-0 w-px h-24 bg-gradient-to-t from-primary to-transparent origin-bottom"
        />
        
        {/* Floating corner accent */}
        <motion.div
          initial={{ scale: 0, rotate: 45 }}
          animate={{ scale: 1, rotate: 45 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="absolute bottom-6 right-6 w-2 h-2 border border-primary"
        />
      </div>

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/30 rounded-full hidden md:block"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}
    </section>
  );
};
