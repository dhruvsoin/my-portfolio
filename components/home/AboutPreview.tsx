import Link from "next/link";
import { ArrowRight, MapPin, GraduationCap } from "lucide-react";
import Badge from "@/components/ui/Badge";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimatedWrapper from "@/components/ui/AnimatedWrapper";

const skills = [
    // Languages
    "Python", "SQL", "R (basics)", "Git",
    // Data Science & Visualization
    "Pandas", "NumPy", "Scikit-Learn", "PyTorch", "Seaborn", "Matplotlib", "Jupyter", "Power BI", "Excel",
    // Gen AI & LLMs
    "OpenAI", "Groq", "Llama-3", "LangChain", "LangGraph", "HuggingFace", "Transformers",
    "Sentence Transformers", "FAISS", "RAG Pipelines", "Agentic AI", "Prompt Engineering",
    // Databases & Vector Stores
    "MongoDB", "PostgreSQL", "Supabase", "Firebase", "Pinecone", "Redis",
    // Tools & Infra
    "Streamlit", "FastAPI", "Docker", "MLflow", "GitHub Actions", "AWS", "Vercel",
];

export default function AboutPreview() {
    return (
        <section className="max-w-5xl mx-auto px-6 py-24">
            <div className="grid md:grid-cols-2 gap-16 items-start">

                {/* Left — text */}
                <AnimatedWrapper direction="left">
                    <SectionHeader
                        title="About Me"
                        subtitle="Passionate data science student combining analytics and Generative AI."
                    />
                    <div className="space-y-4 text-muted text-base leading-relaxed mt-6">
                        {/* Quick info pills */}
                        <div className="flex flex-wrap gap-2 mb-5">
                            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-muted bg-surface border border-border px-3 py-1.5 rounded-full">
                                <MapPin size={11} /> Bengaluru, India
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-muted bg-surface border border-border px-3 py-1.5 rounded-full">
                                <GraduationCap size={11} /> Kristu Jayanti College
                            </span>
                        </div>
                        <p>
                            I&apos;m a{" "}
                            <span className="text-text font-semibold">
                                Data Science Student
                            </span>{" "}
                            currently pursuing my B.Sc at{" "}
                            <span className="text-text font-semibold">Kristu Jayanti College (Autonomous)</span>.
                        </p>
                        <p>
                            I build end-to-end data and AI solutions — transforming raw information
                            into actionable insights through analysis, dashboards, and AI-assisted
                            applications. Driven by curiosity and a passion for real-world impact.
                        </p>
                    </div>

                    <Link
                        href="/about"
                        id="about-preview-link"
                        className="mt-8 inline-flex items-center gap-2 text-text text-sm font-semibold border-b-2 border-text pb-0.5 hover:gap-3 transition-all duration-200 group"
                    >
                        More about me{" "}
                        <ArrowRight
                            size={14}
                            className="group-hover:translate-x-1 transition-transform duration-200"
                        />
                    </Link>
                </AnimatedWrapper>

                {/* Right — skills card */}
                <AnimatedWrapper direction="right" delay={0.15}>
                    <div className="p-8 border-4 border-text bg-surface space-y-6 shadow-[8px_8px_0px_var(--accent)]">

                        {/* Header row */}
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold text-muted tracking-widest uppercase font-mono">
                                Core Technologies
                            </p>
                            <span className="text-xs font-mono text-muted">{skills.length} tools</span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill) => (
                                <Badge key={skill} label={skill} />
                            ))}
                        </div>

                        {/* Footer note */}
                        <p className="text-[11px] text-muted/60 font-mono pt-2 border-t border-border/40">
                            + always learning more →
                        </p>
                    </div>
                </AnimatedWrapper>
            </div>
        </section>
    );
}
