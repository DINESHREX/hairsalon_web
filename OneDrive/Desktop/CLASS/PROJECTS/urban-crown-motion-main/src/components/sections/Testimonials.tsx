import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { AnimatedText } from "../AnimatedText";
import { SectionDivider } from "../SectionDivider";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote: "The attention to detail is unmatched. My haircut here looks like it's straight out of a fashion magazine.",
    name: "Arjun Mehta",
    role: "Tech Executive",
  },
  {
    quote: "Finally found a salon that understands Indian hair textures while delivering international-standard styling.",
    name: "Priya Sharma",
    role: "Fashion Designer",
  },
  {
    quote: "The beard sculpting service transformed my entire look. Pure artistry.",
    name: "Vikram Singh",
    role: "Entrepreneur",
  },
  {
    quote: "My bridal styling was absolutely perfect. They made me feel like royalty.",
    name: "Ananya Patel",
    role: "Bride",
  },
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.9,
      filter: "blur(10px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.9,
      filter: "blur(10px)",
    }),
  };

  return (
    <>
      <SectionDivider variant="ornament" />
      
      <section ref={sectionRef} className="relative py-32 md:py-48 bg-background overflow-hidden">
        {/* Animated Background Quote */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03]"
          animate={{ 
            rotate: [0, 5, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <Quote className="w-[500px] h-[500px] text-primary" />
        </motion.div>

        {/* Floating elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-20 w-2 h-2 bg-primary/30 rounded-full hidden lg:block"
        />
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-32 right-32 w-3 h-3 border border-primary/30 rotate-45 hidden lg:block"
        />

        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-primary font-body uppercase letter-spacing-wider text-xs mb-6 block"
            >
              Client Voices
            </motion.span>

            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl text-foreground">
              <AnimatedText text="What They Say" />
            </h2>
          </div>

          {/* Testimonial Carousel */}
          <div className="max-w-4xl mx-auto text-center relative">
            {/* Navigation Arrows */}
            <motion.button
              onClick={goToPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 w-12 h-12 border border-border hover:border-primary flex items-center justify-center transition-all duration-300 group z-20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.button>

            <motion.button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 w-12 h-12 border border-border hover:border-primary flex items-center justify-center transition-all duration-300 group z-20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.button>

            <div className="relative h-[350px] md:h-[300px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0 px-8"
                >
                  {/* Quote icon with animation */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                  >
                    <Quote className="w-12 h-12 text-primary mx-auto mb-8" strokeWidth={1} />
                  </motion.div>
                  
                  {/* Quote text with letter animation would be here */}
                  <motion.p 
                    className="font-heading text-xl md:text-3xl lg:text-4xl text-foreground leading-relaxed mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    "{testimonials[currentIndex].quote}"
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <span className="text-primary font-heading text-lg block relative inline-block">
                      {testimonials[currentIndex].name}
                      <motion.span
                        className="absolute -bottom-1 left-0 h-px bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.6, duration: 0.4 }}
                      />
                    </span>
                    <span className="text-muted-foreground font-body text-sm uppercase letter-spacing-wide block mt-2">
                      {testimonials[currentIndex].role}
                    </span>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Enhanced Progress Indicators */}
            <div className="flex justify-center gap-4 mt-12">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className="relative w-16 h-1 bg-border/50 overflow-hidden rounded-full"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary to-gold-light origin-left rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: currentIndex === index ? 1 : 0 }}
                    transition={{ duration: currentIndex === index ? 6 : 0.3, ease: "linear" }}
                  />
                </motion.button>
              ))}
            </div>

            {/* Testimonial Counter */}
            <motion.div
              className="mt-8 text-muted-foreground font-body text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-primary font-heading">{String(currentIndex + 1).padStart(2, '0')}</span>
              <span className="mx-2">/</span>
              <span>{String(testimonials.length).padStart(2, '0')}</span>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};
