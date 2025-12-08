import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { AnimatedText } from "../AnimatedText";
import { MagneticButton } from "../MagneticButton";
import { SectionDivider } from "../SectionDivider";
import { Clock, User, Phone, Check, Sparkles } from "lucide-react";

const timeSlots = ["10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"];

export const Booking = () => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Generate next 7 days for booking
  const getNextSevenDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });
      const dayNum = date.getDate();
      const year = date.getFullYear();
      
      days.push({
        value: date.toISOString().split('T')[0], // YYYY-MM-DD format
        label: `${dayName}, ${monthName} ${dayNum}, ${year}`,
        display: `${dayNum}/${date.getMonth() + 1}/${year}` // For confirmation display
      });
    }
    
    return days;
  };

  const availableDates = getNextSevenDays();

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

                  {/* Date Selection */}
                  <div>
                    <label className="text-muted-foreground text-sm uppercase letter-spacing-wide mb-4 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Select Date
                    </label>
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.01 }}
                    >
                      <select
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full bg-background border border-border focus:border-primary px-6 py-4 font-body text-foreground outline-none transition-all duration-300 appearance-none cursor-pointer"
                        required
                      >
                        <option value="">Choose a date</option>
                        {availableDates.map(date => (
                          <option key={date.value} value={date.value}>
                            {date.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                        ▼
                      </div>
                      <motion.div
                        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary to-gold-light origin-left"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: selectedDate ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </div>

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
                      disabled={!selectedTime || !formData.name || !formData.phone || !selectedDate}
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative py-16"
                >
                  {/* Confetti particles */}
                  {[...Array(30)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        background: i % 3 === 0 ? 'hsl(var(--primary))' : i % 3 === 1 ? 'hsl(var(--primary) / 0.6)' : 'hsl(var(--foreground) / 0.3)',
                        left: `${Math.random() * 100}%`,
                        top: '0%',
                      }}
                      initial={{ y: -20, opacity: 0, rotate: 0 }}
                      animate={{
                        y: [0, Math.random() * 400 + 200],
                        x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 200],
                        opacity: [0, 1, 1, 0],
                        rotate: Math.random() * 720,
                        scale: [0, 1, 1, 0.5],
                      }}
                      transition={{
                        delay: i * 0.02,
                        duration: 2 + Math.random() * 2,
                        ease: "easeOut",
                      }}
                    />
                  ))}

                  {/* Success Icon with Ripple Effect */}
                  <div className="relative w-32 h-32 mx-auto mb-8">
                    {/* Ripple rings */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute inset-0 border-2 border-primary rounded-full"
                        initial={{ scale: 1, opacity: 0.6 }}
                        animate={{ 
                          scale: [1, 2, 2.5],
                          opacity: [0.6, 0.3, 0]
                        }}
                        transition={{
                          delay: i * 0.3,
                          duration: 1.5,
                          repeat: Infinity,
                          repeatDelay: 0.6,
                        }}
                      />
                    ))}
                    
                    {/* Main success circle */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-2xl"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        delay: 0.2, 
                        type: "spring", 
                        stiffness: 200,
                        damping: 15
                      }}
                    >
                      {/* Checkmark */}
                      <motion.svg
                        width="64"
                        height="64"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary-foreground"
                      >
                        <motion.path
                          d="M20 6L9 17l-5-5"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: 0.5, duration: 0.6, ease: "easeInOut" }}
                        />
                      </motion.svg>
                    </motion.div>

                    {/* Sparkles around the circle */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-3 h-3"
                        style={{
                          top: '50%',
                          left: '50%',
                        }}
                        initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                        animate={{
                          scale: [0, 1, 0],
                          x: Math.cos((i * 45 * Math.PI) / 180) * 80,
                          y: Math.sin((i * 45 * Math.PI) / 180) * 80,
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          delay: 0.6 + i * 0.05,
                          duration: 0.8,
                        }}
                      >
                        <Sparkles className="w-3 h-3 text-primary" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Success Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-center mb-8"
                  >
                    <h3 className="font-heading text-4xl md:text-5xl text-foreground mb-3">
                      <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        Booking Confirmed!
                      </motion.span>
                    </h3>
                    <motion.p 
                      className="text-muted-foreground font-body text-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                    >
                      Get ready for your transformation
                    </motion.p>
                  </motion.div>

                  {/* Booking Details Cards */}
                  <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                  >
                    {/* Name Card */}
                    <motion.div
                      className="bg-background/50 backdrop-blur-sm border border-primary/20 p-6 rounded-lg relative overflow-hidden group"
                      whileHover={{ scale: 1.02, borderColor: 'hsl(var(--primary))' }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                      <User className="w-5 h-5 text-primary mb-2" />
                      <p className="text-xs uppercase letter-spacing-wide text-muted-foreground mb-1">Name</p>
                      <p className="font-body text-lg font-medium text-foreground">{formData.name}</p>
                    </motion.div>

                    {/* Date Card */}
                    <motion.div
                      className="bg-background/50 backdrop-blur-sm border border-primary/20 p-6 rounded-lg relative overflow-hidden group"
                      whileHover={{ scale: 1.02, borderColor: 'hsl(var(--primary))' }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                      <Clock className="w-5 h-5 text-primary mb-2" />
                      <p className="text-xs uppercase letter-spacing-wide text-muted-foreground mb-1">Date</p>
                      <p className="font-body text-lg font-medium text-primary">
                        {availableDates.find(d => d.value === selectedDate)?.display || selectedDate}
                      </p>
                    </motion.div>

                    {/* Time Card */}
                    <motion.div
                      className="bg-background/50 backdrop-blur-sm border border-primary/20 p-6 rounded-lg relative overflow-hidden group"
                      whileHover={{ scale: 1.02, borderColor: 'hsl(var(--primary))' }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                      <Clock className="w-5 h-5 text-primary mb-2" />
                      <p className="text-xs uppercase letter-spacing-wide text-muted-foreground mb-1">Time</p>
                      <p className="font-body text-lg font-medium text-primary">{selectedTime}</p>
                    </motion.div>

                    {/* Phone Card */}
                    <motion.div
                      className="bg-background/50 backdrop-blur-sm border border-primary/20 p-6 rounded-lg relative overflow-hidden group"
                      whileHover={{ scale: 1.02, borderColor: 'hsl(var(--primary))' }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                      <Phone className="w-5 h-5 text-primary mb-2" />
                      <p className="text-xs uppercase letter-spacing-wide text-muted-foreground mb-1">Contact</p>
                      <p className="font-body text-lg font-medium text-foreground">{formData.phone}</p>
                    </motion.div>
                  </motion.div>

                  {/* Confirmation Message */}
                  <motion.div
                    className="bg-primary/10 border border-primary/30 rounded-lg p-6 mb-8"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-foreground font-body mb-1">
                          A confirmation SMS has been sent to <span className="text-primary font-semibold">{formData.phone}</span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Please arrive 5 minutes early. We can't wait to see you!
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                  >
                    <MagneticButton>
                      <motion.button
                        onClick={() => {
                          setIsSubmitted(false);
                          setSelectedTime(null);
                          setSelectedDate("");
                          setFormData({ name: "", phone: "" });
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 bg-primary text-primary-foreground font-body uppercase letter-spacing-wide text-sm hover:shadow-[0_0_30px_rgba(201,162,77,0.4)] transition-all duration-300"
                      >
                        Book Another
                      </motion.button>
                    </MagneticButton>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 border border-primary text-primary font-body uppercase letter-spacing-wide text-sm hover:bg-primary/10 transition-all duration-300"
                    >
                      View Services
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
};
