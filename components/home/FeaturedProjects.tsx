import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProjects } from "@/lib/supabase/queries";
import ProjectCard from "@/components/projects/ProjectCard";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimatedWrapper from "@/components/ui/AnimatedWrapper";

export default async function FeaturedProjects() {
    const projects = await getFeaturedProjects();

    if (!projects || projects.length === 0) {
        return null; // Nothing to show yet
    }

    return (
        <section className="max-w-5xl mx-auto px-6 py-24">
            {/* Divider */}
            <div className="h-px w-full bg-border/30 mb-24" aria-hidden="true" />

            <AnimatedWrapper>
                <SectionHeader
                    title="Featured Projects"
                    subtitle="A selection of AI and data science projects I've built."
                />
            </AnimatedWrapper>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {projects.map((project, i) => (
                    <ProjectCard key={project.id} project={project} index={i} />
                ))}
            </div>

            <AnimatedWrapper delay={0.3}>
                <div className="mt-10 flex justify-center">
                    <Link
                        href="/projects"
                        id="featured-view-all"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass font-medium text-sm hover:bg-surface hover:scale-105 transition-all duration-300 group"
                    >
                        View all projects
                        <ArrowRight
                            size={14}
                            className="group-hover:translate-x-1 transition-transform duration-200"
                        />
                    </Link>
                </div>
            </AnimatedWrapper>
        </section>
    );
}
