import Link from "next/link";
import { Mail } from "lucide-react";
import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import RecentAchievements from "@/components/home/RecentAchievements";
import AnimatedWrapper from "@/components/ui/AnimatedWrapper";

export const revalidate = 3600; // 1-hour ISR

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

        <AnimatedWrapper className="text-center">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-6 tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Let&apos;s build something <span className="text-accent">together</span>
          </h2>
          <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            I&apos;m currently open to new opportunities. Whether you have a question, a project idea, or just want to say hi, my inbox is always open.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-accent text-white font-semibold text-base hover:bg-accent-hover transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-accent/20"
          >
            <Mail size={18} />
            Get In Touch
          </Link>
        </AnimatedWrapper>
      </section>
    </>
  );
}
