import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// ─── Fonts ────────────────────────────────────────────────────────────────────

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500"],
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
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
