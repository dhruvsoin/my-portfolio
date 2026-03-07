/**
 * Resume parser — extracts structured data from Dhruv Soin - Resume.pdf
 * Uses pdfjs-dist (Node 22+ compatible) instead of pdf-parse.
 *
 * IMPORTANT: Server-side only. Never import in Client Components.
 */

import path from "path";
import fs from "fs";

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

// ─── PDF text extraction (pdfjs-dist) ─────────────────────────────────────────

async function extractTextFromPdf(filePath: string): Promise<string> {
    // Dynamic import — pdfjs-dist is ESM only via the legacy build
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pdfjsLib: any = await import("pdfjs-dist/legacy/build/pdf.mjs");

    const loadingTask = pdfjsLib.getDocument(filePath);
    const doc = await loadingTask.promise;
    let fullText = "";

    for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
        const page = await doc.getPage(pageNum);
        const content = await page.getTextContent();
        const pageText = content.items
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .map((item: any) => ("str" in item ? item.str : ""))
            .join(" ");
        fullText += pageText + "\n";
    }

    return fullText;
}

// ─── Section Helpers ──────────────────────────────────────────────────────────

function extractSection(text: string, sectionName: string): string {
    const regex = new RegExp(
        `${sectionName}[\\s\\S]*?(?=\\n[A-Z][A-Z\\s]{3,}\\n|$)`,
        "i"
    );
    const match = text.match(regex);
    return match ? match[0] : "";
}

function extractSkills(text: string): string[] {
    // Skills are usually in a dense block with separators
    const section = extractSection(text, "SKILLS");
    if (!section) {
        // Fallback: look for known tech keywords anywhere in text
        const knownSkills = [
            "Python", "SQL", "R", "JavaScript", "TypeScript", "Java", "C++",
            "TensorFlow", "PyTorch", "Keras", "scikit-learn", "Pandas", "NumPy",
            "Matplotlib", "Seaborn", "Power BI", "Tableau", "Excel",
            "Next.js", "React", "Node.js", "FastAPI", "Streamlit", "Flask",
            "Supabase", "PostgreSQL", "MySQL", "MongoDB", "Firebase",
            "Git", "GitHub", "Docker", "AWS", "GCP", "Vercel",
            "LangChain", "OpenAI", "RAG", "LLM", "NLP", "Computer Vision",
            "Machine Learning", "Deep Learning", "Data Analysis", "Statistics",
        ];
        return knownSkills.filter((skill) =>
            new RegExp(`\\b${skill}\\b`, "i").test(text)
        );
    }

    const skills = section
        .replace(/SKILLS/i, "")
        .split(/[\n,|·•\/\u2022\u00b7]/)
        .map((s) => s.trim())
        .filter((s) => s.length > 1 && s.length < 40)
        .filter((s) => !/^\d+$/.test(s))
        .filter((s) => s !== "");

    return [...new Set(skills)];
}

function extractExperience(text: string): ExperienceEntry[] {
    const section = extractSection(text, "EXPERIENCE");
    if (!section) return [];

    const entries: ExperienceEntry[] = [];
    const lines = section.split(/\s{2,}|\n/).filter((l) => l.trim());

    let i = 0;
    while (i < lines.length) {
        const line = lines[i].trim();
        const dateMatch = line.match(
            /(\w+[\s,]+\d{4})\s*[-–—]\s*(present|\w+[\s,]+\d{4})/i
        );

        if (dateMatch && i > 0) {
            const headerLine = lines[i - 1]?.trim() ?? "";
            const roleCompanyMatch = headerLine.match(/^(.+?)\s+(?:at|@|,)\s+(.+)$/i);
            const role = roleCompanyMatch ? roleCompanyMatch[1].trim() : headerLine;
            const company = roleCompanyMatch ? roleCompanyMatch[2].trim() : "See resume";

            const descLines: string[] = [];
            let j = i + 1;
            while (
                j < lines.length &&
                !lines[j].match(/(\w+[\s,]+\d{4})\s*[-–—]\s*(present|\w+[\s,]+\d{4})/i)
            ) {
                if (lines[j].trim()) descLines.push(lines[j].trim());
                j++;
            }

            entries.push({
                role,
                company,
                description: descLines.join(" ").slice(0, 500),
                startDate: dateMatch[1],
                endDate: /present/i.test(dateMatch[2]) ? null : dateMatch[2],
            });
        }
        i++;
    }

    return entries;
}

function extractProjects(text: string): ProjectEntry[] {
    const section = extractSection(text, "PROJECT");
    if (!section) return [];

    const entries: ProjectEntry[] = [];
    const lines = section
        .split(/\s{2,}|\n/)
        .filter((l) => l.trim())
        .slice(1);

    let i = 0;
    while (i < lines.length) {
        const line = lines[i].trim();
        if (line.length > 3 && line.length < 100 && /^[A-Z]/.test(line) && !line.endsWith(".")) {
            const title = line;
            const descLines: string[] = [];
            const techStack: string[] = [];

            let j = i + 1;
            while (j < lines.length) {
                const nextLine = lines[j].trim();
                if (nextLine.length > 3 && nextLine.length < 100 && /^[A-Z]/.test(nextLine) && !nextLine.endsWith(".")) {
                    break;
                }
                if (/^(Tech|Stack|Built with|Technologies|Tools):/i.test(nextLine)) {
                    techStack.push(
                        ...nextLine
                            .replace(/^.*?:/i, "")
                            .split(/[,|·]/)
                            .map((s) => s.trim())
                            .filter(Boolean)
                    );
                } else if (nextLine) {
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
        .split(/\s{2,}|\n/)
        .filter((l) => l.trim())
        .slice(1);

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        const yearMatch = line.match(/20[0-2]\d/);
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

export async function parseResume(pdfPath?: string): Promise<ParsedResume | null> {
    const filePath =
        pdfPath ?? path.join(process.cwd(), "Dhruv Soin - Resume.pdf");

    if (!fs.existsSync(filePath)) {
        console.warn(`[Resume Parser] PDF not found at: ${filePath}`);
        return null;
    }

    try {
        const rawText = await extractTextFromPdf(filePath);
        return {
            rawText,
            skills: extractSkills(rawText),
            education: extractEducation(rawText),
            experience: extractExperience(rawText),
            projects: extractProjects(rawText),
        };
    } catch (err) {
        console.error("[Resume Parser] Failed to parse PDF:", err);
        return null;
    }
}
