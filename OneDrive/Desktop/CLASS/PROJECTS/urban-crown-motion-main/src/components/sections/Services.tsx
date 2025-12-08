import { motion, useInView } from "framer-motion";
import { useState, useRef } from "react";
import { AnimatedText } from "../AnimatedText";
import { TiltCard } from "../TiltCard";
import { SectionDivider } from "../SectionDivider";
import { Scissors, Sparkles, Palette, Droplets, Heart, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Scissors,
    title: "Precision Haircuts",
    description: "Modern cuts tailored to your face shape and lifestyle",
    price: "₹599+",
  },
  {
    icon: Sparkles,
    title: "Beard Sculpting",
    description: "Expert grooming for the distinguished gentleman",
    price: "₹399+",
  },
  {
    icon: Palette,
    title: "Western Coloring",
    description: "Balayage, highlights, and contemporary color techniques",
    price: "₹1,999+",
  },
  {
    icon: Droplets,
    title: "Luxury Hair Spa",
    description: "Deep conditioning treatments for ultimate hair health",
    price: "₹999+",
  },
  {
    icon: Heart,
    title: "Bridal & Groom",
    description: "Complete styling packages for your special day",
    price: "₹4,999+",
  },
];

export const Services = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <>
      <SectionDivider variant="gradient" />
      
      <section ref={sectionRef} className="relative py-32 md:py-48 bg-secondary/50 overflow-hidden">
        {/* Animated Background Pattern */}
        <motion.div 
          className="absolute inset-0 opacity-5"
          animate={{ 
            backgroundPosition: isInView ? ['0% 0%', '100% 100%'] : '0% 0%' 
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </motion.div>

        {/* Floating accent elements */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-20 w-32 h-32 border border-primary/10 rounded-full hidden lg:block"
        />
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-32 left-16 w-24 h-24 border border-primary/10 hidden lg:block"
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
              What We Offer
            </motion.span>

            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl text-foreground">
              <AnimatedText text="Our Services" />
            </h2>

            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
              className="w-24 h-px bg-primary mx-auto mt-8"
            />
          </div>

          {/* Services Grid with Tilt Effect */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true, margin: "-50px" }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative"
              >
                <TiltCard tiltAmount={5}>
                  <motion.div
                    className="card-luxury p-8 h-full cursor-pointer relative overflow-hidden"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Glow effect on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0"
                      animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                      transition={{ duration: 0.4 }}
                    />

                    {/* Icon with enhanced animation */}
                    <motion.div
                      className="mb-6 inline-block relative"
                      animate={{
                        scale: hoveredIndex === index ? 1.15 : 1,
                        rotate: hoveredIndex === index ? 5 : 0,
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <service.icon className="w-10 h-10 text-primary relative z-10" strokeWidth={1.5} />
                      
                      {/* Icon glow */}
                      <motion.div
                        className="absolute inset-0 bg-primary/20 rounded-full blur-xl"
                        animate={{
                          scale: hoveredIndex === index ? 2 : 0,
                          opacity: hoveredIndex === index ? 1 : 0,
                        }}
                        transition={{ duration: 0.4 }}
                      />
                    </motion.div>

                    {/* Title with underline animation */}
                    <h3 className="font-heading text-xl md:text-2xl text-foreground mb-3 relative inline-block">
                      {service.title}
                      <motion.span
                        className="absolute -bottom-1 left-0 h-px bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: hoveredIndex === index ? "100%" : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Price with slide animation */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0,
                        x: hoveredIndex === index ? 0 : -20,
                      }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-8 left-8 flex items-center gap-3"
                    >
                      <span className="text-primary font-heading text-2xl">
                        {service.price}
                      </span>
                      <motion.div
                        animate={{ x: hoveredIndex === index ? [0, 5, 0] : 0 }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <ArrowRight className="w-4 h-4 text-primary" />
                      </motion.div>
                    </motion.div>

                    {/* Animated border line */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary via-gold-light to-primary"
                      initial={{ width: 0 }}
                      animate={{ width: hoveredIndex === index ? "100%" : 0 }}
                      transition={{ duration: 0.4 }}
                    />

                    {/* Corner Accents */}
                    <motion.div 
                      className="absolute top-4 right-4 w-8 h-8 border-t border-r border-primary/30"
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0,
                        scale: hoveredIndex === index ? 1 : 0.8,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div 
                      className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-primary/30"
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0,
                        scale: hoveredIndex === index ? 1 : 0.8,
                      }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    />
                  </motion.div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          {/* Enhanced View All CTA */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.button 
              className="group relative inline-flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors duration-300 py-3 px-6 overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Button background on hover */}
              <motion.span
                className="absolute inset-0 border border-primary/30"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              <span className="font-body uppercase letter-spacing-wide text-sm relative z-10">
                View Full Menu
              </span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="relative z-10"
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
};
