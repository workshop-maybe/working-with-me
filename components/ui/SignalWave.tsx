import type { CSSProperties } from "react";

/**
 * Decorative bar-cluster signal indicator.
 *
 * Color contract:
 * - The bars paint via `background: currentColor`, so the rendered color is
 *   inherited from the closest ancestor that sets the CSS `color` property.
 * - To recolor, wrap `<SignalWave />` in an element that sets `color`
 *   (e.g. `<span style={{ color: "var(--signal)" }}><SignalWave /></span>`).
 * - A `color` prop is intentionally absent from this contract and MUST NOT
 *   be added in future revisions — `currentColor` IS the recoloring API.
 */
export interface SignalWaveProps {
  className?: string;
}

const HEIGHTS = ["30%", "65%", "100%", "75%", "45%", "60%", "35%"] as const;

const containerStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 3,
  height: 18,
};

const barBaseStyle: CSSProperties = {
  width: 3,
  background: "currentColor",
  borderRadius: 1,
  opacity: 0.85,
};

export function SignalWave({ className }: SignalWaveProps) {
  const classes = ["signal-wave", className].filter(Boolean).join(" ");
  return (
    <span className={classes} style={containerStyle} aria-hidden="true">
      {HEIGHTS.map((height) => (
        <span
          key={height}
          className="b"
          style={{ ...barBaseStyle, height }}
        />
      ))}
    </span>
  );
}

export default SignalWave;
