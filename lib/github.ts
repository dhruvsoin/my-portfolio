import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

const GITHUB_USERNAME = "dhruvsoin"; // ← update to your actual GitHub username

export interface RepoInfo {
    name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    language: string | null;
}

export interface GitHubStats {
    publicRepos: number;
    totalStars: number;
    topLanguages: { language: string; count: number }[];
    repos: RepoInfo[];
}

/**
 * Fetch GitHub stats for the portfolio owner.
 * Called from a Server Component with ISR caching.
 */
export async function getGitHubStats(): Promise<GitHubStats> {
    try {
        const { data: repos } = await octokit.repos.listForUser({
            username: GITHUB_USERNAME,
            type: "all", // "all" includes owned repos + forks (valid Octokit values: "all" | "owner" | "member")
            per_page: 100,
            sort: "updated",
        });

        const totalStars = repos.reduce(
            (sum, repo) => sum + (repo.stargazers_count ?? 0),
            0
        );

        // Count languages
        const langMap: Record<string, number> = {};
        for (const repo of repos) {
            if (repo.language) {
                langMap[repo.language] = (langMap[repo.language] ?? 0) + 1;
            }
        }

        const topLanguages = Object.entries(langMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([language, count]) => ({ language, count }));

        const repoList: RepoInfo[] = repos.map((r) => ({
            name: r.name,
            description: r.description ?? null,
            html_url: r.html_url,
            stargazers_count: r.stargazers_count ?? 0,
            language: r.language ?? null,
        }));

        return {
            publicRepos: repos.length,
            totalStars,
            topLanguages,
            repos: repoList,
        };
    } catch (err) {
        console.error("[GitHub] Failed to fetch stats:", err);
        return {
            publicRepos: 0,
            totalStars: 0,
            topLanguages: [],
            repos: [],
        };
    }
}

export { GITHUB_USERNAME };
