import { createServerClient } from "./server";
import type {
    Project,
    Achievement,
    Experience,
    Experiment,
} from "@/utils/types";

// ─── Projects ────────────────────────────────────────────────────────────────

export async function getFeaturedProjects(): Promise<Project[]> {
    const supabase = createServerClient();
    const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("featured", true)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("[Supabase] getFeaturedProjects:", error.message);
        return [];
    }
    return data ?? [];
}

export async function getAllProjects(): Promise<Project[]> {
    const supabase = createServerClient();
    const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("[Supabase] getAllProjects:", error.message);
        return [];
    }
    return data ?? [];
}

export async function getProjectById(id: string): Promise<Project | null> {
    const supabase = createServerClient();
    const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error("[Supabase] getProjectById:", error.message);
        return null;
    }
    return data;
}

// ─── Achievements ─────────────────────────────────────────────────────────────

export async function getAllAchievements(): Promise<Achievement[]> {
    const supabase = createServerClient();
    const { data, error } = await supabase
        .from("achievements")
        .select("*")
        .order("date", { ascending: false });

    if (error) {
        console.error("[Supabase] getAllAchievements:", error.message);
        return [];
    }
    return data ?? [];
}

export async function getRecentAchievements(
    limit = 3
): Promise<Achievement[]> {
    const supabase = createServerClient();
    const { data, error } = await supabase
        .from("achievements")
        .select("*")
        .order("date", { ascending: false })
        .limit(limit);

    if (error) {
        console.error("[Supabase] getRecentAchievements:", error.message);
        return [];
    }
    return data ?? [];
}

// ─── Experience ───────────────────────────────────────────────────────────────

export async function getAllExperience(): Promise<Experience[]> {
    const supabase = createServerClient();
    const { data, error } = await supabase
        .from("experience")
        .select("*")
        .order("start_date", { ascending: false });

    if (error) {
        console.error("[Supabase] getAllExperience:", error.message);
        return [];
    }
    return data ?? [];
}

// ─── Experiments ──────────────────────────────────────────────────────────────

export async function getAllExperiments(): Promise<Experiment[]> {
    const supabase = createServerClient();
    const { data, error } = await supabase
        .from("experiments")
        .select("*")
        .order("date", { ascending: false });

    if (error) {
        console.error("[Supabase] getAllExperiments:", error.message);
        return [];
    }
    return data ?? [];
}
