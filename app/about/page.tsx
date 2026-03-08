import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Download, Github, Linkedin, Mail, GraduationCap, MapPin, Heart, Code2, BookOpen, ArrowRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimatedWrapper from "@/components/ui/AnimatedWrapper";
import GitHubStats from "@/components/github/GitHubStats";

export const metadata: Metadata = {
    title: "About",
    description:
        "Learn more about Dhruv Soin — a Data Science student passionate about AI, Gen AI, and building data-driven solutions.",
};

const skills = {
    "Languages": ["Python", "SQL", "R (basics)", "Git"],
    "Data Science & Visualization": ["Pandas", "NumPy", "Scikit-Learn", "PyTorch", "Seaborn", "Matplotlib", "Jupyter", "Power BI", "Excel"],
    "Gen AI & LLMs": ["OpenAI", "Groq", "Llama-3", "LangChain", "LangGraph", "HuggingFace", "Transformers", "Sentence Transformers", "FAISS", "RAG Pipelines", "Agentic AI", "Prompt Engineering"],
    "Databases & Vector Stores": ["MongoDB", "PostgreSQL", "Supabase", "Firebase", "Pinecone", "Redis"],
    "Tools & Infra": ["Streamlit", "FastAPI", "Docker", "MLflow", "GitHub Actions", "AWS", "Vercel"],
};

const interests = [
    "Generative AI & LLMs",
    "Data Storytelling",
    "AI Product Building",
    "Open Source",
    "Photography",
    "Badminton",
];

const education = {
    degree: "B.Sc in Data Science",
    institution: "Kristu Jayanti College (Autonomous)",
    location: "Bengaluru, Karnataka",
    year: "2023 – Present",
};

export default function AboutPage() {
    return (
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">

            {/* ── Hero intro ────────────────────────────────────────── */}
            <AnimatedWrapper>
                <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
                    <div>
                        <p className="text-xs font-mono text-muted tracking-widest uppercase mb-3">
                            About Me
                        </p>
                        <h1
                            className="text-5xl sm:text-6xl font-bold text-text tracking-tighter leading-[0.95] mb-6"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            I build with data
                            <br />
                            and <span className="text-accent">AI.</span>
                        </h1>
                        <div className="flex flex-wrap gap-3">
                            <a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-surface text-text font-bold text-sm border-2 border-accent shadow-[4px_4px_0px_var(--accent)] hover:shadow-[6px_6px_0px_var(--accent)] hover:-translate-y-1 transition-all duration-300"
                            >
                                <Download size={15} /> Resume
                            </a>
                            <a
                                href="https://github.com/dhruvsoin"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-bg border-2 border-border text-text font-bold text-sm hover:border-accent hover:-translate-y-1 shadow-[4px_4px_0px_transparent] hover:shadow-[4px_4px_0px_var(--accent)] transition-all duration-300"
                            >
                                <Github size={15} /> GitHub
                            </a>
                            <a
                                href="https://www.linkedin.com/in/dhruv-soin"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-bg border-2 border-border text-text font-bold text-sm hover:border-accent hover:-translate-y-1 shadow-[4px_4px_0px_transparent] hover:shadow-[4px_4px_0px_var(--accent)] transition-all duration-300"
                            >
                                <Linkedin size={15} /> LinkedIn
                            </a>
                        </div>
                    </div>

                    {/* Quick info card */}
                    <div className="p-7 border-2 border-border bg-surface space-y-4">
                        <div className="flex items-start gap-3">
                            <GraduationCap size={16} className="text-accent mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-semibold text-text">{education.degree}</p>
                                <p className="text-xs text-muted">{education.institution}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin size={16} className="text-accent flex-shrink-0" />
                            <p className="text-sm text-muted">{education.location}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <BookOpen size={16} className="text-accent flex-shrink-0" />
                            <p className="text-sm text-muted">{education.year}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Code2 size={16} className="text-accent flex-shrink-0" />
                            <p className="text-sm text-muted">Open to internships & collaborations</p>
                        </div>
                        <div className="pt-2 border-t border-border/40">
                            <p className="text-xs font-mono text-muted">
                                📧 info.dhruvsoin@gmail.com
                            </p>
                        </div>
                    </div>
                </div>
            </AnimatedWrapper>

            <div className="h-px w-full bg-border/30 mb-20" />

            {/* ── Story ─────────────────────────────────────────────── */}
            <AnimatedWrapper delay={0.1}>
                <div className="grid md:grid-cols-[1fr_2fr] gap-10 mb-20">
                    <div>
                        <SectionHeader title="My Story" />
                    </div>
                    <div className="space-y-5 text-muted text-base leading-relaxed">
                        <p>
                            I&apos;m a <span className="text-text font-semibold">Data Science student</span> at Kristu Jayanti College,
                            Bengaluru. From an early age, I was fascinated by patterns — whether in mathematics, sports statistics, or everyday data.
                            That curiosity naturally led me to data science.
                        </p>
                        <p>
                            Over time my focus shifted toward <span className="text-text font-semibold">Generative AI and LLMs</span>.
                            I&apos;ve built RAG pipelines, AI-powered assistants, lab report analyzers,
                            and intelligent dashboards — all aimed at turning raw data into something genuinely useful.
                        </p>
                        <p>
                            I believe the best AI products aren&apos;t just technically impressive — they&apos;re clear,
                            reliable, and solve real problems for real people. That&apos;s what I build towards.
                        </p>
                        <p>
                            When I&apos;m not coding, you&apos;ll find me playing badminton, taking photos, or
                            exploring what&apos;s new in the AI space.
                        </p>
                    </div>
                </div>
            </AnimatedWrapper>

            <div className="h-px w-full bg-border/30 mb-20" />

            {/* ── Skills ────────────────────────────────────────────── */}
            <AnimatedWrapper delay={0.1}>
                <SectionHeader
                    title="Skills & Stack"
                    subtitle="Tools and technologies I work with."
                />
                <div className="grid sm:grid-cols-2 gap-6 mt-2">
                    {Object.entries(skills).map(([category, items]) => (
                        <div key={category} className="p-6 border border-border bg-surface">
                            <p className="text-xs font-mono text-accent tracking-widest uppercase mb-4">
                                {category}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {items.map((skill) => (
                                    <Badge key={skill} label={skill} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </AnimatedWrapper>

            <div className="h-px w-full bg-border/30 my-20" />

            {/* ── Interests ─────────────────────────────────────────── */}
            <AnimatedWrapper delay={0.1}>
                <SectionHeader title="Interests" />
                <div className="flex flex-wrap gap-3 mt-2">
                    {interests.map((interest) => (
                        <span
                            key={interest}
                            className="inline-flex items-center gap-2 px-4 py-2 border border-border bg-surface text-sm text-muted font-mono"
                        >
                            <Heart size={11} className="text-accent" />
                            {interest}
                        </span>
                    ))}
                </div>
            </AnimatedWrapper>

            <div className="h-px w-full bg-border/30 my-20" />

            {/* ── GitHub ────────────────────────────────────────────── */}
            <AnimatedWrapper delay={0.1}>
                <SectionHeader
                    title="GitHub"
                    subtitle="Open source activity and public repositories."
                />
                <Suspense
                    fallback={
                        <div className="p-8 border border-border bg-surface text-center">
                            <p className="text-muted text-sm font-mono animate-pulse">Loading GitHub stats...</p>
                        </div>
                    }
                >
                    <GitHubStats />
                </Suspense>
            </AnimatedWrapper>

            <div className="h-px w-full bg-border/30 my-20" />
            <AnimatedWrapper>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8 border-2 border-border bg-surface">
                    <div>
                        <p className="text-lg font-bold text-text" style={{ fontFamily: "var(--font-heading)" }}>
                            Want to work together?
                        </p>
                        <p className="text-muted text-sm mt-1">
                            I&apos;m open to internships, freelance projects, and collaborations.
                        </p>
                    </div>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-surface text-text font-bold text-sm border-2 border-accent shadow-[4px_4px_0px_var(--accent)] hover:shadow-[6px_6px_0px_var(--accent)] hover:-translate-y-1 transition-all duration-300 group flex-shrink-0"
                    >
                        <Mail size={15} /> Get in Touch
                        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                    </Link>
                </div>
            </AnimatedWrapper>
        </div>
    );
}
