import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { LoadingScreen } from "@/components/LoadingScreen";
import { FloatingElements } from "@/components/FloatingElements";
import { GrainOverlay } from "@/components/GrainOverlay";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Gallery } from "@/components/sections/Gallery";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { Booking } from "@/components/sections/Booking";
import { Footer } from "@/components/sections/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoading(false)} />
      
      <AnimatePresence>
        {!isLoading && (
          <motion.main 
            className="bg-background overflow-x-hidden relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <SmoothScroll />
            
            {/* Floating background elements */}
            <FloatingElements />
            
            {/* Grain overlay for texture */}
            <GrainOverlay />
            
            <Navigation />
            
            <Hero />
            
            <section id="about">
              <About />
            </section>
            
            <section id="gallery">
              <Gallery />
            </section>
            
            <section id="services">
              <Services />
            </section>
            
            <section id="testimonials">
              <Testimonials />
            </section>
            
            <section id="booking">
              <Booking />
            </section>
            
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
};

export default Index;
