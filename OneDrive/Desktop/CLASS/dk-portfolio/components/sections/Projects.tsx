"use client";

"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";

const projects = [
    {
        title: "RVM Rideway",
        role: "Frontend Developer — UI & API Integration",
        description: "Full-featured cab booking MVP with real-time tracking and booking management.",
        tags: ["React", "Node.js", "MongoDB", "Google Maps API", "JWT"],
        live: "https://rvm-rideway-mvp.vercel.app/",
        github: "https://github.com/DINESHREX/rvmrideway",
        image: "/thumbnails/rvm-rideway.png",
        featured: true,
    },
    {
        title: "AI Insight Dashboard",
        role: "Frontend Developer — Dashboard UI & AI API Integration",
        description: "AI-powered business analytics platform providing actionable insights from data.",
        tags: ["React", "FastAPI", "Chart.js", "OpenAI"],
        live: "https://aiinsightdashboard.vercel.app/",
        github: "https://github.com/DINESHREX/ai_insight_dashboard",
        image: "/thumbnails/ai-insight-dashboard.png",
        featured: true,
    },
    {
        title: "Hidden Safety Vault",
        role: "Full-Stack Developer — Backend & Security",
        description: "AES-encrypted hidden drive vault for secure local file storage.",
        tags: ["Python", "PyQt", "AES", "Cryptography"],
        live: null,
        github: "https://github.com/DINESHREX/HIDDEN-DRIVE-VAULT",
        image: "/thumbnails/hidden-safety-vault.png",
        featured: false,
    },
    {
        title: "Resume Matcher",
        role: "Full-Stack Developer — Backend ML Integration",
        description: "AI tool analyzing resumes against job descriptions to provide optimization tips.",
        tags: ["React", "FastAPI", "NLP", "Spacy"],
        live: "https://frontend-eight-tau-86.vercel.app/",
        github: "https://github.com/DINESHREX/Resumebuilder",
        image: "/thumbnails/resume-matcher.png",
        featured: false,
    },
    {
        title: "Business Landing Page",
        role: "Full-Stack Developer — UI/UX & Deployment",
        description: "High-conversion marketing website with modern animations and SEO optimization.",
        tags: ["React", "Tailwind CSS"],
        live: "https://business-landing-pro.vercel.app/",
        github: "https://github.com/DINESHREX/business-landing-page",
        image: "/thumbnails/business-landing-page.png",
        featured: false,
    },
    {
        title: "Portfolio",
        role: "Creator — Portfolio Design & Animations",
        description: "Personal portfolio site showcasing creative animations and GSAP interactions.",
        tags: ["React", "Tailwind", "GSAP"],
        live: "https://radi-tech.vercel.app/",
        github: "https://github.com/DINESHREX/portfolio",
        image: "/thumbnails/portfolio-v1.png",
        featured: false,
    },
];

export function Projects() {
    return (
        <Section id="projects">
            <div className="container mx-auto px-6 max-w-[1200px]">
                <Reveal>
                    <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text">
                                Featured <span className="text-accent">Projects</span>
                            </h2>
                            <p className="text-subtext max-w-xl">
                                A selection of projects demonstrating my expertise in full-stack development and AI integration.
                            </p>
                        </div>
                        <Magnetic>
                            <Button variant="outline" className="shrink-0" href="https://github.com/DINESHREX" target="_blank">
                                View All on GitHub <Github className="ml-2 w-4 h-4" />
                            </Button>
                        </Magnetic>
                    </div>
                </Reveal>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, scale: 0.96 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="h-full"
                        >
                            <Card
                                hoverEffect
                                className="flex flex-col h-full group overflow-hidden"
                            >


                                <h3 className="text-xl font-bold text-text mb-1 group-hover:text-accent transition-colors">
                                    {project.title}
                                </h3>

                                <p className="text-xs font-medium text-accent-2 mb-3">
                                    {project.role}
                                </p>

                                <p className="text-subtext text-sm mb-6 flex-grow">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-6 overflow-hidden">
                                    {project.tags.map((tag, i) => (
                                        <motion.span
                                            key={tag}
                                            className="pill"
                                            initial={{ y: 0 }}
                                            whileHover={{ y: -2 }}
                                            // Mobile graceful degradation: always visible, subtle animation on hover
                                            variants={{
                                                hover: { y: -5, transition: { delay: i * 0.05 } }
                                            }}
                                        >
                                            {tag}
                                        </motion.span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-3 mt-auto">
                                    {project.live && (
                                        <Magnetic>
                                            <Button size="sm" variant="primary" className="flex-1 btn-accent w-full group/btn" href={project.live} target="_blank" rel="noopener noreferrer">
                                                Live Demo <ExternalLink className="ml-2 w-3 h-3 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                                            </Button>
                                        </Magnetic>
                                    )}
                                    <Magnetic>
                                        <Button size="sm" variant="ghost" className="flex-1 btn-ghost w-full group/btn" href={project.github} target="_blank" rel="noopener noreferrer">
                                            Code <Github className="ml-2 w-3 h-3 transition-transform group-hover/btn:rotate-12" />
                                        </Button>
                                    </Magnetic>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
