"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Code2, Sparkles, Zap, Brain } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export function Hero() {
    const [currentRole, setCurrentRole] = React.useState(0);

    const roles = [
        "AI Automation Engineer",
        "Python Backend Developer",
        "LLM Integration Specialist",
        "Full-Stack Problem Solver"
    ];

    const highlights = [
        { icon: Code2, label: "10+ Projects", color: "from-cyan-500 to-blue-500" },
        { icon: Brain, label: "AI/ML Expert", color: "from-purple-500 to-pink-500" },
        { icon: Zap, label: "Fast Delivery", color: "from-orange-500 to-red-500" },
        { icon: Sparkles, label: "Clean Code", color: "from-green-500 to-emerald-500" }
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
            className="min-h-screen flex items-center justify-center overflow-hidden pt-32 md:pt-64 pb-20 relative"
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
        >
            {/* Simple Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-bg to-bg opacity-50" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-5xl mx-auto">
                    {/* Greeting with stagger animation */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-8"
                    >
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.div
                                animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                            >
                                👋
                            </motion.div>
                            <span className="text-accent font-medium tracking-wide text-sm">
                                HELLO, I'M DINESH KUMAR S
                            </span>
                        </motion.div>

                        {/* Main Title with word animation */}
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
                            {["Building", "Intelligent", "Digital", "Experiences"].map((word, i) => (
                                <motion.span
                                    key={word}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: i * 0.1 }}
                                    className={`inline-block mx-2 ${word === "Intelligent"
                                        ? "bg-gradient-to-r from-accent via-accent-2 to-accent bg-clip-text text-transparent animate-gradient"
                                        : "text-text"
                                        }`}
                                >
                                    {word}
                                    {i === 1 && <br className="hidden md:block" />}
                                </motion.span>
                            ))}
                        </h1>

                        {/* Rotating Role Description */}
                        <div className="h-16 md:h-20 flex items-center justify-center mb-8">
                            <motion.p
                                key={currentRole}
                                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                                transition={{ duration: 0.5 }}
                                className="text-subtext text-xl md:text-3xl font-semibold max-w-3xl mx-auto"
                            >
                                <span className="text-accent">{roles[currentRole]}</span>
                                <br />
                                <span className="text-base md:text-lg font-normal mt-2 inline-block">
                                    Specializing in scalable web applications & LLM integration
                                </span>
                            </motion.p>
                        </div>
                    </motion.div>

                    {/* Highlight Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto"
                    >
                        {highlights.map((item, i) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="glass-card p-4 rounded-xl border border-accent/20 group cursor-pointer"
                            >
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} p-2 mb-2 mx-auto group-hover:scale-110 transition-transform`}>
                                    <item.icon className="w-full h-full text-white" />
                                </div>
                                <p className="text-sm font-medium text-text/80 group-hover:text-text transition-colors">
                                    {item.label}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button size="lg" className="group w-full sm:w-auto btn-accent" href="#projects">
                                View Projects
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                variant="ghost"
                                size="lg"
                                className="w-full sm:w-auto btn-ghost"
                                href="/DK FINAL CIT.pdf"
                                download="DK_FINAL_CIT.pdf"
                                target="_blank"
                            >
                                Download Resume
                                <Download className="ml-2 h-4 w-4" />
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </Section>
    );
}
