/**
 * Format a date string (YYYY-MM-DD or ISO) to "Month YYYY"
 * e.g. "2024-03-15" → "March 2024"
 */
export function formatDate(dateStr: string | null | undefined): string {
    if (!dateStr) return "Present";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

/**
 * Format a date range: start → end (or "Present")
 */
export function formatDateRange(
    startDate: string,
    endDate: string | null | undefined
): string {
    return `${formatDate(startDate)} – ${formatDate(endDate)}`;
}

/**
 * Format to short month + year: "Mar 2024"
 */
export function formatShortDate(dateStr: string | null | undefined): string {
    if (!dateStr) return "Present";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}
