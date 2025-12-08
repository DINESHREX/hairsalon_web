import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { AnimatedText } from "../AnimatedText";
import { TiltCard } from "../TiltCard";
import aboutImage from "@/assets/about-image.jpg";

export const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true });
  const [imageHovered, setImageHovered] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  const lineWidth = useTransform(scrollYProgress, [0.2, 0.5], ["0%", "100%"]);
  const contentX = useTransform(scrollYProgress, [0, 0.3], [50, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const stats = [
    { number: 10, suffix: "+", label: "Years" },
    { number: 5, suffix: "K+", label: "Clients" },
    { number: 15, suffix: "+", label: "Stylists" },
  ];

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-48 overflow-hidden bg-background"
    >
      {/* Floating background elements */}
      <motion.div
        animate={{ y: [0, -30, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 right-10 w-48 h-48 border border-primary/5 rounded-full hidden lg:block"
      />

      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          {/* Image Column with Tilt */}
          <motion.div
            className="relative order-2 md:order-1"
            initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <TiltCard tiltAmount={5}>
              <div 
                className="relative overflow-hidden group"
                onMouseEnter={() => setImageHovered(true)}
                onMouseLeave={() => setImageHovered(false)}
                data-cursor-text="Explore"
              >
                <motion.div
                  className="relative overflow-hidden"
                  style={{ scale: imageScale }}
                >
                  <motion.img
                    src={aboutImage}
                    alt="Luxury hair styling - Urban Crown Studio"
                    className="w-full h-[500px] md:h-[700px] object-cover transition-transform duration-700"
                    style={{ y: imageY }}
                    animate={{ scale: imageHovered ? 1.05 : 1 }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.div>
                
                {/* Animated overlay frame */}
                <motion.div 
                  className="absolute inset-4 border border-primary/30 pointer-events-none"
                  animate={{ 
                    borderColor: imageHovered ? 'hsl(var(--primary) / 0.6)' : 'hsl(var(--primary) / 0.3)'
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Gradient overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent pointer-events-none"
                  animate={{ opacity: imageHovered ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </TiltCard>
            
            {/* Floating accent with animation */}
            <motion.div
              className="absolute -bottom-8 -right-8 w-32 h-32 border border-primary/50"
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
              animate={{ rotate: [0, 3, 0] }}
            />
            
            {/* Additional floating element */}
            <motion.div
              className="absolute -top-4 -left-4 w-16 h-16 border border-primary/30 hidden md:block"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              viewport={{ once: true }}
              animate={{ y: [0, -10, 0] }}
            />
          </motion.div>

          {/* Content Column */}
          <motion.div 
            className="order-1 md:order-2"
            style={{ x: contentX, opacity: contentOpacity }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-primary font-body uppercase letter-spacing-wider text-xs mb-6 inline-flex items-center gap-3"
            >
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
                className="w-8 h-px bg-primary origin-left"
              />
              Our Philosophy
            </motion.span>

            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl text-foreground mb-8">
              <AnimatedText text="Where Artistry" className="block" />
              <AnimatedText text="Meets Identity" className="block text-gradient" delay={0.2} />
            </h2>

            {/* Animated Line */}
            <motion.div
              className="h-px bg-gradient-to-r from-primary to-transparent mb-8 origin-left"
              style={{ width: lineWidth }}
            />

            <motion.p
              initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-muted-foreground font-body text-base md:text-lg leading-relaxed mb-8"
            >
              Urban Crown Studio blends international hair design principles with 
              Indian individuality to deliver refined, modern excellence. Every cut, 
              every style is a statement of who you are.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
              className="text-muted-foreground font-body text-base md:text-lg leading-relaxed"
            >
              Our master stylists are trained in the latest Western techniques, 
              adapted for the unique textures and styles of Indian hair.
            </motion.p>

            {/* Animated Stats with counting */}
            <motion.div
              ref={statsRef}
              className="grid grid-cols-3 gap-8 mt-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              viewport={{ once: true }}
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center md:text-left group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <motion.span 
                    className="font-heading text-3xl md:text-4xl text-gradient block"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isStatsInView ? stat.number : 0}{stat.suffix}
                  </motion.span>
                  <span className="text-muted-foreground text-xs uppercase letter-spacing-wide relative">
                    {stat.label}
                    <motion.span
                      className="absolute -bottom-1 left-0 h-px bg-primary"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
