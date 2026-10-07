import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Bypass RLS for bulk operations
);

const rebuildAchievements = async () => {
    // 1. Delete all achievements from 2024 onwards to clear the slate for the rebuild
    // This preserves older achievements from 2022/2023.
    console.log("Deleting existing 2024-2026 achievements to prevent duplicates...");
    const { error: deleteError } = await supabase
        .from("achievements")
        .delete()
        .gte("date", "2024-01-01");
        
    if (deleteError) {
        console.error("Error deleting old records:", deleteError);
        return;
    }

    // 2. Insert structured hackathons
    const hackathons = [
        { title: "Runner Up - Skill-A-Thon", description: "Secured the Runner Up position in the Skill-A-Thon competition.", category: "hackathon", date: "2025-01-15" },
        { title: "2nd Prize - Ideathon'25 (SIH)", description: "Secured 2nd prize at the Ideathon'25 (SIH).", category: "hackathon", date: "2025-09-15" },
        { title: "1st Place - SUDO//BUILD", description: "Secured 1st Place at SUDO//BUILD International 24-Hour Hackathon hosted at Christ University Central Campus. Emerged top among 200 teams from 6 countries.", category: "hackathon", date: "2025-09-20" },
        { title: "Top 4 - HackSpora'25", description: "Ranked in the Top 4 out of 143 teams at the National 24-Hour Hackathon HackSpora'25, hosted by Karpagam Academy.", category: "hackathon", date: "2025-09-25" },
        { title: "2nd Prize - Hackverse 2.0", description: "Secured 2nd Prize at Hackverse 2.0 National 24-Hour Hackathon hosted by KJU.", category: "hackathon", date: "2025-09-30" },
        { title: "1st Prize - UiPath Agentic AI Hackathon", description: "Secured 1st Prize at the UiPath Agentic AI National Level Hackathon.", category: "hackathon", date: "2025-10-15" },
        { title: "Top 12 Teams - Aarohan Viksit Bharat Hackathon", description: "Ranked among the Top 12 teams at the National Level Aarohan Viksit Bharat Hackathon, hosted by IIT Bombay.", category: "hackathon", date: "2025-12-15" },
        { title: "2nd Prize - Techkriti'26", description: "Secured 2nd Prize at the National Level Hackathon at Techkriti'26, St. Francis De Sales College.", category: "hackathon", date: "2026-01-15" },
        { title: "1st Prize - TechBiz", description: "Won 1st Prize at the TechBiz National 24-Hour Hackathon hosted by Presidency University.", category: "hackathon", date: "2026-02-15" },
        { title: "1st Prize - Qlik Datathon 2026", description: "Won 1st Prize at the prestigious Qlik Datathon 2026.", category: "hackathon", date: "2026-08-15" },
    ];

    // 3. Insert structured awards
    const awards = [
        { title: "Finalist - SynchroTech'24", description: "Reached the finals in the IT Manager and Debate Duel events at SynchroTech'24.", category: "award", date: "2024-09-15" },
        { title: "1st Prize - Tech Tank (Syntaxia'25)", description: "Won 1st Prize in the Tech Tank event at Syntaxia'25.", category: "award", date: "2025-01-20" },
        { title: "Top 3 - IT Manager (Aprameya'25)", description: "Secured a Top 3 finish in the IT Manager event at Aprameya'25, NMIT.", category: "award", date: "2025-02-15" },
        { title: "Multiple Wins - Techknack'25", description: "Secured 1st Prize in Cryptography, 1st Prize in Pixel Punchlines, and emerged as a Finalist in JAM and Treasure Hunt at Techknack'25, JNC.", category: "award", date: "2025-03-10" },
        { title: "2nd Prize - Tech Search (Avyukta'25)", description: "Secured 2nd Prize in the Tech Search event at Avyukta'25, SMVIT.", category: "award", date: "2025-03-15" },
        { title: "Top 6 - Panelist (Innoverse'25)", description: "Ranked in the Top 6 as a Panelist at Innoverse'25.", category: "award", date: "2025-03-20" },
        { title: "Top 10 - Digithon", description: "Ranked in the Top 10 at Digithon, Ramaiah Institute of Technology.", category: "award", date: "2025-03-25" },
        { title: "Participant - Algo Rhythm 2.0", description: "Participated in Algo Rhythm 2.0 by Gopalan Institute of Technology.", category: "award", date: "2025-03-28" },
        { title: "1st Prize - Tech Mafia (Connect 8.4)", description: "Won 1st Prize in Tech Mafia at Connect 8.4, St. Francis Hyderabad.", category: "award", date: "2025-08-15" },
        { title: "Participant - Interface", description: "Participated in Interface at Christ University.", category: "award", date: "2025-08-20" },
        { title: "2x Winner & 2x Title Holder - SynchroTech'25", description: "Secured 1st Prize in Spider Trail and Data Storytelling, and earned Title Winner accolades for Data Maverick and IT Manager at SynchroTech'25.", category: "award", date: "2025-10-25" },
        { title: "1st Prize - IT Manager (Academix Mega Fest)", description: "Won 1st Prize in IT Manager at the Academix Mega Fest, St. Claret College.", category: "award", date: "2025-11-15" },
        { title: "1st Prize - Pixel Punchlines (Techknack'26)", description: "Won 1st Prize in the Pixel Punchlines event at Techknack'26, JNC.", category: "award", date: "2026-02-20" },
        { title: "2nd Prize - System Architect (Meta Minds 1.0)", description: "Secured 2nd Prize as a System Architect at Meta Minds 1.0, SJU.", category: "award", date: "2026-03-15" },
    ];

    // 4. Insert structured milestones
    const milestones = [
        { title: "Event Member (IT Manager) - Xactitude", description: "Volunteered during 1st year for the university's flagship inter-university fest Xactitude.", category: "milestone", date: "2025-01-10" },
        { title: "Core Team - Hackverse", description: "Helped organize Hackverse, the first-ever hackathon hosted by the college.", category: "milestone", date: "2025-02-10" },
        { title: "Event Head (Panel Discussion) - Innoverse 2026", description: "Led the Panel Discussion event at Innoverse 2026.", category: "milestone", date: "2026-01-10" },
        { title: "Research Paper Publication", description: "Presented first research paper, 'ROME for Large Concept Models: Rank-One Model Editing in Sentence Representation Space', at the International Conference on Computational Intelligence (ICCI).", category: "milestone", date: "2026-01-12" },
        { title: "Event Head (IT Manager) - Xactitude", description: "Promoted to Event Head during 2nd year for the flagship inter-university fest Xactitude.", category: "milestone", date: "2026-02-10" },
        { title: "Core Team Lead - Pokémon Champions Game Launch", description: "Led the entire Pokémon Champions game launch event at the university.", category: "milestone", date: "2026-06-15" },
        { title: "Coordinator - Synchrotech 2026", description: "Led the coordination for the entire Synchrotech 2026 technical fest.", category: "milestone", date: "2026-09-15" },
    ];

    const allData = [...hackathons, ...awards, ...milestones];
    
    console.log(`Inserting ${allData.length} structured achievements...`);
    const { error: insertError } = await supabase.from("achievements").insert(allData);

    if (insertError) {
        console.error("Error inserting achievements:", insertError);
    } else {
        console.log("Successfully rebuilt achievements!");
    }
}

const addExperience = async () => {
    const experiences = [
        {
            role: "ID Card Program Lead",
            company: "Kristu Jayanti (Deemed to be University)",
            description: "Led the university-wide ID Card Program for two consecutive years (2nd and 3rd year). Managed the end-to-end data processing, verification, and printing operations for all incoming first-year students, coordinating with administration to deliver thousands of IDs at scale.",
            start_date: "2024-07-01",
            end_date: "2026-05-31", // End of 3rd year roughly
        },
        {
            role: "EDA Instructor (Skill Studio)",
            company: "Kristu Jayanti (Deemed to be University)",
            description: "Led two highly successful cohorts in Exploratory Data Analysis (EDA) for junior, senior, and peer students through the university's Skill Studio initiative. Delivered hands-on training in Python and data visualization, resulting in the highest-rated and most successful cohort in the program's history.",
            start_date: "2026-02-01",
            end_date: null,
        },
        {
            role: "Student Secretary",
            company: "Dept. of Computational Studies",
            description: "Appointed as Student Secretary for the department during my final year. Responsible for leading student initiatives, organizing technical events, and bridging the gap between the student body and faculty.",
            start_date: "2026-08-01",
            end_date: null,
        }
    ];

    console.log("Adding new experience roles...");
    const { error } = await supabase.from("experience").insert(experiences);
    if (error) {
        console.error("Error inserting experience:", error);
    } else {
        console.log("Successfully added experience roles!");
    }
}

const run = async () => {
    await rebuildAchievements();
    await addExperience();
}

run();
