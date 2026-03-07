import { cn } from "@/utils/cn";

interface BadgeProps {
    label: string;
    variant?: "default" | "accent" | "outline";
    className?: string;
}

export default function Badge({
    label,
    variant = "default",
    className,
}: BadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono transition-colors duration-200",
                variant === "default" &&
                "bg-surface text-muted border border-border/60 hover:border-accent/40 hover:text-text",
                variant === "accent" &&
                "bg-accent/10 text-accent border border-accent/20",
                variant === "outline" &&
                "bg-transparent text-muted border border-border hover:border-accent/40",
                className
            )}
        >
            {label}
        </span>
    );
}
