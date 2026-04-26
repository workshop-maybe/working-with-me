import type { CSSProperties } from "react";

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
