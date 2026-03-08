import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Github, ExternalLink, Calendar, Star } from "lucide-react";
import { getAllProjects, getProjectById } from "@/lib/supabase/queries";
import Badge from "@/components/ui/Badge";
import { formatDate } from "@/utils/formatDate";

export const revalidate = 3600;

export async function generateStaticParams() {
    try {
        const projects = await getAllProjects();
        return projects.map((p) => ({ id: p.id }));
    } catch {
        // Supabase env vars not set at build time — pages will be rendered on demand
        return [];
    }
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const project = await getProjectById(id);
    if (!project) return { title: "Project Not Found" };
    return {
        title: project.title,
        description: project.description,
    };
}

export default async function ProjectDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const project = await getProjectById(id);
    if (!project) notFound();

    const { title, description, tech_stack, github_link, demo_link, featured, created_at } =
        project;

    return (
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
            {/* Back link */}
            <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-muted text-sm font-mono hover:text-text transition-colors duration-200 mb-10 group"
            >
                <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
                All Projects
            </Link>

            {/* Header */}
            <div className="mb-10">
                {featured && (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-accent border border-accent px-2.5 py-1 mb-4 tracking-widest uppercase">
                        <Star size={10} fill="currentColor" /> Featured Project
                    </span>
                )}
                <h1
                    className="text-4xl sm:text-5xl font-bold text-text tracking-tighter leading-tight mb-4"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    {title}
                </h1>
                <div className="flex items-center gap-2 text-muted text-xs font-mono">
                    <Calendar size={12} />
                    <span>{formatDate(created_at)}</span>
                </div>
            </div>

            {/* Description */}
            <div className="p-8 border-2 border-border bg-surface mb-8 shadow-[4px_4px_0px_var(--accent)]">
                <p className="text-base text-text/90 leading-relaxed whitespace-pre-line">
                    {description}
                </p>
            </div>

            {/* Tech stack */}
            {tech_stack && tech_stack.length > 0 && (
                <div className="mb-10">
                    <p className="text-xs font-mono text-muted tracking-widest uppercase mb-4">
                        Technologies Used
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {tech_stack.map((tech) => (
                            <Badge key={tech} label={tech} />
                        ))}
                    </div>
                </div>
            )}

            {/* Action links */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border/40">
                {github_link && (
                    <a
                        href={github_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-surface text-text font-bold text-sm hover:-translate-y-1 border-2 border-accent shadow-[4px_4px_0px_var(--accent)] hover:shadow-[6px_6px_0px_var(--accent)] transition-all duration-300"
                    >
                        <Github size={18} /> View Source Code
                    </a>
                )}
                {demo_link && (
                    <a
                        href={demo_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-bg border-2 border-border text-text font-bold text-sm hover:border-accent hover:-translate-y-1 shadow-[4px_4px_0px_transparent] hover:shadow-[4px_4px_0px_var(--accent)] transition-all duration-300"
                    >
                        <ExternalLink size={18} /> Live Demo
                    </a>
                )}
            </div>
        </div>
    );
}
