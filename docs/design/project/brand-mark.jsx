// Brand mark for "Working with Me" — a beacon: a small dot with concentric rings
// Two-tone teal + signal-coral. Geometric, calm.

function WwmMark({ size = 32 }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="15" stroke="#0D2A35" strokeWidth="1.25" fill="#F4EFE6" />
      <circle cx="16" cy="16" r="10.5" stroke="#0D2A35" strokeWidth="0.75" opacity="0.35" />
      <circle cx="16" cy="16" r="6.5" stroke="#0D2A35" strokeWidth="0.75" opacity="0.5" />
      <circle cx="16" cy="16" r="3" fill="#D8553A" />
    </svg>
  );
}
window.WwmMark = WwmMark;

// Compact icons (stroke-based, 24 viewBox)
function Ico({ name, size = 18, ...p }) {
  const s = { width: size, height: size, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", viewBox: "0 0 24 24", ...p };
  switch (name) {
    case "arrow":  return (<svg {...s}><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>);
    case "plus":   return (<svg {...s}><path d="M12 5v14M5 12h14"/></svg>);
    case "check":  return (<svg {...s}><path d="m5 12 4 4 10-10"/></svg>);
    case "x":      return (<svg {...s}><path d="M6 6l12 12M18 6 6 18"/></svg>);
    case "wallet": return (<svg {...s}><path d="M3 7h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M3 7V5a2 2 0 0 1 2-2h13"/><circle cx="17" cy="13.5" r="1.5" fill="currentColor"/></svg>);
    case "lock":   return (<svg {...s}><rect x="5" y="11" width="14" height="9"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>);
    case "unlock": return (<svg {...s}><rect x="5" y="11" width="14" height="9"/><path d="M8 11V8a4 4 0 0 1 7.5-1.5"/></svg>);
    case "search": return (<svg {...s}><circle cx="11" cy="11" r="6"/><path d="m20 20-4-4"/></svg>);
    case "doc":    return (<svg {...s}><path d="M6 3h9l4 4v14H6Z"/><path d="M14 3v5h5"/></svg>);
    case "comment":return (<svg {...s}><path d="M4 5h16v11H8l-4 4Z"/></svg>);
    case "signal": return (<svg {...s}><path d="M3 12c0-5 4-9 9-9s9 4 9 9"/><path d="M7 12c0-3 2-5 5-5s5 2 5 5"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>);
    default: return null;
  }
}
window.Ico = Ico;
