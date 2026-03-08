import type { Metadata } from "next";
import { getAllProjects } from "@/lib/supabase/queries";
import ProjectCard from "@/components/projects/ProjectCard";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimatedWrapper from "@/components/ui/AnimatedWrapper";

export const metadata: Metadata = {
    title: "Projects",
    description: "A collection of AI, data science, and software projects built by Dhruv Soin.",
};

export const revalidate = 3600;

export default async function ProjectsPage() {
    const projects = await getAllProjects();

    const featured = projects.filter((p) => p.featured);
    const others = projects.filter((p) => !p.featured);

    return (
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
            {/* Page header */}
            <AnimatedWrapper>
                <SectionHeader
                    title="Projects"
                    subtitle={`${projects.length} projects across AI, data science, and software engineering.`}
                />
            </AnimatedWrapper>

            {projects.length === 0 ? (
                <AnimatedWrapper>
                    <div className="mt-16 text-center py-20 border border-border rounded-2xl bg-surface">
                        <p className="text-muted text-lg font-mono">No projects yet — check back soon.</p>
                    </div>
                </AnimatedWrapper>
            ) : (
                <>
                    {/* Featured */}
                    {featured.length > 0 && (
                        <AnimatedWrapper delay={0.1}>
                            <div className="mb-4 mt-2">
                                <span className="text-xs font-mono text-muted tracking-widest uppercase">
                                    ★ Featured
                                </span>
                            </div>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
                                {featured.map((project, i) => (
                                    <ProjectCard key={project.id} project={project} index={i} />
                                ))}
                            </div>
                        </AnimatedWrapper>
                    )}

                    {/* All other projects */}
                    {others.length > 0 && (
                        <>
                            {featured.length > 0 && (
                                <div className="h-px w-full bg-border/30 mb-10" />
                            )}
                            <AnimatedWrapper delay={0.15}>
                                <div className="mb-4">
                                    <span className="text-xs font-mono text-muted tracking-widest uppercase">
                                        All Projects
                                    </span>
                                </div>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {others.map((project, i) => (
                                        <ProjectCard key={project.id} project={project} index={i} />
                                    ))}
                                </div>
                            </AnimatedWrapper>
                        </>
                    )}
                </>
            )}
        </div>
    );
}
