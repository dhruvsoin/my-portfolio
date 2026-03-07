import { cn } from "@/utils/cn";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    align?: "left" | "center";
    className?: string;
}

export default function SectionHeader({
    title,
    subtitle,
    align = "left",
    className,
}: SectionHeaderProps) {
    return (
        <div
            className={cn(
                "mb-10",
                align === "center" && "text-center",
                className
            )}
        >
            {/* Accent dot + title */}
            <div
                className={cn(
                    "flex items-center gap-3 mb-2",
                    align === "center" && "justify-center"
                )}
            >
                <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                <h2
                    className="text-2xl sm:text-3xl font-bold text-text tracking-tight"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    {title}
                </h2>
            </div>

            {/* Accent underline rule */}
            <div
                className={cn(
                    "flex items-center gap-2 mt-3",
                    align === "center" && "justify-center"
                )}
            >
                <span className="h-px w-12 bg-accent rounded-full" />
                <span className="h-px flex-1 max-w-xs bg-border/40 rounded-full" />
            </div>

            {/* Subtitle */}
            {subtitle && (
                <p className="mt-4 text-muted text-sm sm:text-base leading-relaxed max-w-2xl">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
