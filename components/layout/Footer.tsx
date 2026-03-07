import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

const socialLinks = [
    {
        href: "https://github.com/dhruvsoin",
        label: "GitHub",
        icon: Github,
    },
    {
        href: "https://linkedin.com/in/dhruvsoin",
        label: "LinkedIn",
        icon: Linkedin,
    },
    {
        href: "mailto:dhruvsoin@gmail.com",
        label: "Email",
        icon: Mail,
    },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-border/40 bg-surface/40">
            <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">

                {/* Copyright */}
                <p className="text-muted text-sm">
                    © {year}{" "}
                    <span className="text-text font-medium">Dhruv Soin</span>
                    {" "}· Built with Next.js & Supabase
                </p>

                {/* Social links */}
                <div className="flex items-center gap-4">
                    {socialLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.label}
                                href={link.href}
                                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                                rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                                aria-label={link.label}
                                className="text-muted hover:text-accent transition-colors duration-200"
                            >
                                <Icon size={18} />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </footer>
    );
}
