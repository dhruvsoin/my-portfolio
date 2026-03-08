"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, ExternalLink, Star, ArrowRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { cn } from "@/utils/cn";
import type { Project } from "@/utils/types";

interface ProjectCardProps {
    project: Project;
    index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
    const { id, title, description, tech_stack, github_link, demo_link, featured } =
        project;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
            className="group relative h-full"
        >
            <div
                className={cn(
                    "h-full flex flex-col p-6 rounded-2xl glass transition-all duration-300",
                    "card-hover"
                )}
            >
                {/* Featured badge */}
                {featured && (
                    <span className="absolute top-4 right-4 flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-bg bg-text px-2.5 py-1 rounded-full shadow-sm">
                        <Star size={10} fill="currentColor" /> Featured
                    </span>
                )}

                {/* Title */}
                <Link href={`/projects/${id}`} className="block group/title mb-3">
                    <h3
                        className="text-lg font-semibold text-text group-hover/title:text-accent transition-colors duration-200 leading-snug pr-16"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        {title}
                    </h3>
                </Link>

                {/* Description */}
                <p className="text-muted text-sm leading-relaxed line-clamp-3 flex-1 mb-4">
                    {description}
                </p>

                {/* Tech stack */}
                {tech_stack && tech_stack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                        {tech_stack.slice(0, 4).map((tech) => (
                            <Badge key={tech} label={tech} />
                        ))}
                        {tech_stack.length > 4 && (
                            <Badge label={`+${tech_stack.length - 4} more`} variant="outline" />
                        )}
                    </div>
                )}

                {/* Links */}
                <div className="flex items-center gap-3 pt-3 border-t border-border/40">
                    {github_link && (
                        <a
                            href={github_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`${title} GitHub`}
                            className="flex items-center gap-1.5 text-xs text-muted hover:text-text transition-colors duration-200 font-mono"
                        >
                            <Github size={13} /> Code
                        </a>
                    )}
                    {demo_link && (
                        <a
                            href={demo_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`${title} Demo`}
                            className="flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-colors duration-200 font-mono"
                        >
                            <ExternalLink size={13} /> Live
                        </a>
                    )}
                    <Link
                        href={`/projects/${id}`}
                        className="ml-auto flex items-center gap-1 text-xs text-muted hover:text-text transition-colors duration-200 font-mono group/link"
                    >
                        Details
                        <ArrowRight size={11} className="group-hover/link:translate-x-0.5 transition-transform duration-200" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
