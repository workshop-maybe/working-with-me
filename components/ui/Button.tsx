import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

export type ButtonVariant = "pri" | "out" | "ghost" | "cream" | "cream-out";
export type ButtonSize = "sm" | "default";

/**
 * Pill-shaped button primitive. Server-renderable React component.
 *
 * Usage notes:
 * - Variant names map to the `.btn-pri | .btn-out | .btn-ghost | .btn-cream |
 *   .btn-cream-out` class suffixes mirrored from the design source. This
 *   component emits the matching className suffixes so foundation CSS resolves.
 * - Focus ring contract: the `:focus-visible` outline is owned by the
 *   foundation file `app/globals.css` — specifically the generic
 *   `:focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; }`
 *   rule in the base layer, which applies to the rendered `<button>` element.
 *   No `.btn`-scoped focus selector exists; edit `app/globals.css` to change
 *   the focus ring, never this component.
 * - Button is server-renderable: do NOT promote it to a Client Component.
 *   `onClick` forwards as a normal HTML attribute and only fires when the
 *   consuming component is itself a Client Component (the closure is created
 *   on the client). If a downstream handler is not firing, mark the consumer
 *   as a Client Component — never this primitive.
 */
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: ReactNode;
}

const baseStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "12px 20px",
  fontFamily: "var(--sans)",
  fontWeight: 500,
  fontSize: 14,
  lineHeight: 1,
  letterSpacing: "-0.005em",
  border: "1.25px solid transparent",
  borderRadius: "var(--pill, 999px)",
  cursor: "pointer",
  transition:
    "background var(--motion-fast, 160ms), color var(--motion-fast, 160ms), border-color var(--motion-fast, 160ms)",
};

const smStyle: CSSProperties = { padding: "8px 14px", fontSize: 13 };

const variantStyle: Record<ButtonVariant, CSSProperties> = {
  pri: {
    background: "var(--ink)",
    color: "var(--paper)",
    borderColor: "var(--ink)",
  },
  out: {
    background: "transparent",
    color: "var(--ink)",
    borderColor: "var(--ink)",
  },
  ghost: {
    background: "transparent",
    color: "var(--ink)",
    borderColor: "var(--rule)",
  },
  cream: {
    background: "var(--paper)",
    color: "var(--ink)",
    borderColor: "var(--paper)",
  },
  "cream-out": {
    background: "transparent",
    color: "var(--paper)",
    borderColor: "var(--on-deep-mute)",
  },
};

const disabledStyle: CSSProperties = {
  opacity: 0.5,
  cursor: "not-allowed",
};

export function Button({
  variant = "pri",
  size = "default",
  className,
  type = "button",
  style,
  disabled,
  children,
  ...rest
}: ButtonProps) {
  const classes = ["btn", `btn-${variant}`, size === "sm" ? "btn-sm" : "", className]
    .filter(Boolean)
    .join(" ");

  const merged: CSSProperties = {
    ...baseStyle,
    ...variantStyle[variant],
    ...(size === "sm" ? smStyle : {}),
    ...(disabled ? disabledStyle : {}),
    ...style,
  };

  return (
    <button
      {...rest}
      type={type}
      disabled={disabled}
      className={classes}
      style={merged}
    >
      {children}
    </button>
  );
}

export default Button;
