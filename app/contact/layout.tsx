import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact",
    description: "Get in touch with Dhruv Soin — open to internships, collaborations, and conversations.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}
