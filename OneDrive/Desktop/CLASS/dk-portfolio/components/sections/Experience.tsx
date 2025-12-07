"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
    {
        title: "Full-Stack Developer Intern",
        company: "VCODEZ Technologies",
        period: "Jan 2025 – Mar 2025",
        location: "Chennai, India",
        description: "Developed scalable backend APIs and optimized system performance.",
        achievements: [
            "Developed scalable backend APIs using Python (FastAPI) and Flask/Django.",
            "Improved API response time by ~30% through query & caching optimizations.",
            "Integrated frontend React components with backend endpoints.",
            "Supported deployment workflows and automated ETL tasks.",
        ],
    },
    {
        title: "Independent AI Projects (Personal)",
  company: "Self-Directed",
  period: "2023 – Present",
  location: "Remote / India",
  description: "Self-directed development of AI-driven tools and full-stack projects to deepen practical knowledge of LLMs, retrieval systems, and backend engineering. Focused on production-ready integrations, secure data handling, and automation workflows.",
  achievements: [
    "Designed and implemented Retrieval-Augmented Generation (RAG) pipelines for document search and context-aware responses using LangChain and vector stores.",
    "Built an AI-powered resume analyzer that extracts keywords, generates similarity scores, and suggests improvements using embeddings and FastAPI for model serving.",
    "Developed automation scripts and ETL pipelines to preprocess large datasets, improving data readiness for ML tasks and reducing manual work.",
    "Integrated OpenAI APIs and LLM chains into web applications for interactive insights, ensuring prompt engineering best practices and safe data handling.",
    "Packaged and deployed multiple projects as production-capable demos (Docker / Vercel) to validate end-to-end workflows and user experience."
        ],
    },
];

export function Experience() {
    const sectionRef = React.useRef(null);

    React.useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate Timeline Line
            gsap.from(".timeline-line", {
                scrollTrigger: {
                    trigger: ".experience-container",
                    start: "top 80%",
                    end: "bottom 80%",
                    scrub: 1,
                },
                height: 0,
                ease: "none"
            });

            // Animate Experience Cards
            const cards = gsap.utils.toArray(".experience-card");
            cards.forEach((card: any, i) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    opacity: 0,
                    x: i % 2 === 0 ? -50 : 50, // Alternate left/right entrance simulation
                    duration: 0.8,
                    ease: "power3.out"
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <Section id="experience" className="bg-muted/5" ref={sectionRef}>
            <div className="container mx-auto px-6 max-w-[1000px]">
                <Reveal width="100%">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text">
                            Professional <span className="text-accent">Experience</span>
                        </h2>
                        <p className="text-subtext max-w-xl mx-auto">
                            My journey in software development and AI engineering.
                        </p>
                    </div>
                </Reveal>

                <div className="experience-container relative ml-3 md:ml-6 pl-8 md:pl-12 py-4">
                    {/* Static Background Line */}
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent/20" />
                    
                    {/* Animated Progress Line */}
                    <div className="timeline-line absolute left-0 top-0 w-0.5 bg-accent origin-top" />

                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <div key={index} className="experience-card relative">
                                {/* Timeline Dot */}
                                <div className="absolute -left-[41px] md:-left-[57px] top-0 w-6 h-6 rounded-full bg-bg border-2 border-accent flex items-center justify-center z-10">
                                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                </div>

                                <Card className="p-6 md:p-8 relative hover:border-accent/50 transition-colors">
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-2">
                                        <div>
                                            <h3 className="text-xl font-bold text-text flex items-center gap-2">
                                                <Briefcase className="w-4 h-4 text-accent" />
                                                {exp.title}
                                            </h3>
                                            <p className="text-lg text-accent-2 font-medium">{exp.company}</p>
                                        </div>
                                        <div className="text-sm text-subtext flex flex-col items-start md:items-end gap-1">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" /> {exp.period}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-3 h-3" /> {exp.location}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-subtext mb-4 italic">{exp.description}</p>

                                    <ul className="space-y-2">
                                        {exp.achievements.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-subtext/90">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
}
