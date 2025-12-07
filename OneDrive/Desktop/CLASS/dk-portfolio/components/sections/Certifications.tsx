"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const certifications = [
    {
        name: "AWS Data Science Certification",
        issuer: "AWS",
        date: "2024",
        link: "#",
    },
    {
        name: "IoT & Digital Transformation",
        issuer: "Cisco Networking Academy",
        date: "2025",
        link: "#",
    },
];

export function Certifications() {
    return (
        <Section id="certifications">
            <div className="container mx-auto px-6 max-w-[1000px]">
                <Reveal width="100%">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text">
                            Certifications & <span className="text-accent">Awards</span>
                        </h2>
                    </div>
                </Reveal>

                <div className="flex flex-wrap justify-center gap-4">
                    {certifications.map((cert, index) => (
                        <motion.a
                            key={index}
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.12, duration: 0.5, ease: "backOut" }}
                            whileHover={{ y: -4, boxShadow: "0 10px 30px -10px rgba(6, 182, 212, 0.3)" }}
                            className="glass px-6 py-4 rounded-xl flex items-center gap-4 hover:border-accent/50 transition-all group cursor-pointer border border-glass-border bg-card/50"
                        >
                            <div className="p-2 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors">
                                <Award className="w-6 h-6 text-accent group-hover:scale-110 transition-transform duration-300" />
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-text text-base group-hover:text-accent transition-colors">
                                    {cert.name}
                                </p>
                                <p className="text-sm text-subtext mt-0.5">
                                    {cert.issuer} • {cert.date}
                                </p>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </Section>
    );
}
