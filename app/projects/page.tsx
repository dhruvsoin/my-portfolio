import type { Metadata } from "next";
import { getGitHubStats } from "@/lib/github";
import ProjectCard from "@/components/projects/ProjectCard";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimatedWrapper from "@/components/ui/AnimatedWrapper";

export const metadata: Metadata = {
    title: "Projects",
    description: "A collection of AI, data science, and software projects built by Dhruv Soin.",
};

export const revalidate = 30; // Fast sync with GitHub

export default async function ProjectsPage() {
    const stats = await getGitHubStats();
    
    // Map GitHub repos to the Project interface expected by the UI
    const projects = stats.repos.map((repo) => {
        // Construct tech stack from topics and main language
        const techStack = [...repo.topics];
        if (repo.language && !techStack.includes(repo.language.toLowerCase())) {
            techStack.unshift(repo.language);
        }

        return {
            id: repo.name,
            title: repo.name.replace(/-/g, " "), // Format repo-name to "repo name"
            description: repo.description || "No description provided.",
            tech_stack: techStack.slice(0, 5), // Limit to 5 tags for UI cleanliness
            github_link: repo.html_url,
            demo_link: repo.homepage,
            // Feature repos that have stars or a live demo, and are relatively recent
            featured: repo.stargazers_count > 0 || !!repo.homepage, 
            created_at: repo.pushed_at || new Date().toISOString(),
            stargazers_count: repo.stargazers_count
        };
    });

    // Sort projects by recent activity
    projects.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    const featured = projects.filter((p) => p.featured);
    const others = projects.filter((p) => !p.featured);

    return (
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
            {/* Page header */}
            <AnimatedWrapper>
                <SectionHeader
                    title="Projects"
                    subtitle={`${projects.length} public repositories fetched automatically from GitHub.`}
                />
            </AnimatedWrapper>

            {projects.length === 0 ? (
                <AnimatedWrapper>
                    <div className="mt-16 text-center py-20 border border-border rounded-2xl bg-surface">
                        <p className="text-muted text-lg font-mono">No projects found. (Check GitHub token if this persists)</p>
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
                                    <ProjectCard key={project.id} project={project as any} index={i} />
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
                                        <ProjectCard key={project.id} project={project as any} index={i} />
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
