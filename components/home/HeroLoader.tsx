"use client";

/**
 * HeroLoader.tsx
 * Full-screen loading overlay with tetromino hex animation.
 * Fades out automatically once the hero section is ready.
 */

import { useEffect, useState } from "react";
import TetrominoLoader from "@/components/ui/tetromino-loader";

export default function HeroLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Only show the loader once per session
    const hasSeenLoader = sessionStorage.getItem("hasSeenLoader");
    if (hasSeenLoader) {
      setVisible(false);
      return;
    }

    sessionStorage.setItem("hasSeenLoader", "true");
    
    // Increased timing: 4s delay + 1s fade out (slower animation)
    const timer = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="hero-loader-fade fixed inset-0 z-[9998] bg-bg"
    >
      {/* Subtle grid — mirrors Hero section background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Tetromino hex animation — self-centres via .t-tetrominos CSS */}
      <TetrominoLoader />

      {/* Wordmark — positioned below the hex composition */}
      <p
        className="absolute left-1/2 -translate-x-1/2 text-xs font-mono tracking-[0.3em] uppercase text-muted"
        style={{ top: "calc(50% + 110px)", fontFamily: "var(--font-code)" }}
      >
        dhruv soin
      </p>
    </div>
  );
}

