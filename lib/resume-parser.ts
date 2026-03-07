/**
 * Resume parser — extracts structured data from Dhruv_Soin_Resume.pdf
 * Uses pdf-parse under the hood.
 *
 * IMPORTANT: This module is server-side only (Node.js).
 * Never import it in Client Components.
 */

import fs from "fs";
import path from "path";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require("pdf-parse") as (
    buffer: Buffer
) => Promise<{ text: string; numpages: number }>;

export interface ParsedResume {
    rawText: string;
    skills: string[];
    education: EducationEntry[];
    experience: ExperienceEntry[];
    projects: ProjectEntry[];
}

export interface EducationEntry {
    institution: string;
    degree: string;
    year: string;
}

export interface ExperienceEntry {
    role: string;
    company: string;
    description: string;
    startDate: string;
    endDate: string | null;
}

export interface ProjectEntry {
    title: string;
    description: string;
    techStack: string[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function extractSection(text: string, sectionName: string): string {
    // Match a section by name up to the next all-caps section header
    const regex = new RegExp(
        `${sectionName}[\\s\\S]*?(?=\\n[A-Z][A-Z\\s]{3,}\\n|$)`,
        "i"
    );
    const match = text.match(regex);
    return match ? match[0] : "";
}

function extractSkills(text: string): string[] {
    const section = extractSection(text, "SKILLS");
    if (!section) return [];

    const skills = section
        .replace(/SKILLS/i, "")
        .split(/[\n,|·•\/]/)
        .map((s) => s.trim())
        .filter((s) => s.length > 1 && s.length < 40)
        .filter((s) => !/^\d+$/.test(s));

    return [...new Set(skills)];
}

function extractExperience(text: string): ExperienceEntry[] {
    const section = extractSection(text, "EXPERIENCE");
    if (!section) return [];

    const entries: ExperienceEntry[] = [];
    // Pattern: Role at/@ Company | Date range
    const lines = section.split("\n").filter((l) => l.trim());

    let i = 0;
    while (i < lines.length) {
        const line = lines[i].trim();
        // Detect lines with date patterns like "Jan 2023 – Dec 2023" or "2022 - Present"
        const dateMatch = line.match(
            /(\w+[\s,]+\d{4})\s*[-–—]\s*(present|\w+[\s,]+\d{4})/i
        );

        if (dateMatch && i > 0) {
            const headerLine = lines[i - 1]?.trim() ?? "";
            // Try to split "Role at Company" patterns
            const roleCompanyMatch = headerLine.match(
                /^(.+?)\s+(?:at|@|,)\s+(.+)$/i
            );

            const role = roleCompanyMatch ? roleCompanyMatch[1].trim() : headerLine;
            const company = roleCompanyMatch
                ? roleCompanyMatch[2].trim()
                : "Unknown";

            // Collect description lines until next date line
            const descLines: string[] = [];
            let j = i + 1;
            while (
                j < lines.length &&
                !lines[j].match(
                    /(\w+[\s,]+\d{4})\s*[-–—]\s*(present|\w+[\s,]+\d{4})/i
                )
            ) {
                if (lines[j].trim()) descLines.push(lines[j].trim());
                j++;
            }

            entries.push({
                role,
                company,
                description: descLines.join(" ").slice(0, 500),
                startDate: `${dateMatch[1]}`,
                endDate: /present/i.test(dateMatch[2]) ? null : dateMatch[2],
            });
        }
        i++;
    }

    return entries;
}

function extractProjects(text: string): ProjectEntry[] {
    const section = extractSection(text, "PROJECTS");
    if (!section) return [];

    const entries: ProjectEntry[] = [];
    const lines = section
        .split("\n")
        .filter((l) => l.trim())
        .slice(1); // skip "PROJECTS" header

    let i = 0;
    while (i < lines.length) {
        const line = lines[i].trim();
        // Project titles tend to be short, capitalized, and not full sentences
        if (line.length < 80 && /^[A-Z]/.test(line) && !line.endsWith(".")) {
            const title = line;
            const descLines: string[] = [];
            const techStack: string[] = [];

            let j = i + 1;
            while (j < lines.length) {
                const nextLine = lines[j].trim();
                if (nextLine.length < 80 && /^[A-Z]/.test(nextLine) && !nextLine.endsWith(".")) {
                    break; // next project title
                }
                // Tech stack line often starts with "Tech:" or contains known tech words
                if (/^(Tech|Stack|Built with|Technologies):/i.test(nextLine)) {
                    techStack.push(
                        ...nextLine
                            .replace(/^.*?:/i, "")
                            .split(/[,|·]/)
                            .map((s) => s.trim())
                            .filter(Boolean)
                    );
                } else {
                    descLines.push(nextLine);
                }
                j++;
            }

            entries.push({
                title,
                description: descLines.join(" ").slice(0, 400),
                techStack,
            });
            i = j;
        } else {
            i++;
        }
    }

    return entries;
}

function extractEducation(text: string): EducationEntry[] {
    const section = extractSection(text, "EDUCATION");
    if (!section) return [];

    const entries: EducationEntry[] = [];
    const lines = section
        .split("\n")
        .filter((l) => l.trim())
        .slice(1);

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        // Detect year (4 digits between 2000–2035)
        const yearMatch = line.match(/20[0-2][0-9]/);
        if (yearMatch && i > 0) {
            entries.push({
                institution: lines[i - 1]?.trim() ?? "Unknown Institution",
                degree: line.replace(yearMatch[0], "").trim(),
                year: yearMatch[0],
            });
        }
    }

    return entries;
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export async function parseResume(
    pdfPath?: string
): Promise<ParsedResume | null> {
    const filePath =
        pdfPath ??
        path.join(process.cwd(), "Dhruv Soin - Resume.pdf");

    if (!fs.existsSync(filePath)) {
        console.warn(`[Resume Parser] PDF not found at: ${filePath}`);
        return null;
    }

    try {
        const buffer = fs.readFileSync(filePath);
        const { text } = await pdfParse(buffer);

        return {
            rawText: text,
            skills: extractSkills(text),
            education: extractEducation(text),
            experience: extractExperience(text),
            projects: extractProjects(text),
        };
    } catch (err) {
        console.error("[Resume Parser] Failed to parse PDF:", err);
        return null;
    }
}
