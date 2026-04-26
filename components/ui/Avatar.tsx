import type { CSSProperties } from "react";

export type AvatarSize = "sm" | "default" | "lg";

export interface AvatarProps {
  /**
   * Display name. Only the first character of the first whitespace-split word
   * is rendered as an uppercase initial. Empty / whitespace / undefined falls
   * back to a single placeholder character without throwing.
   */
  name?: string;
  size?: AvatarSize;
  /**
   * Background override. Pass a CSS variable reference such as
   * `var(--teal-deep)`; raw hex strings violate the design contract.
   */
  bg?: string;
  className?: string;
}

const PLACEHOLDER = "?";

const sizeMap: Record<AvatarSize, { box: number; font: number }> = {
  sm: { box: 24, font: 10 },
  default: { box: 32, font: 12 },
  lg: { box: 56, font: 18 },
};

const initialFor = (name: string | undefined): string => {
  if (typeof name !== "string") return PLACEHOLDER;
  const trimmed = name.trim();
  if (trimmed.length === 0) return PLACEHOLDER;
  const first = trimmed.split(/\s+/)[0];
  const ch = [...first][0];
  return ch ? ch.toUpperCase() : PLACEHOLDER;
};

export function Avatar({
  name,
  size = "default",
  bg,
  className,
}: AvatarProps) {
  const { box, font } = sizeMap[size];
  const sizeClass = size === "default" ? "" : size;
  const classes = ["avatar", sizeClass, className].filter(Boolean).join(" ");

  const style: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: box,
    height: box,
    background: bg ?? "var(--teal)",
    color: "var(--paper)",
    fontFamily: "var(--sans)",
    fontWeight: 500,
    fontSize: font,
    letterSpacing: "-0.01em",
    borderRadius: "50%",
    flexShrink: 0,
  };

  const trimmedName = typeof name === "string" ? name.trim() : "";
  const hasName = trimmedName.length > 0;

  return (
    <span
      className={classes}
      style={style}
      role={hasName ? "img" : undefined}
      aria-label={hasName ? trimmedName : undefined}
      aria-hidden={hasName ? undefined : true}
    >
      {initialFor(name)}
    </span>
  );
}

export default Avatar;
