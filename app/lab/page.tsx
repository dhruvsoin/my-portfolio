import type { Metadata } from "next";
import Link from "next/link";
import { FlaskConical, ExternalLink, Calendar } from "lucide-react";
import { getAllExperiments } from "@/lib/supabase/queries";
import Badge from "@/components/ui/Badge";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimatedWrapper from "@/components/ui/AnimatedWrapper";
import { formatDate } from "@/utils/formatDate";

export const metadata: Metadata = {
    title: "Lab",
    description: "A collection of experiments, side projects, and explorations by Dhruv Soin.",
};

export const revalidate = 3600;

export default async function LabPage() {
    const experiments = await getAllExperiments();

    return (
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
            {/* Page header */}
            <AnimatedWrapper>
                <div className="flex items-center gap-3 mb-2">
                    <FlaskConical size={20} className="text-accent flex-shrink-0" />
                    <SectionHeader
                        title="The Lab"
                        subtitle="Experiments, quick builds, and explorations. Not all projects need to be big."
                    />
                </div>
            </AnimatedWrapper>

            {experiments.length === 0 ? (
                <AnimatedWrapper>
                    <div className="mt-16 text-center py-20 border border-border rounded-2xl bg-surface">
                        <FlaskConical size={32} className="text-muted mx-auto mb-4" />
                        <p className="text-muted text-lg font-mono">Lab is brewing... check back soon.</p>
                    </div>
                </AnimatedWrapper>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {experiments.map((exp, i) => (
                        <AnimatedWrapper key={exp.id} delay={i * 0.07}>
                            <div className="h-full flex flex-col p-5 border border-border bg-surface hover:border-accent hover:shadow-[4px_4px_0px_var(--accent)] transition-all duration-300 group">
                                {/* Header */}
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <h3
                                        className="text-base font-bold text-text leading-snug group-hover:text-accent transition-colors duration-200"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        {exp.title}
                                    </h3>
                                    {exp.link && (
                                        <a
                                            href={exp.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="View experiment"
                                            className="flex-shrink-0 text-muted hover:text-accent transition-colors duration-200 mt-0.5"
                                        >
                                            <ExternalLink size={14} />
                                        </a>
                                    )}
                                </div>

                                {/* Description */}
                                <p className="text-muted text-sm leading-relaxed line-clamp-3 flex-1 mb-4">
                                    {exp.description}
                                </p>

                                {/* Tech stack */}
                                {exp.tech_stack && exp.tech_stack.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {exp.tech_stack.slice(0, 4).map((tech) => (
                                            <Badge key={tech} label={tech} />
                                        ))}
                                    </div>
                                )}

                                {/* Date */}
                                <div className="flex items-center gap-1.5 text-xs text-muted/60 font-mono pt-3 border-t border-border/40">
                                    <Calendar size={10} />
                                    <span>{formatDate(exp.date)}</span>
                                </div>
                            </div>
                        </AnimatedWrapper>
                    ))}
                </div>
            )}
        </div>
    );
}
