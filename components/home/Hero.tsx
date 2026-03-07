"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Github, Mail } from "lucide-react";

const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

            {/* ── Background decoration ───────────────────────────────── */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                {/* Radial glow */}
                <div
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-[0.07]"
                    style={{
                        background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
                        filter: "blur(60px)",
                    }}
                />
                {/* Dot grid */}
                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle, #94a3b8 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
                {/* Top-left accent line */}
                <div className="absolute top-1/4 left-8 w-px h-32 bg-gradient-to-b from-transparent via-accent/30 to-transparent" />
                {/* Bottom-right accent line */}
                <div className="absolute bottom-1/4 right-8 w-px h-32 bg-gradient-to-b from-transparent via-accent/30 to-transparent" />
            </div>

            {/* ── Content ─────────────────────────────────────────────── */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-20 text-center">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="space-y-7"
                >
                    {/* Status badge */}
                    <motion.div variants={item}>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-accent text-sm font-mono">
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                            Open to opportunities
                        </span>
                    </motion.div>

                    {/* Heading */}
                    <motion.div variants={item} className="space-y-1">
                        <p className="text-muted text-lg sm:text-xl tracking-wide">
                            Hi, I&apos;m
                        </p>
                        <h1
                            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-none"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            <span className="gradient-text">Dhruv Soin</span>
                        </h1>
                    </motion.div>

                    {/* Subtitle */}
                    <motion.div variants={item}>
                        <p
                            className="text-xl sm:text-2xl font-semibold"
                            style={{
                                fontFamily: "var(--font-heading)",
                                color: "rgba(229,231,235,0.75)",
                            }}
                        >
                            AI &amp; Data Science Builder
                        </p>
                    </motion.div>

                    {/* Description */}
                    <motion.div variants={item}>
                        <p className="text-muted text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
                            I build AI tools, data analysis systems, and intelligent
                            assistants that transform raw information into useful insights.
                        </p>
                    </motion.div>

                    {/* CTA buttons */}
                    <motion.div
                        variants={item}
                        className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
                    >
                        <Link
                            href="/projects"
                            id="hero-view-projects"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white font-semibold text-sm hover:bg-accent-hover transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-accent/20"
                        >
                            View Projects <ArrowRight size={15} />
                        </Link>
                        <Link
                            href="https://github.com/dhruvsoin"
                            target="_blank"
                            rel="noopener noreferrer"
                            id="hero-github"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-muted hover:text-text hover:border-accent/50 font-medium text-sm transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
                        >
                            <Github size={15} /> GitHub
                        </Link>
                        <Link
                            href="/contact"
                            id="hero-contact"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-muted hover:text-text hover:border-accent/50 font-medium text-sm transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
                        >
                            <Mail size={15} /> Contact
                        </Link>
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div
                        variants={item}
                        className="pt-16 flex flex-col items-center gap-2"
                    >
                        <span className="text-[10px] font-mono text-muted/30 uppercase tracking-widest">
                            Scroll
                        </span>
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                            className="w-px h-10 bg-gradient-to-b from-accent/30 to-transparent"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
