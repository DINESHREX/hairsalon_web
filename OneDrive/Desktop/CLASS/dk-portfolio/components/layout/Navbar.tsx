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

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled ? "bg-bg/80 backdrop-blur-md border-b border-glass-border py-4" : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between max-w-[1400px]">
                <Link href="/" className="relative group flex items-center justify-center">
                    <div className="relative w-14 h-14 transition-transform duration-300 scale-[1.8] md:scale-[2.0] group-hover:scale-[2.0] md:group-hover:scale-[2.2]">
                        <Image
                            src="/DK-removebg-preview.png"
                            alt="DK Logo"
                            fill
                            className="object-contain"
                            style={{
                                filter: "brightness(0) saturate(100%) invert(66%) sepia(60%) saturate(5341%) hue-rotate(149deg) brightness(93%) contrast(93%) drop-shadow(0 0 5px rgba(6, 182, 212, 0.5))"
                            }}
                        />
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link, i) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-subtext hover:text-accent transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
                        </Link>
                    ))}
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
                                    className="text-lg font-medium text-subtext hover:text-accent transition-colors"
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
