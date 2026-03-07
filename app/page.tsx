// Temporary placeholder — replaced in Phase 4 with full Home page
export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <div className="text-center space-y-4">
        <div className="w-3 h-3 rounded-full bg-accent mx-auto animate-pulse" />
        <h1
          className="text-4xl font-bold text-text"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Dhruv Soin
        </h1>
        <p className="text-muted text-lg">AI & Data Science Builder</p>
        <p className="text-muted/60 text-sm font-mono" style={{ fontFamily: "var(--font-code)" }}>
          Phase 3 ✅ — Layout & Design System complete
        </p>
      </div>
    </div>
  );
}
