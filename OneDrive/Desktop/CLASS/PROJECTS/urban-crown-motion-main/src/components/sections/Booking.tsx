import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { AnimatedText } from "../AnimatedText";
import { MagneticButton } from "../MagneticButton";
import { SectionDivider } from "../SectionDivider";
import { Clock, User, Phone, Check, Sparkles } from "lucide-react";

const timeSlots = ["10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"];

export const Booking = () => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const inputVariants = {
    focused: { scale: 1.02, borderColor: "hsl(var(--primary))" },
    unfocused: { scale: 1, borderColor: "hsl(var(--border))" },
  };

  return (
    <>
      <SectionDivider variant="gradient" />
      
      <section className="relative py-32 md:py-48 bg-secondary/30 overflow-hidden">
        {/* Background decorations */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-64 h-64 border border-primary/5 rounded-full hidden lg:block"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-20 w-48 h-48 border border-primary/5 rounded-full hidden lg:block"
        />

        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-primary font-body uppercase letter-spacing-wider text-xs mb-6 inline-flex items-center gap-3"
            >
              <Sparkles className="w-4 h-4" />
              Reserve Your Spot
              <Sparkles className="w-4 h-4" />
            </motion.span>

            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl text-foreground">
              <AnimatedText text="Book an Appointment" />
            </h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  {/* Name Input */}
                  <motion.div
                    className="group"
                    animate={focusedField === 'name' ? 'focused' : 'unfocused'}
                  >
                    <label className="text-muted-foreground text-sm uppercase letter-spacing-wide mb-3 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Your Name
                    </label>
                    <motion.div 
                      className="relative"
                      variants={inputVariants}
                      animate={focusedField === 'name' ? 'focused' : 'unfocused'}
                    >
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full bg-background border border-border focus:border-primary px-6 py-4 font-body text-foreground placeholder:text-muted-foreground outline-none transition-all duration-300"
                        placeholder="Enter your full name"
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary to-gold-light origin-left"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: focusedField === 'name' ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </motion.div>

                  {/* Phone Input */}
                  <motion.div className="group">
                    <label className="text-muted-foreground text-sm uppercase letter-spacing-wide mb-3 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </label>
                    <motion.div 
                      className="relative"
                      variants={inputVariants}
                      animate={focusedField === 'phone' ? 'focused' : 'unfocused'}
                    >
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full bg-background border border-border focus:border-primary px-6 py-4 font-body text-foreground placeholder:text-muted-foreground outline-none transition-all duration-300"
                        placeholder="+91 00000 00000"
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary to-gold-light origin-left"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: focusedField === 'phone' ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </motion.div>

                  {/* Time Slots */}
                  <div>
                    <label className="text-muted-foreground text-sm uppercase letter-spacing-wide mb-4 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Select Time
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                      {timeSlots.map((time, index) => (
                        <motion.button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className={`relative py-3 px-4 border font-body text-sm transition-all duration-300 overflow-hidden ${
                            selectedTime === time
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background border-border text-muted-foreground hover:border-primary hover:text-foreground"
                          }`}
                        >
                          <span className="relative z-10">{time}</span>
                          
                          {/* Selection indicator */}
                          <motion.div
                            className="absolute inset-0 bg-primary"
                            initial={{ scale: 0 }}
                            animate={{ scale: selectedTime === time ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                          />

                          {/* Check mark for selected */}
                          {selectedTime === time && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-1 right-1 w-3 h-3"
                            >
                              <Check className="w-3 h-3 text-primary-foreground" />
                            </motion.div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <MagneticButton
                    className="w-full"
                    onClick={() => {}}
                  >
                    <motion.button
                      type="submit"
                      disabled={!selectedTime || !formData.name || !formData.phone}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full bg-primary text-primary-foreground py-5 font-body uppercase letter-spacing-wide text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,162,77,0.4)] relative overflow-hidden group"
                    >
                      <span className="relative z-10">Confirm Booking</span>
                      
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                        animate={{ x: ["100%", "-100%"] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      />
                    </motion.button>
                  </MagneticButton>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6 }}
                  className="text-center py-16"
                >
                  {/* Success animation */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="relative w-24 h-24 mx-auto mb-8"
                  >
                    <motion.div
                      className="absolute inset-0 bg-primary rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-primary rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                    >
                      <motion.div
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        <Check className="w-12 h-12 text-primary-foreground" />
                      </motion.div>
                    </motion.div>

                    {/* Sparkle effects */}
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-primary rounded-full"
                        style={{
                          top: "50%",
                          left: "50%",
                        }}
                        initial={{ scale: 0, x: 0, y: 0 }}
                        animate={{
                          scale: [0, 1, 0],
                          x: Math.cos((i * 60 * Math.PI) / 180) * 60,
                          y: Math.sin((i * 60 * Math.PI) / 180) * 60,
                        }}
                        transition={{
                          delay: 0.5 + i * 0.1,
                          duration: 0.6,
                        }}
                      />
                    ))}
                  </motion.div>

                  <motion.h3 
                    className="font-heading text-3xl text-foreground mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    Booking Confirmed
                  </motion.h3>
                  
                  <motion.p 
                    className="text-muted-foreground font-body"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    We'll see you at <span className="text-primary font-heading">{selectedTime}</span>
                    <br />
                    A confirmation has been sent to your phone.
                  </motion.p>

                  <motion.button
                    onClick={() => {
                      setIsSubmitted(false);
                      setSelectedTime(null);
                      setFormData({ name: "", phone: "" });
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-8 text-primary font-body uppercase letter-spacing-wide text-sm relative group"
                  >
                    Book Another
                    <span className="absolute -bottom-1 left-0 w-full h-px bg-primary transform origin-left transition-transform duration-300 group-hover:scale-x-100" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
};
