import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import RecentAchievements from "@/components/home/RecentAchievements";
import AnimatedWrapper from "@/components/ui/AnimatedWrapper";

export const revalidate = 60; // Revalidate every 60 seconds so new Supabase data appears quickly

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <FeaturedProjects />
      <RecentAchievements />

      {/* Contact CTA Section */}
      <section className="max-w-5xl mx-auto px-6 py-24 w-full">
        {/* Divider */}
        <div className="h-px w-full bg-border/30 mb-24" aria-hidden="true" />

        <AnimatedWrapper>
          <div className="relative p-10 sm:p-14 border-2 border-text bg-surface shadow-[8px_8px_0px_var(--accent)] text-left">
            {/* Decorative label */}
            <span className="absolute -top-3 left-6 bg-bg px-2 text-[10px] font-mono text-muted tracking-widest uppercase">
              say hello
            </span>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-5 tracking-tighter"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Let&apos;s build something
              <br />
              <span className="text-accent">together.</span>
            </h2>
            <p className="text-muted text-base sm:text-lg max-w-lg mb-10 leading-relaxed">
              I&apos;m open to new opportunities, collaborations, and interesting conversations.
              Whether you have a project idea or just want to say hi — reach out.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-surface text-text font-bold text-sm hover:-translate-y-1 border-2 border-accent shadow-[4px_4px_0px_var(--accent)] hover:shadow-[6px_6px_0px_var(--accent)] transition-all duration-300 group"
              >
                <Mail size={16} />
                Get In Touch
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-4 bg-bg border-2 border-border text-text font-bold text-sm hover:border-accent hover:-translate-y-1 shadow-[4px_4px_0px_transparent] hover:shadow-[4px_4px_0px_var(--accent)] transition-all duration-300"
              >
                Learn more about me
              </Link>
            </div>
          </div>
        </AnimatedWrapper>
      </section>
    </>
  );
}
