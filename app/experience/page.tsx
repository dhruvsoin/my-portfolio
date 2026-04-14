import type { Metadata } from "next";
import { Briefcase, Calendar } from "lucide-react";
import { getAllExperience } from "@/lib/supabase/queries";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimatedWrapper from "@/components/ui/AnimatedWrapper";
import { formatDate } from "@/utils/formatDate";

export const metadata: Metadata = {
    title: "Experience",
    description: "Work experience, internships, and professional roles of Dhruv Soin.",
};

export const revalidate = 3600;

export default async function ExperiencePage() {
    const experiences = await getAllExperience();

    return (
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
            {/* Page header */}
            <AnimatedWrapper>
                <SectionHeader
                    title="Experience"
                    subtitle="Roles, internships, and professional engagements."
                />
            </AnimatedWrapper>

            {experiences.length === 0 ? (
                <AnimatedWrapper>
                    <div className="mt-16 text-center py-20 border border-border rounded-2xl bg-surface">
                        <p className="text-muted text-lg font-mono">Experience coming soon.</p>
                    </div>
                </AnimatedWrapper>
            ) : (
                <div className="relative mt-4">
                    {/* Vertical timeline line */}
                    <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border/50 hidden sm:block" />

                    <div className="flex flex-col gap-10">
                        {experiences.map((exp, i) => (
                            <AnimatedWrapper key={exp.id} delay={i * 0.08} direction="left">
                                <div className="sm:pl-10 relative">
                                    {/* Timeline dot */}
                                    <div className="hidden sm:block absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-accent border-2 border-bg" />

                                    <div className="p-6 border-2 border-border bg-surface hover:border-accent hover:shadow-[4px_4px_0px_var(--accent)] transition-all duration-300">
                                        {/* Role + company */}
                                        <div className="flex items-start justify-between gap-3 mb-1">
                                            <div>
                                                <h3
                                                    className="text-lg font-bold text-text leading-snug"
                                                    style={{ fontFamily: "var(--font-heading)" }}
                                                >
                                                    {exp.role}
                                                </h3>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <Briefcase size={12} className="text-accent" />
                                                    <span className="text-sm font-semibold text-accent">
                                                        {exp.company}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Date */}
                                        <div className="flex items-center gap-1.5 text-xs text-muted font-mono mt-2 mb-4">
                                            <Calendar size={11} />
                                            <span>
                                                {formatDate(exp.start_date)} —{" "}
                                                {exp.end_date ? formatDate(exp.end_date) : "Present"}
                                            </span>
                                        </div>

                                        {/* Description */}
                                        <p className="text-muted text-sm leading-relaxed">
                                            {exp.description}
                                        </p>
                                    </div>
                                </div>
                            </AnimatedWrapper>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
