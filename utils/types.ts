// ─── TypeScript types matching Supabase table schemas ─────────────────────

export interface Project {
    id: string;
    title: string;
    description: string;
    tech_stack: string[];
    github_link?: string | null;
    demo_link?: string | null;
    featured: boolean;
    created_at: string;
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    category: string; // 'hackathon' | 'award' | 'internship' | 'milestone'
    date: string;
    link?: string | null;
}

export interface Experience {
    id: string;
    role: string;
    company: string;
    description: string;
    start_date: string;
    end_date?: string | null;
}

export interface Experiment {
    id: string;
    title: string;
    description: string;
    tech_stack: string[];
    link?: string | null;
    date: string;
}

export interface BlogPost {
    id: string;
    title: string;
    content: string;
    created_at: string;
}
