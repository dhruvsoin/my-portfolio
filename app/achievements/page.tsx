import type { Metadata } from "next";
import { Trophy, Zap, Briefcase, Target, MoreHorizontal } from "lucide-react";
import { getAllAchievements } from "@/lib/supabase/queries";
import AchievementCard from "@/components/achievements/AchievementCard";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimatedWrapper from "@/components/ui/AnimatedWrapper";

export const metadata: Metadata = {
    title: "Achievements",
    description: "Hackathons, awards, internships, and milestones achieved by Dhruv Soin.",
};

export const revalidate = 3600;

const categoryMeta: Record<string, { label: string; icon: React.ElementType; color: string }> = {
    hackathon: { label: "Hackathons", icon: Zap, color: "text-purple-400" },
    award: { label: "Awards", icon: Trophy, color: "text-yellow-400" },
    internship: { label: "Internships", icon: Briefcase, color: "text-blue-400" },
    milestone: { label: "Milestones", icon: Target, color: "text-green-400" },
    other: { label: "Other", icon: MoreHorizontal, color: "text-muted" },
};

export default async function AchievementsPage() {
    const achievements = await getAllAchievements();

    // Group by category
    const grouped = achievements.reduce<Record<string, typeof achievements>>((acc, a) => {
        const key = a.category in categoryMeta ? a.category : "other";
        if (!acc[key]) acc[key] = [];
        acc[key].push(a);
        return acc;
    }, {});

    const categoryOrder = ["hackathon", "award", "internship", "milestone", "other"];

    return (
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
            {/* Page header */}
            <AnimatedWrapper>
                <SectionHeader
                    title="Achievements"
                    subtitle="Milestones, hackathons, awards, and wins worth celebrating."
                />
            </AnimatedWrapper>

            {/* Stats row */}
            <AnimatedWrapper delay={0.1}>
                <div className="flex flex-wrap gap-6 mb-16 mt-2">
                    {categoryOrder.map((cat) => {
                        const meta = categoryMeta[cat];
                        const Icon = meta.icon;
                        const count = grouped[cat]?.length ?? 0;
                        if (count === 0) return null;
                        return (
                            <div key={cat} className="flex items-center gap-2">
                                <Icon size={14} className={meta.color} />
                                <span className="text-sm font-bold text-text">{count}</span>
                                <span className="text-xs text-muted font-mono">{meta.label}</span>
                            </div>
                        );
                    })}
                </div>
            </AnimatedWrapper>

            {achievements.length === 0 ? (
                <AnimatedWrapper>
                    <div className="text-center py-20 border border-border rounded-2xl bg-surface">
                        <p className="text-muted text-lg font-mono">No achievements yet — stay tuned!</p>
                    </div>
                </AnimatedWrapper>
            ) : (
                <div className="space-y-16">
                    {categoryOrder.map((cat) => {
                        const items = grouped[cat];
                        if (!items || items.length === 0) return null;
                        const meta = categoryMeta[cat];
                        const Icon = meta.icon;

                        return (
                            <AnimatedWrapper key={cat} delay={0.1}>
                                <div className="flex items-center gap-3 mb-6">
                                    <Icon size={16} className={meta.color} />
                                    <h2
                                        className="text-lg font-bold text-text tracking-tight"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        {meta.label}
                                    </h2>
                                    <span className="text-xs font-mono text-muted ml-1">({items.length})</span>
                                    <div className="h-px flex-1 bg-border/40 ml-2" />
                                </div>
                                <div className="flex flex-col gap-4">
                                    {items.map((achievement, i) => (
                                        <AnimatedWrapper key={achievement.id} delay={i * 0.06}>
                                            <AchievementCard achievement={achievement} />
                                        </AnimatedWrapper>
                                    ))}
                                </div>
                            </AnimatedWrapper>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
