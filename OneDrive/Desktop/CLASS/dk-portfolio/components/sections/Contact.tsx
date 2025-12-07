"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Loader2 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";

export function Contact() {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [lastSubmitTime, setLastSubmitTime] = React.useState(0);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        // Rate limiting (client-side check)
        const now = Date.now();
        if (now - lastSubmitTime < 2500) {
            return;
        }
        setLastSubmitTime(now);

        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            setIsSuccess(true);
            (e.target as HTMLFormElement).reset();
        } catch (err) {
            setError("Something went wrong. Please try again later.");
        } finally {
            setIsSubmitting(false);
            // Reset success message after 5 seconds
            setTimeout(() => setIsSuccess(false), 5000);
        }
    };

    return (
        <Section id="contact" className="bg-muted/5">
            <div className="container mx-auto px-2 md:px-6 max-w-[1200px]">
                <Reveal width="100%">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text">
                            Get in <span className="text-accent">Touch</span>
                        </h2>
                        <p className="text-subtext max-w-xl mx-auto">
                            Open to remote roles and freelance projects. Send a message and I will reply within 48 hours.
                        </p>
                    </div>
                </Reveal>

                <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-8 md:gap-12">
                    <Reveal delay={0.2} className="h-full">
                        <div className="space-y-6 h-full">
                            <Card className="p-6 flex items-start gap-4 h-full flex-col justify-center bg-card/30">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-lg bg-accent/10 text-accent">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-text mb-1">Email</h3>
                                        <a href="mailto:dineshkumars.work@gmail.com" className="text-subtext hover:text-accent transition-colors">
                                            dineshselvakumar0312@gmail.com
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-lg bg-accent/10 text-accent">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-text mb-1">Phone</h3>
                                        <a href="tel:+919876543210" className="text-subtext hover:text-accent transition-colors">
                                            +91 8072356094
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-lg bg-accent/10 text-accent">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-text mb-1">Location</h3>
                                        <p className="text-subtext">Chennai, India</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </Reveal>

                    <Reveal delay={0.4}>
                        <Card className="p-8 md:p-10 border-accent/10">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            className="w-full px-4 py-3 rounded-lg bg-bg/50 border border-glass-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-text placeholder:text-muted"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            className="w-full px-4 py-3 rounded-lg bg-bg/50 border border-glass-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-text placeholder:text-muted"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 rounded-lg bg-bg/50 border border-glass-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-text placeholder:text-muted resize-y min-h-[150px]"
                                        placeholder="How can I help you?"
                                    />
                                </div>

                                <Magnetic>
                                    <Button
                                        type="submit"
                                        className="w-full btn-accent"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <Send className="ml-2 h-4 w-4" />
                                            </>
                                        )}
                                    </Button>
                                </Magnetic>

                                {isSuccess && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-success text-sm text-center mt-2"
                                    >
                                        Message sent successfully!
                                    </motion.p>
                                )}
                                {error && (
                                    <motion.p
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ 
                                            opacity: 1, 
                                            x: [0, -10, 10, -10, 10, 0],
                                            transition: { duration: 0.5 } 
                                        }}
                                        className="text-red-500 text-sm text-center mt-2 font-medium"
                                    >
                                        {error}
                                    </motion.p>
                                )}
                            </form>
                        </Card>
                    </Reveal>
                </div>
            </div>
        </Section>
    );
}
