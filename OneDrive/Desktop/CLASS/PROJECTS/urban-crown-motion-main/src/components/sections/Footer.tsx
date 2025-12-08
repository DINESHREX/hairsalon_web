import { motion } from "framer-motion";
import { Instagram, Facebook, Youtube, MapPin, Clock, Phone, ArrowUpRight } from "lucide-react";
import { MagneticButton } from "../MagneticButton";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-20 bg-background border-t border-border/50 overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h3 
              className="font-heading text-2xl text-gradient mb-4"
              whileHover={{ scale: 1.02 }}
            >
              Urban Crown Studio
            </motion.h3>
            <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">
              Western Style. Indian Identity.<br />
              Where every cut tells your story.
            </p>
            
            {/* Back to top button */}
            <MagneticButton
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <span className="text-xs uppercase letter-spacing-wide">Back to top</span>
              <motion.div
                animate={{ y: [-2, 2, -2] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowUpRight className="w-4 h-4 rotate-[-45deg]" />
              </motion.div>
            </MagneticButton>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="font-body text-sm uppercase letter-spacing-wide text-foreground mb-6 flex items-center gap-2">
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
                className="w-4 h-px bg-primary"
              />
              Visit Us
            </h4>
            <div className="space-y-4 text-muted-foreground font-body text-sm">
              <motion.div 
                className="flex items-start gap-3 group cursor-pointer"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-foreground transition-colors">
                  123 Fashion Street, Koramangala<br />Bangalore, 560034
                </span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-3 group cursor-pointer"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Clock className="w-4 h-4 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-foreground transition-colors">
                  Tue - Sun: 10 AM - 8 PM
                </span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-3 group cursor-pointer"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Phone className="w-4 h-4 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-foreground transition-colors">
                  +91 98765 43210
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="font-body text-sm uppercase letter-spacing-wide text-foreground mb-6 flex items-center gap-2">
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                viewport={{ once: true }}
                className="w-4 h-px bg-primary"
              />
              Follow Us
            </h4>
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Youtube, href: "#", label: "Youtube" },
              ].map((social, index) => (
                <MagneticButton key={index} className="bg-transparent">
                  <motion.a
                    href={social.href}
                    aria-label={social.label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 border border-border hover:border-primary flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300 relative overflow-hidden group"
                  >
                    <social.icon className="w-5 h-5 relative z-10" />
                    <motion.div
                      className="absolute inset-0 bg-primary/10"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                </MagneticButton>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Animated divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent mb-8"
        />

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <span className="text-muted-foreground/50 font-body text-xs">
            © 2024 Urban Crown Studio. All rights reserved.
          </span>
          
          {/* Credits - Subtle and Elegant */}
          <motion.span 
            className="text-muted-foreground/40 font-body text-[10px] tracking-[0.2em] uppercase"
            whileHover={{ opacity: 0.8 }}
          >
            Designed & Developed by{" "}
            <motion.a
              href="#"
              className="text-muted-foreground/50 hover:text-primary/60 transition-colors relative inline-block"
              whileHover={{ y: -1 }}
            >
              Radi Tech
              <motion.span
                className="absolute -bottom-px left-0 w-full h-px bg-primary/40 origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </motion.span>
        </motion.div>
      </div>
    </footer>
  );
};
