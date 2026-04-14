import { getGitHubStats, GITHUB_USERNAME } from "@/lib/github";
import { Github, Star, BookOpen, Code2, ExternalLink } from "lucide-react";
import Link from "next/link";

export const revalidate = 300; // Refresh every 5 minutes

const LANG_COLORS: Record<string, string> = {
    Python: "#3572A5",
    TypeScript: "#2b7489",
    JavaScript: "#f1e05a",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Jupyter: "#DA5B0B",
    R: "#198CE7",
    Shell: "#89e051",
    Rust: "#dea584",
    Go: "#00ADD8",
};

export default async function GitHubStats() {
    const stats = await getGitHubStats();

    const totalLangCount = stats.topLanguages.reduce((s, l) => s + l.count, 0);

    return (
        <div className="space-y-6">
            {/* ── Stats row ─────────────────────────────────────────── */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-5 border border-border bg-surface flex flex-col gap-1 hover:border-accent transition-colors duration-200">
                    <div className="flex items-center gap-2 text-muted mb-1">
                        <BookOpen size={13} />
                        <span className="text-xs font-mono tracking-widest uppercase">Repos</span>
                    </div>
                    <p className="text-3xl font-bold text-text" style={{ fontFamily: "var(--font-heading)" }}>
                        {stats.publicRepos}
                    </p>
                </div>

                <div className="p-5 border border-border bg-surface flex flex-col gap-1 hover:border-accent transition-colors duration-200">
                    <div className="flex items-center gap-2 text-muted mb-1">
                        <Star size={13} />
                        <span className="text-xs font-mono tracking-widest uppercase">Stars</span>
                    </div>
                    <p className="text-3xl font-bold text-text" style={{ fontFamily: "var(--font-heading)" }}>
                        {stats.totalStars}
                    </p>
                </div>

                <div className="p-5 border border-border bg-surface flex flex-col gap-1 hover:border-accent transition-colors duration-200 col-span-2 sm:col-span-1">
                    <div className="flex items-center gap-2 text-muted mb-1">
                        <Code2 size={13} />
                        <span className="text-xs font-mono tracking-widest uppercase">Languages</span>
                    </div>
                    <p className="text-3xl font-bold text-text" style={{ fontFamily: "var(--font-heading)" }}>
                        {stats.topLanguages.length}
                    </p>
                </div>
            </div>

            {/* ── Top languages bar ─────────────────────────────────── */}
            {stats.topLanguages.length > 0 && (
                <div className="p-5 border border-border bg-surface">
                    <p className="text-xs font-mono text-muted tracking-widest uppercase mb-4">Top Languages</p>

                    {/* Stacked bar */}
                    <div className="flex h-2.5 w-full rounded-full overflow-hidden mb-4 gap-px">
                        {stats.topLanguages.map((lang) => {
                            const pct = ((lang.count / totalLangCount) * 100).toFixed(1);
                            const color = LANG_COLORS[lang.language] ?? "#6e6e6e";
                            return (
                                <div
                                    key={lang.language}
                                    style={{ width: `${pct}%`, backgroundColor: color }}
                                    title={`${lang.language}: ${pct}%`}
                                />
                            );
                        })}
                    </div>

                    {/* Legend */}
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                        {stats.topLanguages.map((lang) => {
                            const pct = ((lang.count / totalLangCount) * 100).toFixed(0);
                            const color = LANG_COLORS[lang.language] ?? "#6e6e6e";
                            return (
                                <div key={lang.language} className="flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                                    <span className="text-xs text-muted font-mono">{lang.language}</span>
                                    <span className="text-xs text-muted/50 font-mono">{pct}%</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* ── Contribution calendar ─────────────────────────────── */}
            <div className="p-5 border border-border bg-surface">
                <p className="text-xs font-mono text-muted tracking-widest uppercase mb-4">Contribution Activity</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={`https://ghchart.rshah.org/e5b567/${GITHUB_USERNAME}`}
                    alt={`${GITHUB_USERNAME} GitHub contribution chart`}
                    className="w-full opacity-80 hover:opacity-100 transition-opacity duration-200"
                    style={{ filter: "invert(0)" }}
                />
            </div>

            {/* ── Recent repos ──────────────────────────────────────── */}
            {stats.repos.length > 0 && (
                <div className="p-5 border border-border bg-surface">
                    <p className="text-xs font-mono text-muted tracking-widest uppercase mb-4">Recent Repos</p>
                    <div className="grid sm:grid-cols-2 gap-3">
                        {stats.repos.map((repo) => (
                            <a
                                key={repo.name}
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start justify-between gap-2 p-3 border border-border/40 bg-bg hover:border-accent transition-all duration-200 group"
                            >
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-text truncate group-hover:text-accent transition-colors duration-200 font-mono">
                                        {repo.name}
                                    </p>
                                    {repo.description && (
                                        <p className="text-xs text-muted mt-0.5 line-clamp-1">{repo.description}</p>
                                    )}
                                    {repo.language && (
                                        <div className="flex items-center gap-1.5 mt-1.5">
                                            <span
                                                className="w-2 h-2 rounded-full flex-shrink-0"
                                                style={{ backgroundColor: LANG_COLORS[repo.language] ?? "#6e6e6e" }}
                                            />
                                            <span className="text-[10px] text-muted/70 font-mono">{repo.language}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center gap-1 text-muted flex-shrink-0 mt-0.5">
                                    <Star size={11} />
                                    <span className="text-[10px] font-mono">{repo.stargazers_count}</span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {/* ── View all on GitHub ────────────────────────────────── */}
            <Link
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted hover:text-text font-mono transition-colors duration-200 group"
            >
                <Github size={14} />
                View full profile on GitHub
                <ExternalLink size={11} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </Link>
        </div>
    );
}
