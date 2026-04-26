import type { CSSProperties, ReactNode } from "react";

export interface FaqRowProps {
  question: ReactNode;
  answer: ReactNode;
  className?: string;
}

const rowStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.6fr)",
  gap: 56,
  padding: "28px 0",
  borderBottom: "1px solid var(--rule)",
  alignItems: "baseline",
};

const questionStyle: CSSProperties = {
  fontFamily: "var(--sans)",
  fontWeight: 500,
  fontSize: 19,
  lineHeight: 1.3,
  letterSpacing: "-0.015em",
  color: "var(--ink)",
};

const answerStyle: CSSProperties = {
  fontFamily: "var(--sans)",
  fontWeight: 400,
  fontSize: 16,
  lineHeight: 1.65,
  letterSpacing: "-0.005em",
  color: "var(--muted)",
  maxWidth: "64ch",
};

export function FaqRow({ question, answer, className }: FaqRowProps) {
  const classes = ["faq-row", className].filter(Boolean).join(" ");
  return (
    <div className={classes} style={rowStyle}>
      <div className="q" style={questionStyle}>
        {question}
      </div>
      <div className="a" style={answerStyle}>
        {answer}
      </div>
    </div>
  );
}

export default FaqRow;
