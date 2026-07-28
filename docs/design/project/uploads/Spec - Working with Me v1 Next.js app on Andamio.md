---
status: open
priority: high
scheduled: 2026-04-26
estimate: 0
contexts:
  - andamio
  - working-with-me
projects:
  - working-with-me
tags:
  - task
  - spec
  - agency
---

# Spec — Working with Me v1 (Next.js app on Andamio)

Draft spec in agency's 7-section format. Lives in orch until James decides to hand off to agency. Single-tenant v1: ships James's own brief on Andamio APIs; multi-tenant + monetization layers are explicitly out of scope.

Target repo: `~/projects/01-projects/working-with-me/` (fresh, empty git init as of 2026-04-26).

---

## 1. Problem

Both AI and human collaborators struggle to align with how James actually works. The rules and philosophy that govern a productive collaboration with him exist — but scattered across the orch vault (`.claude/CLAUDE.md`, `.claude/skills/write/`, an internal strategy note), the zettelkasten (`wiki/creative/writing.md`, `wiki/andamio/`, `wiki/ideas/*`), voice memos, and codified Claude skills. There is no single artifact a collaborator can read, engage with, and become calibrated by.

This v1 ships James's own working-with-me brief as a single-tenant Next.js app on Andamio APIs. It proves the working-with-me pattern (read → respond → connect, mapped onto Andamio's enroll → submit → credential primitives) before any multi-tenant or monetization layer.

The pattern is "Built on Andamio" — the same shape as `cardano-xp` and `midnight-pbl`, codified in `~/projects/02-areas/andamio/.claude/knowledge/built-on-andamio-patterns.md`.

## 2. Requirements

### P0 (must ship in v1)

- P0-1: Next.js 15 + TypeScript + Tailwind app at `~/projects/01-projects/working-with-me/`. Mesh SDK in client-only components.
- P0-2: All Andamio API calls go through a server-side proxy route that injects `X-API-Key`. Key never reaches the client bundle.
- P0-3: Brief content (sections + qualification questions) is fetched from a single Andamio course identified by env-var `course_id` (cardano-xp single-tenant pattern). Content is NOT baked into source.
- P0-4: Anonymous read path — visitor without a wallet can read the full brief.
- P0-5: Wallet read+respond path — visitor can connect a Cardano wallet via Mesh SDK, answer section-level qualification questions, submit responses.
- P0-6: Successful submission triggers credential issuance via the Andamio gateway (the "connection badge" — a real on-chain mark of a calibrated collaborator).
- P0-7: Andamio terminology never appears in the user-facing UI. The mapping (course → "the brief", module → "section", SLT → "qualification question", credential → "connection badge") is hidden inside the implementation.
- P0-8: Editorial voice in all UI copy: short sentences, no hedging, no em-dashes, no AI-slop tells (no "let's dive in", no marketing triplets). Source of truth: `~/projects/02-areas/andamio/.claude/skills/write/writing-reference.md` + `.claude/knowledge/synthesis-patterns/feedback_no_self_congratulation.md`.

### P1 (should ship in v1)

- P1-1: Type-safety against Andamio gateway via generated types — `npx swagger-typescript-api generate -p https://preprod.api.andamio.io/api/v1/docs/doc.json`.
- P1-2: Cloud Run deployment via GitHub Actions with Workload Identity Federation (matching `midnight-pbl` deployment pattern). Target GCP project: `built-on-andamio`.
- P1-3: Submission state surfaces correctly in the UI — pending, approved, rejected, error states are distinct and recoverable.

## 3. Where

Real file paths the implementation will create or modify.

**New files in target repo (`~/projects/01-projects/working-with-me/`):**
- `package.json` — Next.js 15, React 18, Mesh SDK (`@meshsdk/core`, `@meshsdk/react`), Tailwind, generated gateway types.
- `next.config.mjs` — webpack config to keep wallet/crypto deps out of SSR bundle.
- `tailwind.config.ts`, `postcss.config.mjs`.
- `app/layout.tsx`, `app/page.tsx` — shell + brief landing.
- `app/api/gateway/[...path]/route.ts` — server proxy injecting `X-API-Key`. Allowlists specific Andamio gateway paths.
- `app/api/auth/login/route.ts` — wraps `POST /api/v2/auth/login/session` and `POST /api/v2/auth/login/validate` to return a JWT.
- `components/wallet/WalletConnect.tsx` — `'use client'` Mesh SDK wallet connection.
- `components/brief/BriefRenderer.tsx` — fetch course detail + render sections (server component for read path).
- `components/brief/QualificationForm.tsx` — `'use client'` per-section question form + submit handler.
- `lib/gateway/client.ts` — typed wrapper around the proxy route.
- `lib/gateway/types.generated.ts` — output of swagger-typescript-api codegen.
- `.env.example` — `ANDAMIO_API_KEY`, `ANDAMIO_GATEWAY_URL=https://preprod.api.andamio.io`, `ANDAMIO_COURSE_ID`, `ANDAMIO_NETWORK=preprod`.
- `.github/workflows/deploy.yml` — Cloud Run deploy via WIF.
- `Dockerfile` — Next.js standalone build for Cloud Run.
- `README.md` — local setup, env vars, Andamio course provisioning steps.

**Andamio gateway endpoints consumed (preprod base: `https://preprod.api.andamio.io`):**
- `POST /api/v2/auth/login/session` — wallet nonce.
- `POST /api/v2/auth/login/validate` — JWT exchange.
- `GET  /api/v2/course/detail/{courseId}` — fetch the brief.
- `POST /api/v2/course/student/register` — submit qualification responses.
- `POST /api/v2/course/credential/issue` — issue connection badge.

**Reference patterns (read, do not copy):**
- `~/projects/02-areas/andamio/.claude/knowledge/built-on-andamio-patterns.md` — common API integration + deployment patterns.
- `~/projects/01-projects/cardano-xp/` — single-course env-var pattern.
- `~/projects/01-projects/midnight-pbl/` — Cloud Run + WIF GitHub Actions pattern.

## 4. Tests

### Invariants (must always hold)

- INV-1: `ANDAMIO_API_KEY` does not appear in any client bundle. Verified by grepping `.next/static/` after a production build.
- INV-2: Every fetch from a client component to Andamio data goes through `/api/gateway/*`. No direct calls to `preprod.api.andamio.io` from client code.
- INV-3: Mesh SDK imports appear only in files marked `'use client'` or in `app/api/*` routes. Verified by static check of import graph.
- INV-4: The proxy route allowlists Andamio gateway paths — arbitrary upstream paths are rejected with 404.
- INV-5: User-facing copy contains no Andamio-internal terms (`course`, `module`, `SLT`, `credential issuance`, `student`, `teacher`).

### Behaviors to verify

- BEH-1: Anonymous visit to `/` renders the brief with all sections fetched from the configured `ANDAMIO_COURSE_ID`. Page works without wallet.
- BEH-2: Connecting a wallet via Mesh SDK exchanges a signed nonce for a JWT and persists session client-side.
- BEH-3: An authenticated visitor can submit answers to a section's qualification questions; the submission lands at `POST /api/v2/course/student/register` via the proxy.
- BEH-4: A successful submission triggers `POST /api/v2/course/credential/issue` and the UI surfaces "connection badge issued" with a transaction reference.
- BEH-5: A failed Andamio gateway call (timeout, 5xx, malformed payload) shows a user-actionable error and does not lock the UI.
- BEH-6: Voice-rule check on UI copy — the audit script (or manual review against `writing-reference.md`) flags em-dashes, AI-slop tells, and marketing triplets.

### Edge cases

- EDGE-1: Wallet rejection of signature — UI returns to a clean "connect wallet" state with a clear message.
- EDGE-2: Course content empty or missing sections — UI renders a graceful empty state, not a broken layout.
- EDGE-3: Submission attempted while session JWT is expired — automatic re-auth prompt, then resume submission.
- EDGE-4: Production build with missing `ANDAMIO_COURSE_ID` env var — build fails fast with a clear error, not at runtime.

## 5. Acceptance Criteria

Each AC is binary testable.

- AC-1: `pnpm install && pnpm build && pnpm typecheck` all succeed on a clean clone of `~/projects/01-projects/working-with-me/`.
- AC-2: Anonymous visit to `/` renders brief sections fetched from Andamio course identified by `ANDAMIO_COURSE_ID`.
- AC-3: A grep for `ANDAMIO_API_KEY` against the production client bundle (`.next/static/`) returns zero matches.
- AC-4: All Andamio gateway calls in source originate from `app/api/gateway/*` or `app/api/auth/*` (server-side); zero calls from `components/` or other client paths.
- AC-5: Wallet connect button appears in the layout; clicking it opens Mesh SDK wallet selector and on selection performs nonce → signature → JWT exchange.
- AC-6: An authenticated visitor can submit a per-section qualification response and receives a UI confirmation tied to a real Andamio submission ID.
- AC-7: Successful submission triggers credential issuance and the UI shows the resulting transaction reference (or pending state if the tx is in flight).
- AC-8: User-facing copy contains zero instances of Andamio-internal terms (verified by string check against the term list in INV-5).
- AC-9: User-facing copy contains zero em-dashes and zero AI-slop tells from `feedback_no_self_congratulation.md`.
- AC-10: `.github/workflows/deploy.yml` deploys to Cloud Run via WIF (no service-account JSON keys); deploy succeeds end-to-end on a push to `main`.
- AC-11: All env vars are present in `.env.example` and a missing required env var fails the build (not runtime).
- AC-12: `lib/gateway/types.generated.ts` is produced by `pnpm generate:types` against `https://preprod.api.andamio.io/api/v1/docs/doc.json` and used by the typed gateway client.

## 6. Anti-Requirements

- Must NOT be multi-tenant in v1. Only James's brief.
- Must NOT include subscription, payment, or platform-fee logic.
- Must NOT include trust-network, social-graph, or member-discovery features.
- Must NOT include real-time collaboration, WebSockets, or chat.
- Must NOT expose Andamio-internal terminology to users (`course`, `module`, `SLT`, `student`, `teacher`, `credential issuance`).
- Must NOT bundle Mesh SDK or other wallet/crypto code into the SSR path.
- Must NOT reference, import, or copy code from `~/projects/01-projects/working-with-me-platform/` (the abandoned Vite repo). Concept-mapping inspiration is captured here in this spec; the prior repo is out of scope going forward.
- Must NOT bake brief content into source. All section content + qualification questions live in the Andamio course identified by env var.
- Must NOT add enterprise SSO, native mobile apps, or analytics dashboards in v1.
- Must NOT use Vite. Stack is fixed: Next.js 15 with the App Router.
- Must NOT hardcode `course_id`, `gateway_url`, or `network` — env-driven only.

## 7. Context

### Concept lineage (do not expose to users)

The app maps Andamio's education primitives onto a connection flow. Treat the table as implementation detail; surface only the user-facing terms in UI copy.

| Andamio (internal) | Working with Me (user-facing) |
|--------------------|--------------------------------|
| Course             | The brief                      |
| Course module      | Section of the brief           |
| Module SLT         | Qualification question         |
| Course registration / submission | Connection request   |
| Credential issuance | Connection badge              |

The principle, from `built-on-andamio-patterns.md`: the education flow (enroll → learn → submit → credential) becomes a connection flow (discover → read → respond → connect). The badge proves a real, calibrated relationship — not course completion.

### Source material for brief content (separate workstream)

The brief's actual content — sections, manifesto copy, qualification questions — gets authored as Andamio course content in a separate step (likely via the Andamio CLI). The research that surfaces what to write lives in:

**From orch (`/Users/james/projects/02-areas/andamio/`):**
- `.claude/CLAUDE.md` — Three Orchestrators, daily rhythm, rules, what James keeps vs delegates.
- `.claude/skills/write/writing-reference.md` — voice rules.
- `.claude/knowledge/synthesis-patterns/feedback_no_self_congratulation.md` — anti-patterns in copy.
- the 2026-03-21 enterprise-launch amendment (internal) — source-leadership thinking, money flow.
- the internal context note — current chain-of-work framing.

**From the personal knowledge base (internal):**
- `wiki/creative/writing.md` — pace layering, "no AI slop walls".
- `wiki/andamio/techstars-experience.md` — "treat people as ends, not means".
- `wiki/ideas/requesting.md` — productive requesting (who, by when).
- `wiki/ideas/depth-of-doing.md` — sustained deep project as the unit of meaningful work.
- `wiki/ideas/fear-love-and-burnout.md` — LUD/LOMO reframing, choosing love.
- `wiki/ideas/power-and-agency.md` — facilitation as enabling agency.
- `wiki/andamio/midnight-strategy.md` — public achievement, private evidence.

These sources feed the *content* of the brief; this spec describes the *app* that hosts it.

### Built-on-Andamio patterns to reuse

- Server proxy that injects `X-API-Key` (avoids ever exposing the key client-side).
- Single-course env-var pattern from `cardano-xp` — `course_id` from `.env`, no URL params for the brief.
- Cloud Run + WIF + GitHub Actions deployment from `midnight-pbl`.
- Mesh SDK wallet code in client-only components — Next.js App Router with `'use client'` boundaries makes the SSR/wallet polyfill problem (which bit `midnight-pbl` on Vite) avoidable.
- Andamio gateway preprod (`preprod.api.andamio.io`) is allowed without confirmation per global CLAUDE.md.

### Network policy

- Default to preprod for v1. Mainnet switch is a future deploy-time decision, not a code branch.

### Out of scope (revisit after v1 ships)

- Multi-tenant: anyone publishes their own brief.
- Subscription / one-time fee for brief creation.
- Trust network: badges from one brief vouch into another.
- Notifications, email, push.
- Analytics on who-read-what.
- Native mobile.

---

## Handoff readiness check (against agency Spec Format Sync)

- [x] 7 canonical sections present (Problem, Requirements, Where, Tests, Acceptance Criteria, Anti-Requirements, Context).
- [x] WHERE references actual files/functions.
- [x] TESTS includes invariants AND edge cases.
- [x] Requirements specific enough for an autonomous agent (P0 / P1 tagged).
- [x] Acceptance criteria binary testable (AC-N prefix).
- [x] Anti-Requirements state what must NOT change or be added.
- [x] Cross-validation: Anti-Reqs do not contradict ACs (Vite is forbidden, Next.js is required; multi-tenant is forbidden, single-tenant env-var is required; etc.).
- [x] Stays under decomposer thresholds (≤12 files referenced in Where, ≤20 ACs).
- [ ] **Pending James's review.** Once approved, this is "Ready for Work" — moves to a GitHub issue on the agency project board for the target repo.
