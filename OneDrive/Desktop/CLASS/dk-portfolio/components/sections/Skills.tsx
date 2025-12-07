"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import {
    Cpu,
    Database,
    Layout,
    Terminal,
    Server,
    Code2,
    BrainCircuit,
    Wrench
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
    {
        category: "AI & LLM",
        icon: <BrainCircuit className="w-6 h-6 text-accent" />,
        skills: ["OpenAI API", "LangChain", "RAG Pipelines", "Hugging Face", "Prompt Engineering", "Fine-tuning"],
    },
    {
        category: "Backend Development",
        icon: <Server className="w-6 h-6 text-accent-2" />,
        skills: ["Python", "FastAPI", "Node.js", "Django", "REST APIs", "Microservices"],
    },
    {
        category: "Frontend Engineering",
        icon: <Layout className="w-6 h-6 text-success" />,
        skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"],
    },
    {
        category: "Database & Tools",
        icon: <Database className="w-6 h-6 text-warning" />, // Warning color not defined, using text-accent or similar
        skills: ["PostgreSQL", "MongoDB", "Redis", "Docker", "Git", "AWS"],
    },
];

export function Skills() {
    const sectionRef = React.useRef(null);
    const triggerRef = React.useRef(null);

    React.useEffect(() => {
        const ctx = gsap.context(() => {


            // Animate Progress Bars
            const progressBars = gsap.utils.toArray(".progress-bar-container");
            progressBars.forEach((bar: any) => {
                const width = bar.getAttribute("data-width");
                const progressLine = bar.querySelector(".progress-line");
                const percentageText = bar.querySelector(".percentage-text");

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: bar,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                });

                tl.to(progressLine, {
                    width: `${width}%`,
                    duration: 1.5,
                    ease: "power2.out"
                })
                .to(percentageText, {
                    innerText: width,
                    snap: { innerText: 1 },
                    duration: 1.5,
                    ease: "power2.out",
                    onUpdate: function() {
                        percentageText.innerHTML = Math.round(this.targets()[0].innerText) + "%";
                    }
                }, "<");
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const coreSkills = [
        { name: "Python & Backend", level: 95 },
        { name: "AI & LLM Integration", level: 90 },
        { name: "React & Frontend", level: 88 },
        { name: "Cloud & DevOps", level: 85 }
    ];

    return (
        <Section id="skills" className="bg-bg/50" ref={sectionRef}>
            <div className="container mx-auto px-6 max-w-[1200px]">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text">
                        Technical <span className="text-accent">Arsenal</span>
                    </h2>
                    <p className="text-subtext max-w-2xl mx-auto">
                        A comprehensive toolkit I use to build scalable, intelligent, and performant applications.
                    </p>
                </div>

                {/* Skill Cards Grid */}
                <div className="skills-grid grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {skillGroups.map((group, index) => (
                        <motion.div
                            key={group.category}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="h-full"
                        >
                            <Card
                                hoverEffect
                                className="h-full border-t-2 border-t-transparent hover:border-t-accent transition-colors"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 rounded-lg bg-accent/10">
                                        {group.icon}
                                    </div>
                                    <h3 className="font-bold text-lg text-text">{group.category}</h3>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {group.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1 text-xs font-medium rounded-full bg-muted/10 text-subtext border border-glass-border hover:border-accent/50 hover:text-accent transition-colors cursor-default"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Progress Bars Section */}
                <div className="max-w-3xl mx-auto">
                    <h3 className="text-2xl font-bold mb-8 text-center text-text">Core Competencies</h3>
                    <div className="space-y-8">
                        {coreSkills.map((skill) => (
                            <div key={skill.name} className="progress-bar-container" data-width={skill.level}>
                                <div className="flex justify-between mb-2">
                                    <span className="font-medium text-text">{skill.name}</span>
                                    <span className="percentage-text font-bold text-accent">0%</span>
                                </div>
                                <div className="h-2 bg-muted/20 rounded-full overflow-hidden">
                                    <div className="progress-line h-full bg-gradient-to-r from-accent to-accent-2 w-0 rounded-full relative">
                                        <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 blur-[2px]" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
}
