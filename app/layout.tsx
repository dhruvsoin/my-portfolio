import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// ─── Fonts ────────────────────────────────────────────────────────────────────

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500"],
  display: "swap",
});

const fontHeading = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-code",
  weight: ["400"],
  display: "swap",
});

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default: "Dhruv Soin — AI & Data Science Portfolio",
    template: "%s | Dhruv Soin",
  },
  description:
    "AI & Data Science builder. I build AI tools, data analysis systems, and intelligent assistants that transform raw information into useful insights.",
  keywords: [
    "Dhruv Soin",
    "AI",
    "Data Science",
    "Machine Learning",
    "Portfolio",
    "Python",
    "LLM",
    "RAG",
  ],
  authors: [{ name: "Dhruv Soin" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Dhruv Soin — AI & Data Science Portfolio",
    description:
      "AI & Data Science builder creating intelligent tools and data systems.",
    siteName: "Dhruv Soin Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhruv Soin — AI & Data Science Portfolio",
    description:
      "AI & Data Science builder creating intelligent tools and data systems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ─── Root Layout ──────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontHeading.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased min-h-screen bg-bg text-text">
        <div className="noise-bg" />
        <Navbar />
        <div className="flex flex-col min-h-screen md:pl-[280px]">
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
