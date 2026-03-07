import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getRecentAchievements } from "@/lib/supabase/queries";
import AchievementCard from "@/components/achievements/AchievementCard";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimatedWrapper from "@/components/ui/AnimatedWrapper";

export default async function RecentAchievements() {
    const achievements = await getRecentAchievements(3);

    // Don't render the section if there's nothing yet
    if (!achievements || achievements.length === 0) {
        return null;
    }

    return (
        <section className="max-w-5xl mx-auto px-6 py-24">
            {/* Divider */}
            <div className="h-px w-full bg-border/30 mb-24" aria-hidden="true" />

            <AnimatedWrapper>
                <SectionHeader
                    title="Recent Achievements"
                    subtitle="Milestones, hackathons, and wins worth celebrating."
                />
            </AnimatedWrapper>

            <div className="flex flex-col gap-4">
                {achievements.map((achievement, i) => (
                    <AnimatedWrapper key={achievement.id} delay={i * 0.08}>
                        <AchievementCard achievement={achievement} />
                    </AnimatedWrapper>
                ))}
            </div>

            <AnimatedWrapper delay={0.3}>
                <div className="mt-10 flex justify-center">
                    <Link
                        href="/achievements"
                        id="achievements-view-all"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-muted hover:text-text hover:border-accent/50 font-medium text-sm transition-all duration-200 hover:scale-[1.02] group"
                    >
                        View all achievements
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
