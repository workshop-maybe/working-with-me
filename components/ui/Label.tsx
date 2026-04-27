import type { CSSProperties, ReactNode } from "react";

export type LabelVariant = "default" | "muted" | "ink" | "cream";

export interface LabelProps {
  /**
   * Color variant. Pick by surface intent, not by color name:
   * - `default` — teal-soft text on the standard paper surface
   * - `muted` — quieter eyebrow text on the standard paper surface
   * - `ink` — strongest eyebrow text on the standard paper surface
   * - `cream` — for placement on deep/dark surfaces (e.g. `--teal-deep`); the
   *   leading dot color shifts from `--signal` to `--signal-soft` to stay legible
   */
  variant?: LabelVariant;
  /** Show the leading 6px signal dot. Defaults to true (opt-OUT, not opt-IN). */
  dot?: boolean;
  className?: string;
  children?: ReactNode;
}

const baseStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  fontFamily: "var(--sans)",
  fontWeight: 500,
  fontSize: 12,
  lineHeight: 1,
  letterSpacing: "0.04em",
  textTransform: "none",
};

const variantColor: Record<LabelVariant, string> = {
  default: "var(--teal-soft)",
  muted: "var(--muted)",
  ink: "var(--ink)",
  cream: "var(--on-deep)",
};

const dotBgFor = (variant: LabelVariant): string =>
  variant === "cream" ? "var(--signal-soft)" : "var(--signal)";

const dotStyle = (variant: LabelVariant): CSSProperties => ({
  width: 6,
  height: 6,
  background: dotBgFor(variant),
  borderRadius: "50%",
  display: "inline-block",
  flexShrink: 0,
});

export function Label({
  variant = "default",
  dot = true,
  className,
  children,
}: LabelProps) {
  const variantClass =
    variant === "default" ? "label" : `label ${variant}`;
  const classes = [variantClass, className].filter(Boolean).join(" ");

  return (
    <span
      className={classes}
      style={{ ...baseStyle, color: variantColor[variant] }}
    >
      {dot ? <span className="dot" style={dotStyle(variant)} aria-hidden="true" /> : null}
      {children}
    </span>
  );
}

export default Label;
