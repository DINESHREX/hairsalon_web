"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Loader2 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

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
            <div className="container mx-auto px-6 max-w-[1000px]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text">
                        Get in <span className="text-accent">Touch</span>
                    </h2>
                    <p className="text-subtext max-w-xl mx-auto">
                        Open to remote roles and freelance projects. Send a message and I will reply within 48 hours.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <Card className="p-6 flex items-start gap-4">
                            <div className="p-3 rounded-lg bg-accent/10 text-accent">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-text mb-1">Email</h3>
                                <a href="mailto:dineshkumars.work@gmail.com" className="text-subtext hover:text-accent transition-colors">
                                    dineshselvakumar0312@gmail.com
                                </a>
                            </div>
                        </Card>

                        <Card className="p-6 flex items-start gap-4">
                            <div className="p-3 rounded-lg bg-accent/10 text-accent">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-text mb-1">Phone</h3>
                                <a href="tel:+919876543210" className="text-subtext hover:text-accent transition-colors">
                                    +91 8072356094
                                </a>
                            </div>
                        </Card>

                        <Card className="p-6 flex items-start gap-4">
                            <div className="p-3 rounded-lg bg-accent/10 text-accent">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-text mb-1">Location</h3>
                                <p className="text-subtext">Chennai, India</p>
                            </div>
                        </Card>
                    </div>

                    <Card className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-text mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full px-4 py-2 rounded-lg bg-bg border border-glass-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-text placeholder:text-muted"
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-text mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full px-4 py-2 rounded-lg bg-bg border border-glass-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-text placeholder:text-muted"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-text mb-1">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={4}
                                    className="w-full px-4 py-2 rounded-lg bg-bg border border-glass-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-text placeholder:text-muted resize-none"
                                    placeholder="How can I help you?"
                                />
                            </div>

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
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-danger text-sm text-center mt-2"
                                >
                                    {error}
                                </motion.p>
                            )}
                        </form>
                    </Card>
                </div>
            </div>
        </Section>
    );
}
