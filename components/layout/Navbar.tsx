"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/utils/cn";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/achievements", label: "Achievements" },
    { href: "/experience", label: "Experience" },
    { href: "/lab", label: "Lab" },
    { href: "/contact", label: "Contact" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Add shadow on scroll
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 16);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close menu on route change
    useEffect(() => { setIsOpen(false); }, [pathname]);

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href);

    return (
        <motion.header
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={cn(
                "fixed top-0 left-0 z-50 transition-all duration-500",
                "w-full h-16 md:w-[280px] md:h-screen md:border-r md:border-border bg-bg/95 backdrop-blur-md",
                scrolled && "shadow-sm md:shadow-none border-b border-border md:border-b-0"
            )}
        >
            <nav className="flex items-center md:items-start md:flex-col justify-between md:justify-start gap-8 px-6 md:px-10 h-16 md:h-full md:py-16">

                {/* Logo */}
                <Link
                    href="/"
                    className="flex flex-col gap-1 group"
                    aria-label="Dhruv Soin — Home"
                >
                    <span className="text-text font-bold text-2xl tracking-tighter" style={{ fontFamily: "var(--font-heading)" }}>
                        Dhruv Soin
                    </span>
                    <span className="hidden md:block text-muted font-mono text-xs uppercase tracking-widest">
                        Data Scientist
                    </span>
                </Link>

                {/* Desktop nav */}
                <ul className="hidden md:flex flex-col items-start gap-2 mt-8 w-full">
                    {navLinks.map((link) => (
                        <li key={link.href} className="w-full">
                            <Link
                                href={link.href}
                                className={cn(
                                    "relative block w-full py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-300",
                                    isActive(link.href)
                                        ? "glass text-text font-bold shadow-sm"
                                        : "text-muted hover:text-text hover:bg-surface"
                                )}
                            >
                                <span className={cn("relative z-10", isActive(link.href) && "tracking-wide")}>
                                    {link.label}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile hamburger */}
                <button
                    id="mobile-menu-toggle"
                    onClick={() => setIsOpen((o) => !o)}
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isOpen}
                    className="md:hidden p-2 text-text transition-colors duration-200"
                >
                    {isOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
                </button>
            </nav>

            {/* Mobile dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id="mobile-menu"
                        key="mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="md:hidden border-t border-border/40 overflow-hidden"
                    >
                        <ul className="flex flex-col px-6 py-4 gap-1">
                            {navLinks.map((link, i) => (
                                <motion.li
                                    key={link.href}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05, duration: 0.2 }}
                                >
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                            isActive(link.href)
                                                ? "bg-accent/10 text-accent"
                                                : "text-muted hover:text-text hover:bg-surface/60"
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
