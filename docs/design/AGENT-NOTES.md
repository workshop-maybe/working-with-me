# Design Direction — Agent Notes

**Anchor: V1 — "Signal field"** (`docs/design/project/v1.jsx` + `docs/design/project/styles/v1.css`).

V2 and V3 are inspiration sources. On conflict, V1 wins.

## What to read, in order

1. `docs/design/README.md` — bundle README from Claude Design.
2. `docs/design/chats/chat1.md` — full back-and-forth that produced these directions. The user pivoted twice; the final framing (multi-tenant, vocabulary = Assignment / Commitment / Connection / Credential, signal/beacon metaphor) is what we ship.
3. `docs/design/project/styles/base.css` — shared design system tokens (colors, type, primitives, the credential-token component). All three variations import this.
4. `docs/design/project/v1.jsx` + `docs/design/project/styles/v1.css` — the anchor.
5. `docs/design/project/v2.jsx`, `v3.jsx`, `styles/v2.css`, `styles/v3.css` — inspiration only.

## What to ignore

- `docs/design/project/Working with Me - Three Directions.html` — design-canvas wrapper for browsing the three artboards side by side. Implementation does not need it.
- `docs/design/project/working-with-me-print.html` — print/PDF version.
- `docs/design/project/design-canvas.jsx`, `tweaks-panel.jsx`, `shared.jsx` (only the bits that aren't canvas/tweak chrome) — design-tool scaffolding.

## Visual rules carried over from the design

- Two-color brand: deep teal (`--teal #1A4856`) + warm cream (`--paper #F4EFE6`). No orange-on-foreground reverse cards (we burned that on the Andamio landing).
- Type pairing: **Geist** (geometric sans) + **Newsreader** (humanist serif, italic accents). Mono is **IBM Plex Mono**, never JetBrains Mono.
- Signal coral (`--signal #D8553A`) is the single accent. Use sparingly — emphasis only.
- Section dividers are hairlines (`--rule`), never dashed.
- Buttons are pill-shaped, no offset shadow.
- The credential is a real recurring artifact (`.cred-token` in `base.css`): teal disc, concentric rings, two parties' names with an italic ampersand. It must appear in: profile, inbox, gated unlock, network views.

## Vocabulary discipline (from spec INV-5)

User-facing copy never says: `course`, `module`, `student`, `teacher`, `assignment submission`, `credential issuance`, `SLT`. Use: **Assignment**, **Commitment**, **Connection**, **Credential**, **your space**, **more about how I work**.

## Voice

Short sentences. No em-dashes. No "It's not just X — it's Y." No hedging. Person-to-person, plural voice ("post yours", "see who's working on what"), warmer than a tool landing.

See `~/projects/02-areas/andamio/.claude/skills/write/writing-reference.md`.
