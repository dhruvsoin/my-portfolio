import Link from "next/link";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

const socialLinks = [
    {
        href: "https://github.com/dhruvsoin",
        label: "GitHub",
        icon: Github,
    },
    {
        href: "https://www.linkedin.com/in/dhruv-soin",
        label: "LinkedIn",
        icon: Linkedin,
    },
    {
        href: "mailto:info.dhruvsoin@gmail.com",
        label: "Email",
        icon: Mail,
    },
];

const footerLinks = [
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/achievements", label: "Achievements" },
    { href: "/contact", label: "Contact" },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-border/40 bg-surface/30 mt-auto">
            <div className="max-w-5xl mx-auto px-6 py-10">
                {/* Top row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
                    {/* Brand */}
                    <div>
                        <p className="font-bold text-text text-lg tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
                            Dhruv Soin
                        </p>
                        <p className="text-xs text-muted font-mono mt-0.5">Data Science · Gen AI · Builder</p>
                    </div>

                    {/* Nav links */}
                    <nav className="flex flex-wrap gap-x-6 gap-y-2">
                        {footerLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm text-muted hover:text-text transition-colors duration-200"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Bottom row */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border/30">
                    <p className="text-muted text-xs font-mono">
                        © {year} Dhruv Soin · Built with Next.js & Supabase
                    </p>

                    {/* Social links */}
                    <div className="flex items-center gap-3">
                        {socialLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    target={link.href.startsWith("mailto") ? undefined : "_blank"}
                                    rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                                    aria-label={link.label}
                                    className="group flex items-center gap-1 text-xs text-muted hover:text-text transition-colors duration-200 font-mono"
                                >
                                    <Icon size={14} />
                                    <span className="hidden sm:inline">{link.label}</span>
                                    <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </footer>
    );
}
