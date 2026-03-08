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
                <span className="w-2 h-2 rounded-full bg-text flex-shrink-0" />
                <h2
                    className="text-3xl sm:text-4xl font-bold text-text tracking-tight"
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
                <span className="h-px w-12 bg-text rounded-full" />
                <span className="h-px flex-1 max-w-xs bg-border rounded-full" />
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
