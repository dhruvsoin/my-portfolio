import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            <div className="text-center max-w-md">
                <p className="text-8xl font-bold text-accent font-mono mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                    404
                </p>
                <SearchX size={40} className="text-muted mx-auto mb-6" />
                <h1 className="text-2xl font-bold text-text mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                    Page not found
                </h1>
                <p className="text-muted text-sm leading-relaxed mb-8">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-surface text-text font-bold text-sm border-2 border-accent shadow-[4px_4px_0px_var(--accent)] hover:shadow-[6px_6px_0px_var(--accent)] hover:-translate-y-1 transition-all duration-300 group"
                >
                    <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
