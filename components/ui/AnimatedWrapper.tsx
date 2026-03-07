"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/utils/cn";

interface AnimatedWrapperProps {
    children: React.ReactNode;
    delay?: number;
    direction?: "up" | "left" | "right" | "none";
    className?: string;
    /** If true, animation triggers when element enters viewport */
    inView?: boolean;
}

const directionVariants = {
    up: { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 16 }, visible: { opacity: 1, x: 0 } },
    none: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
};

export default function AnimatedWrapper({
    children,
    delay = 0,
    direction = "up",
    className,
    inView: triggerInView = true,
}: AnimatedWrapperProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    const variants = directionVariants[direction];

    return (
        <motion.div
            ref={ref}
            variants={variants}
            initial="hidden"
            animate={triggerInView ? (isInView ? "visible" : "hidden") : "visible"}
            transition={{
                duration: 0.45,
                ease: "easeOut",
                delay,
            }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
}
