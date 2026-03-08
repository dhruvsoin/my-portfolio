"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle, AlertCircle, Github, Linkedin, Mail } from "lucide-react";

const socials = [
    { label: "GitHub", href: "https://github.com/dhruvsoin", icon: Github },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/dhruv-soin", icon: Linkedin },
    { label: "Email", href: "mailto:info.dhruvsoin@gmail.com", icon: Mail },
];

type Status = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
    const [status, setStatus] = useState<Status>("idle");
    const [form, setForm] = useState({ name: "", email: "", message: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setStatus("success");
                setForm({ name: "", email: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">

            {/* Page header */}
            <div className="mb-16">
                <p className="text-xs font-mono text-muted tracking-widest uppercase mb-3">Contact</p>
                <h1
                    className="text-5xl sm:text-6xl font-bold text-text tracking-tighter leading-[0.95] mb-4"
                    style={{ fontFamily: "var(--font-heading)" }}
                >
                    Let&apos;s build something
                    <br />
                    <span className="text-accent">together.</span>
                </h1>
                <p className="text-muted text-base sm:text-lg max-w-lg leading-relaxed">
                    I&apos;m open to internships, collaborations, freelance projects, and just good conversations
                    about data and AI. Shoot me a message.
                </p>
            </div>

            <div className="grid md:grid-cols-[2fr_1fr] gap-10 items-start">

                {/* ── Contact Form ──────────────────────────────── */}
                <div className="p-8 border-2 border-border bg-surface shadow-[6px_6px_0px_var(--accent)] relative">
                    <span className="absolute -top-3 left-6 bg-bg px-2 text-[10px] font-mono text-muted tracking-widest uppercase">
                        send a message
                    </span>

                    {status === "success" ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                            <CheckCircle size={40} className="text-green-400" />
                            <div>
                                <p className="text-lg font-bold text-text" style={{ fontFamily: "var(--font-heading)" }}>
                                    Message sent!
                                </p>
                                <p className="text-muted text-sm mt-1">
                                    Thanks for reaching out — I&apos;ll get back to you soon.
                                </p>
                            </div>
                            <button
                                onClick={() => setStatus("idle")}
                                className="text-xs font-mono text-muted underline hover:text-text transition-colors"
                            >
                                Send another
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Name */}
                            <div>
                                <label htmlFor="contact-name" className="block text-xs font-mono text-muted tracking-widest uppercase mb-2">
                                    Name *
                                </label>
                                <input
                                    id="contact-name"
                                    name="name"
                                    type="text"
                                    required
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    className="w-full px-4 py-3 bg-bg border-2 border-border text-text placeholder:text-muted/50 text-sm font-mono focus:border-accent focus:outline-none transition-colors duration-200"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="contact-email" className="block text-xs font-mono text-muted tracking-widest uppercase mb-2">
                                    Email *
                                </label>
                                <input
                                    id="contact-email"
                                    name="email"
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-3 bg-bg border-2 border-border text-text placeholder:text-muted/50 text-sm font-mono focus:border-accent focus:outline-none transition-colors duration-200"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label htmlFor="contact-message" className="block text-xs font-mono text-muted tracking-widest uppercase mb-2">
                                    Message *
                                </label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    required
                                    rows={6}
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Tell me about your project, idea, or just say hi..."
                                    className="w-full px-4 py-3 bg-bg border-2 border-border text-text placeholder:text-muted/50 text-sm font-mono focus:border-accent focus:outline-none transition-colors duration-200 resize-none"
                                />
                            </div>

                            {/* Error */}
                            {status === "error" && (
                                <div className="flex items-center gap-2 p-3 border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-mono">
                                    <AlertCircle size={14} />
                                    Something went wrong. Try emailing me directly.
                                </div>
                            )}

                            {/* Submit */}
                            <button
                                id="contact-submit"
                                type="submit"
                                disabled={status === "loading"}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-surface text-text font-bold text-sm border-2 border-accent shadow-[4px_4px_0px_var(--accent)] hover:shadow-[6px_6px_0px_var(--accent)] hover:-translate-y-1 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
                            >
                                {status === "loading" ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" /> Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send size={16} /> Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>

                {/* ── Right sidebar ─────────────────────────────── */}
                <div className="space-y-8">
                    {/* Direct email */}
                    <div>
                        <p className="text-xs font-mono text-muted tracking-widest uppercase mb-3">Direct Email</p>
                        <a
                            href="mailto:info.dhruvsoin@gmail.com"
                            className="text-base font-semibold text-accent hover:underline break-all"
                        >
                            info.dhruvsoin@gmail.com
                        </a>
                    </div>

                    {/* Socials */}
                    <div>
                        <p className="text-xs font-mono text-muted tracking-widest uppercase mb-3">Find Me On</p>
                        <div className="flex flex-col gap-3">
                            {socials.map(({ label, href, icon: Icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target={href.startsWith("mailto") ? undefined : "_blank"}
                                    rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                                    className="flex items-center gap-3 text-sm text-muted hover:text-text transition-colors duration-200 group"
                                >
                                    <span className="flex items-center justify-center w-8 h-8 border border-border bg-bg group-hover:border-accent transition-colors duration-200">
                                        <Icon size={14} />
                                    </span>
                                    {label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Response time */}
                    <div className="p-4 border border-border/50 bg-surface/50">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-50"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400"></span>
                            </span>
                            <span className="text-xs font-mono text-muted">Usually responds within 24h</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
