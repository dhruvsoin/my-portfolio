"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Github, Mail, Cpu, Database, BrainCircuit } from "lucide-react";

const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const floatingIcons = [
    { Icon: Cpu, label: "ML Models", delay: 0 },
    { Icon: Database, label: "Data Systems", delay: 0.15 },
    { Icon: BrainCircuit, label: "Gen AI", delay: 0.3 },
];

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">

            {/* Subtle grid background */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage:
                        "linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                }}
            />

            {/* ── Content ─────────────────────────────────────────────── */}
            <div className="relative z-10 w-full px-6 md:px-16 pt-24 pb-20">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="space-y-7"
                >
                    {/* Status badge */}
                    <motion.div variants={item} className="flex">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-surface text-text text-sm font-medium shadow-sm">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-text opacity-40"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-text"></span>
                            </span>
                            Available for Opportunities
                        </div>
                    </motion.div>

                    {/* Heading */}
                    <motion.div variants={item} className="space-y-2 pt-4">
                        <p className="text-sm font-mono text-muted tracking-widest uppercase">
                            Hi, I&apos;m
                        </p>
                        <h1
                            className="text-6xl sm:text-7xl md:text-8xl lg:text-[120px] font-bold tracking-tighter leading-[0.9] text-text"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Dhruv Soin
                        </h1>
                    </motion.div>

                    {/* Subtitle */}
                    <motion.div variants={item} className="pt-2">
                        <p
                            className="text-xl sm:text-2xl lg:text-3xl font-semibold text-accent"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            Data & AI Enthusiast
                            <span className="text-border mx-3">|</span>
                            Builder
                        </p>
                    </motion.div>

                    {/* Description */}
                    <motion.div variants={item} className="max-w-xl">
                        <p className="text-muted text-base sm:text-lg leading-relaxed">
                            Passionate about leveraging AI and data to solve real-world problems.
                            I build end-to-end AI applications using Generative AI, RAG pipelines,
                            and modern data science tools.
                        </p>
                    </motion.div>

                    {/* Floating tech pills */}
                    <motion.div variants={item} className="flex flex-wrap gap-3 pt-1">
                        {floatingIcons.map(({ Icon, label }) => (
                            <div
                                key={label}
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-border text-xs font-mono text-muted"
                            >
                                <Icon size={12} />
                                {label}
                            </div>
                        ))}
                    </motion.div>

                    {/* CTA buttons */}
                    <motion.div
                        variants={item}
                        className="flex flex-col sm:flex-row items-start gap-4 pt-6"
                    >
                        <Link
                            href="/projects"
                            id="hero-view-projects"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-surface text-text font-bold text-sm hover:-translate-y-1 border-2 border-accent shadow-[4px_4px_0px_var(--accent)] hover:shadow-[6px_6px_0px_var(--accent)] transition-all duration-300 group"
                        >
                            View Projects
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                        </Link>
                        <Link
                            href="https://github.com/dhruvsoin"
                            target="_blank"
                            rel="noopener noreferrer"
                            id="hero-github"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-surface border-2 border-border text-text font-bold text-sm hover:border-accent hover:-translate-y-1 shadow-[4px_4px_0px_transparent] hover:shadow-[4px_4px_0px_var(--accent)] transition-all duration-300"
                        >
                            <Github size={18} /> GitHub
                        </Link>
                        <Link
                            href="/contact"
                            id="hero-contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-surface border-2 border-border text-text font-bold text-sm hover:border-accent hover:-translate-y-1 shadow-[4px_4px_0px_transparent] hover:shadow-[4px_4px_0px_var(--accent)] transition-all duration-300"
                        >
                            <Mail size={18} /> Contact
                        </Link>
                    </motion.div>

                    {/* Quick stats row */}
                    <motion.div
                        variants={item}
                        className="flex flex-wrap items-center gap-6 pt-4 border-t border-border/50 mt-6"
                    >
                        {[
                            { value: "8+", label: "Projects" },
                            { value: "15+", label: "Technologies" },
                            { value: "B.Sc", label: "Data Science" },
                        ].map((stat) => (
                            <div key={stat.label} className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-text" style={{ fontFamily: "var(--font-heading)" }}>
                                    {stat.value}
                                </span>
                                <span className="text-xs text-muted font-mono">{stat.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
