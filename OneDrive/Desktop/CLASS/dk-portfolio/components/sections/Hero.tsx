"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, Code2, Sparkles, Zap, Brain } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import Magnetic from "@/components/ui/Magnetic";

export function Hero() {
    const [currentRole, setCurrentRole] = React.useState(0);

    const roles = [
        "AI Automation Engineer",
        "Python Backend Developer",
        "LLM Integration Specialist",
        "Full-Stack Problem Solver"
    ];

    const highlights = [
        { icon: Code2, label: "10+ Projects", color: "text-blue-400" },
        { icon: Brain, label: "AI/ML Expert", color: "text-purple-400" },
        { icon: Zap, label: "Fast Delivery", color: "text-orange-400" },
        { icon: Sparkles, label: "Clean Code", color: "text-emerald-400" }
    ];

    // Auto-rotate roles
    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentRole((prev) => (prev + 1) % roles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Section
            className="min-h-screen flex items-center justify-center overflow-hidden relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            {/* Subtle Background Gradient - No Orbs */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/5 via-bg to-bg" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
                    
                    {/* Greeting Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/5 border border-accent/10 mb-8"
                    >
                        <span className="text-lg">👋</span>
                        <span className="text-accent font-medium tracking-wide text-xs md:text-sm uppercase">
                            Hello, I'm Dinesh Kumar S
                        </span>
                    </motion.div>

                    {/* Main Headline */}
                    <div className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 text-text leading-[1.15] flex flex-col items-center">
                        <div className="overflow-hidden">
                            <motion.span
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Custom ease for "calm" feel
                                className="inline-block"
                            >
                                Building
                            </motion.span>
                        </div>
                        <div className="overflow-hidden">
                            <motion.span
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                                className="inline-block"
                            >
                                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-[length:200%_auto] animate-shimmer">
                                    Intelligent
                                </span>
                            </motion.span>
                        </div>
                        <div className="overflow-hidden">
                            <motion.span
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                                className="inline-block"
                            >
                                Digital Experiences
                            </motion.span>
                        </div>
                    </div>

                    {/* Role & Subheadline */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.35 }} // 150ms after last headline part (0.2s)
                        className="max-w-2xl mx-auto mb-12 space-y-6"
                    >
                        <div className="h-8 overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={currentRole}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-lg md:text-xl font-medium text-accent/80"
                                >
                                    {roles[currentRole]}
                                </motion.p>
                            </AnimatePresence>
                        </div>
                        <p className="text-base text-subtext leading-relaxed max-w-lg mx-auto">
                            Specializing in scalable web applications & LLM integration. Bridging the gap between complex AI logic and intuitive user interfaces.
                        </p>
                    </motion.div>

                    {/* Feature Cards - Minimalist */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12"
                    >
                        {highlights.map((item, i) => (
                            <div
                                key={item.label}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/20 border border-white/5"
                            >
                                <item.icon className={`w-4 h-4 ${item.color}`} />
                                <span className="text-xs md:text-sm font-medium text-subtext">{item.label}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
                    >
                        <Magnetic>
                            <motion.div whileTap={{ scale: 0.95 }}>
                                <Button size="lg" className="w-full sm:w-auto btn-accent min-w-[160px] hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-shadow duration-300" href="#projects">
                                    View Projects
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </motion.div>
                        </Magnetic>
                        <Magnetic>
                            <motion.div whileTap={{ scale: 0.95 }}>
                                <Button
                                    variant="ghost"
                                    size="lg"
                                    className="w-full sm:w-auto btn-ghost min-w-[160px]"
                                    href="/DK FINAL CIT.pdf"
                                    download="DK_FINAL_CIT.pdf"
                                    target="_blank"
                                >
                                    Download Resume
                                    <Download className="ml-2 h-4 w-4" />
                                </Button>
                            </motion.div>
                        </Magnetic>
                    </motion.div>
                </div>
            </div>
        </Section>
    );
}
