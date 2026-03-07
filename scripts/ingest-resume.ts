/**
 * scripts/ingest-resume.ts
 *
 * Run once to parse the resume PDF and seed Supabase tables if they're empty.
 * Usage: npx ts-node --esm scripts/ingest-resume.ts
 *
 * Hooked as "prebuild" in package.json so it runs automatically on `npm run build`.
 */

import { parseResume } from "../lib/resume-parser";
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import * as path from "path";

// Load .env.local
dotenv.config({ path: path.join(process.cwd(), ".env.local") });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function isTableEmpty(tableName: string): Promise<boolean> {
    const { count } = await supabase
        .from(tableName)
        .select("*", { count: "exact", head: true });
    return count === 0 || count === null;
}

async function main() {
    console.log("\n📄 Parsing resume PDF...");
    const resume = await parseResume();

    if (!resume) {
        console.log("⚠️  Resume not found or failed to parse. Skipping seeding.");
        return;
    }

    console.log(`✅ Extracted:`);
    console.log(`   Skills:     ${resume.skills.length}`);
    console.log(`   Education:  ${resume.education.length}`);
    console.log(`   Experience: ${resume.experience.length}`);
    console.log(`   Projects:   ${resume.projects.length}`);

    // ── Seed experience ──────────────────────────────────────────────────────
    if (await isTableEmpty("experience")) {
        if (resume.experience.length > 0) {
            const rows = resume.experience.map((e) => ({
                role: e.role,
                company: e.company,
                description: e.description,
                start_date: e.startDate,
                end_date: e.endDate,
            }));
            const { error } = await supabase.from("experience").insert(rows);
            if (error) console.error("❌ Experience seed failed:", error.message);
            else console.log(`✅ Seeded ${rows.length} experience entries.`);
        }
    } else {
        console.log("ℹ️  experience table already has data — skipping seed.");
    }

    // ── Seed projects ─────────────────────────────────────────────────────────
    if (await isTableEmpty("projects")) {
        if (resume.projects.length > 0) {
            const rows = resume.projects.map((p) => ({
                title: p.title,
                description: p.description,
                tech_stack: p.techStack,
                github_link: null,
                demo_link: null,
                featured: false,
            }));
            const { error } = await supabase.from("projects").insert(rows);
            if (error) console.error("❌ Projects seed failed:", error.message);
            else console.log(`✅ Seeded ${rows.length} project entries.`);
        }
    } else {
        console.log("ℹ️  projects table already has data — skipping seed.");
    }

    console.log("\n🎉 Resume ingestion complete.\n");
}

main().catch((err) => {
    console.error("Fatal error in ingest-resume:", err);
    process.exit(0); // Don't block the build
});
