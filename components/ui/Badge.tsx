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
                "inline-flex items-center px-2 py-1 border-2 text-[11px] font-bold font-mono tracking-widest uppercase transition-colors duration-300",
                variant === "default" && "bg-surface text-text border-text hover:bg-text hover:text-surface",
                variant === "accent" && "bg-accent text-bg border-accent hover:bg-surface hover:text-accent",
                variant === "outline" && "bg-transparent text-muted border-muted/50 hover:border-text hover:text-text",
                className
            )}
        >
            {label}
        </span>
    );
}
