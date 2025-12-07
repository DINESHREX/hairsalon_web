"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);
    const [activeSection, setActiveSection] = React.useState("");

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Active section spy
    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: "-50% 0px -50% 0px" } // Center of viewport
        );

        navLinks.forEach((link) => {
            const section = document.querySelector(link.href);
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled 
                    ? "bg-bg/80 backdrop-blur-md border-b border-glass-border py-3 shadow-lg shadow-accent/5" 
                    : "bg-transparent py-5"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between max-w-[1400px]">
                <Link href="/" className="relative group flex items-center justify-center">
                    <div className="relative w-12 h-12 transition-transform duration-300 scale-[1.8] md:scale-[2.0] group-hover:scale-[2.0] md:group-hover:scale-[2.2]">
                        <Image
                            src="/DK-removebg-preview.png"
                            alt="DK Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.href.substring(1);
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "relative px-4 py-2 text-sm font-medium transition-colors rounded-full",
                                    isActive ? "text-accent" : "text-subtext hover:text-text"
                                )}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="activeNav"
                                        className="absolute inset-0 bg-accent/10 rounded-full -z-10"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                                {link.name}
                                {!isActive && (
                                    <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full opacity-0 transition-opacity group-hover:opacity-100" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Mobile Toggle */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-text hover:text-accent transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-bg/95 backdrop-blur-xl border-b border-glass-border overflow-hidden"
                    >
                        <nav className="flex flex-col p-6 gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "text-lg font-medium transition-colors",
                                        activeSection === link.href.substring(1) ? "text-accent" : "text-subtext hover:text-text"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
