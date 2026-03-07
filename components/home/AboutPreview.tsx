import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimatedWrapper from "@/components/ui/AnimatedWrapper";

const skills = [
    "Python", "Machine Learning", "LangChain", "RAG",
    "Streamlit", "SQL", "Pandas", "Computer Vision",
    "Groq / LLM APIs", "Data Analysis", "FAISS", "Sentence Transformers",
];

const stats = [
    { label: "Projects Built", value: "8+" },
    { label: "Years Learning", value: "2+" },
    { label: "Tech Stack", value: "15+" },
];

export default function AboutPreview() {
    return (
        <section className="max-w-5xl mx-auto px-6 py-24">
            <div className="grid md:grid-cols-2 gap-12 items-start">

                {/* Left — text */}
                <AnimatedWrapper direction="left">
                    <SectionHeader
                        title="About Me"
                        subtitle="Passionate about turning data into decisions and AI into tools."
                    />
                    <div className="space-y-4 text-muted text-base leading-relaxed">
                        <p>
                            I&apos;m a{" "}
                            <span className="text-text font-medium">
                                Data Science & AI enthusiast
                            </span>{" "}
                            based in India, building real-world intelligent systems — from RAG
                            chatbots and LLM-powered assistants to data analytics dashboards and
                            computer vision projects.
                        </p>
                        <p>
                            I love the intersection of data and intelligence: taking raw,
                            messy information and making it useful through code.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="mt-8 flex gap-6">
                        {stats.map((s) => (
                            <div key={s.label}>
                                <p
                                    className="text-2xl font-bold text-text"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {s.value}
                                </p>
                                <p className="text-xs text-muted mt-0.5">{s.label}</p>
                            </div>
                        ))}
                    </div>

                    <Link
                        href="/about"
                        id="about-preview-link"
                        className="mt-8 inline-flex items-center gap-2 text-accent text-sm font-medium hover:gap-3 transition-all duration-200 group"
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
                    <div className="p-6 rounded-xl border border-border/60 bg-surface/40 space-y-4">
                        <p className="text-xs font-mono text-muted uppercase tracking-widest">
              // tech I work with
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill) => (
                                <Badge key={skill} label={skill} />
                            ))}
                        </div>
                    </div>
                </AnimatedWrapper>
            </div>
        </section>
    );
}
