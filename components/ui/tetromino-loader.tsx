"use client";

/**
 * tetromino-loader.tsx
 * Four hexagonal tetromino pieces that orbit each other endlessly.
 * Themed with portfolio accent gold on charcoal.
 *
 * Computed from SCSS:
 *   $w: 96px  |  $h: 112px
 *   $xspace: 48px  |  $yspace: 27px  |  $speed: 1.5s
 *
 * CSS classes are prefixed "t-" to avoid collisions.
 * Keyframes are defined in globals.css.
 */

export default function TetrominoLoader() {
  return (
    <div className="t-tetrominos">
      <div className="t-tetromino t-box1" />
      <div className="t-tetromino t-box2" />
      <div className="t-tetromino t-box3" />
      <div className="t-tetromino t-box4" />
    </div>
  );
}
