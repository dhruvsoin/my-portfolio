"use client";

/**
 * luma-spin.tsx
 * Luma-style animated spinner — themed to match portfolio design system.
 * Keyframes (loaderAnim) are defined in globals.css.
 */

interface LumaSpinProps {
  /** Size in pixels (default: 65) */
  size?: number;
  /** Spinner color; defaults to portfolio accent (champagne gold) */
  color?: string;
  /** Additional Tailwind class names on the wrapper */
  className?: string;
}

export const LumaSpin = ({
  size = 65,
  color = "#e5b567",
  className = "",
}: LumaSpinProps) => {
  const spanStyle: React.CSSProperties = {
    display: "block",
    border: `3px solid ${color}`,
    borderRadius: "50px",
    position: "absolute",
  };

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      aria-label="Loading"
      role="status"
    >
      <span className="animate-loaderAnim" style={spanStyle} />
      <span className="animate-loaderAnim animation-delay-luma" style={spanStyle} />
    </div>
  );
};

/** Drop-in alias for demo.tsx compatibility */
export const Component = LumaSpin;


