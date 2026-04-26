import type { CSSProperties, ReactNode } from "react";

export interface MonoTagProps {
  className?: string;
  children?: ReactNode;
}

const baseStyle: CSSProperties = {
  fontFamily: "var(--mono)",
  fontWeight: 500,
  fontSize: 11,
  lineHeight: 1,
  letterSpacing: "0.02em",
  color: "var(--muted)",
};

export function MonoTag({ className, children }: MonoTagProps) {
  const classes = ["mono-tag", className].filter(Boolean).join(" ");
  return (
    <span className={classes} style={baseStyle}>
      {children}
    </span>
  );
}

export default MonoTag;
