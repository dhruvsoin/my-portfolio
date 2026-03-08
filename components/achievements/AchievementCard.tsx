import Link from "next/link";
import { ExternalLink } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { formatDate } from "@/utils/formatDate";
import { cn } from "@/utils/cn";
import type { Achievement } from "@/utils/types";

const categoryColors: Record<string, string> = {
    hackathon: "bg-purple-500",
    award: "bg-yellow-500",
    internship: "bg-blue-500",
    milestone: "bg-green-500",
    other: "bg-muted",
};

const categoryVariants: Record<string, "default" | "accent" | "outline"> = {
    hackathon: "accent",
    award: "accent",
    internship: "default",
    milestone: "default",
    other: "outline",
};

interface AchievementCardProps {
    achievement: Achievement;
}

export default function AchievementCard({ achievement }: AchievementCardProps) {
    const { title, description, category, date, link } = achievement;
    const barColor = categoryColors[category] ?? categoryColors.other;

    return (
        <div className="relative flex gap-5 p-6 rounded-2xl glass transition-all duration-300 card-hover group cursor-pointer">

            {/* Left accent bar */}
            <div className={cn("w-1.5 rounded-full flex-shrink-0 self-stretch opacity-70 group-hover:opacity-100 transition-opacity", barColor)} />

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-2">
                    <h3
                        className="text-base font-semibold text-text leading-snug"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        {title}
                    </h3>
                    {link && (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="View achievement"
                            className="flex-shrink-0 text-muted hover:text-accent transition-colors duration-200 mt-0.5"
                        >
                            <ExternalLink size={14} />
                        </a>
                    )}
                </div>

                <p className="text-muted text-sm leading-relaxed line-clamp-2 mb-3">
                    {description}
                </p>

                <div className="flex items-center gap-3">
                    <Badge label={category} variant={categoryVariants[category] ?? "outline"} />
                    <span className="text-xs text-muted/60 font-mono">{formatDate(date)}</span>
                </div>
            </div>
        </div>
    );
}
