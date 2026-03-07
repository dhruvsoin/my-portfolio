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
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href);

    return (
        <motion.header
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                "glass border-b border-border/40",
                scrolled && "shadow-lg shadow-black/20"
            )}
        >
            <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">

                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2 group"
                    aria-label="Dhruv Soin — Home"
                >
                    <span className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white text-sm font-bold font-mono transition-all duration-200 group-hover:bg-accent-hover group-hover:scale-105">
                        DS
                    </span>
                    <span className="hidden sm:block text-text font-semibold text-sm tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                        Dhruv Soin
                    </span>
                </Link>

                {/* Desktop nav */}
                <ul className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={cn(
                                    "relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                                    isActive(link.href)
                                        ? "text-accent"
                                        : "text-muted hover:text-text hover:bg-surface/60"
                                )}
                            >
                                {link.label}
                                {isActive(link.href) && (
                                    <motion.span
                                        layoutId="activeNav"
                                        className="absolute bottom-0 left-3 right-3 h-0.5 bg-accent rounded-full"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
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
                    className="md:hidden p-2 rounded-lg text-muted hover:text-text hover:bg-surface/60 transition-colors duration-200"
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
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
