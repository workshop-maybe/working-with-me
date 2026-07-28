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

Multi-tenant platform: anyone with a Cardano wallet posts a doc about what they're working on and how they prefer to work. Other users express interest by commenting + signalling commitment. The poster approves; an Andamio credential issues, forming a verifiable on-chain connection between the two parties. The connection unlocks gated resources about how the owner works.

The credential is a real Andamio credential — programmatically usable by any other app that consumes Andamio's credential surface.

Spec lives in orch until James decides to hand off to agency.

Target repo: `` (fresh, empty git init as of 2026-04-26).

---

## 1. Problem

People who would work well together can't easily find each other, and when they do, the cost of a real introduction is high — there's no shared signal that "we're aligned enough to actually engage." LinkedIn-style networking optimizes for breadth and noise; transactional marketplaces (Upwork, Fiverr) optimize for delivery, not relationship; private DMs and warm intros depend on whoever you already know.

This v1 ships a small platform on Andamio APIs where each user posts a single living doc — what they're working on, how they prefer to work — and engagement happens through a deliberate two-step ritual (comment + commitment), gated by the poster's approval. A successful approval issues an Andamio credential tying the two parties on-chain. Other apps can read those credentials to power discovery, vouching, and access decisions elsewhere in the Andamio ecosystem.

The pattern is "Built on Andamio" — same family as `cardano-xp` and `midnight-pbl`, codified in the internal `built-on-andamio-patterns` note. Andamio's Course primitive is repurposed as a per-user namespace; an Assignment is the user's doc; a Submission is a Commitment; an issued Credential is the connection.

## 2. Requirements

### P0 (must ship in v1)

- P0-1: Next.js 15 (App Router) + TypeScript + Tailwind. Mesh SDK in client-only components.
- P0-2: All Andamio API calls go through a server-side proxy route that injects `X-API-Key`. Key never reaches the client bundle. Proxy allowlists known gateway paths.
- P0-3: Wallet identity throughout — Cardano wallet via Mesh SDK is the only auth model. JWT session via Andamio's wallet auth flow (`/api/v2/auth/login/session` → `/api/v2/auth/login/validate`).
- P0-4: First-time post flow — when a wallet user publishes their first Assignment, the app provisions a per-user Course namespace behind the scenes. The user sees one action ("publish"), not the underlying steps.
- P0-5: Assignment authoring — Markdown body in a single textarea with live preview. Title + body. No rich-text editor in v1.
- P0-6: Public read — anonymous visitor at `/profile/[stakeAddress]` sees the user's Assignment.
- P0-7: Commitment flow — an authenticated visitor on someone else's profile can leave a comment AND click "I'm interested." Both signals are required to register a Commitment. The app maps this to an Andamio Assignment Submission.
- P0-8: Owner approval — the Assignment owner has an inbox at `/me/inbox` listing pending Commitments. Each can be approved or declined with a single action.
- P0-9: Credential issuance — on approval, the app calls Andamio's credential issuance endpoint. The UI surfaces the issued credential reference (transaction id) to both parties.
- P0-10: Gated resources — the owner can author a second Markdown body ("how I work — more"). It is visible only to wallets that hold an issued credential from the owner.
- P0-11: My connections view — `/network` lists wallets the current user holds a credential with (1-degree only in v1).
- P0-12: Andamio terminology never appears in user-facing UI. Mapping (Course → "your space", Module → "more resources", Assignment → "what I'm working on", Submission → "interest", Credential → "connection") is implementation-only.
- P0-13: Editorial voice in all UI copy: short sentences, no hedging, no em-dashes, no AI-slop tells. Source: the internal `writing-reference` note.

### P1 (should ship in v1)

- P1-1: Type-safety against Andamio gateway via `npx swagger-typescript-api generate -p https://preprod.api.andamio.io/api/v1/docs/doc.json`.
- P1-2: Cloud Run deployment via GitHub Actions with Workload Identity Federation (matching `midnight-pbl`). Target GCP project: `built-on-andamio`.
- P1-3: Distinct UI states — pending submission, approved, declined, error — recoverable in all cases.

## 3. Where

Real file paths the implementation will create.

**New files in target repo (``):**

Stack & config:
- `package.json` — Next.js 15, React 18, `@meshsdk/core`, `@meshsdk/react`, Tailwind, `react-markdown`, `@tanstack/react-query`, `zod`.
- `next.config.mjs` — webpack config to keep wallet/crypto deps off the SSR bundle (mark Mesh SDK packages as client-only via `serverComponentsExternalPackages` or transpile rules).
- `tailwind.config.ts`, `postcss.config.mjs`.
- `.env.example` — `ANDAMIO_API_KEY`, `ANDAMIO_GATEWAY_URL=https://preprod.api.andamio.io`, `ANDAMIO_NETWORK=preprod`.
- `Dockerfile` — Next.js standalone output for Cloud Run.
- `.github/workflows/deploy.yml` — Cloud Run deploy via WIF.
- `README.md` — local setup, env vars, Andamio prerequisites.

App routes:
- `app/layout.tsx`, `app/page.tsx` — shell + landing (what this is, connect wallet).
- `app/profile/[address]/page.tsx` — public Assignment view for the given wallet stake address.
- `app/profile/[address]/more/page.tsx` — gated "more resources" view; renders content if requesting wallet holds a credential, else a "request access" CTA.
- `app/me/page.tsx` — current user's own profile.
- `app/me/edit/page.tsx` — author/edit the public Assignment + the gated "more" body.
- `app/me/inbox/page.tsx` — pending Commitments to approve or decline.
- `app/network/page.tsx` — list of wallets the current user holds a credential with.
- `app/api/gateway/[...path]/route.ts` — server proxy injecting `X-API-Key` and forwarding the user's JWT.
- `app/api/auth/login/route.ts` — wraps Andamio nonce + validate flow, returns JWT.

Components (client unless marked otherwise):
- `components/wallet/WalletConnect.tsx` — Mesh SDK wallet connection.
- `components/assignment/AssignmentRenderer.tsx` — server component, renders Markdown.
- `components/assignment/AssignmentEditor.tsx` — Markdown textarea + live preview.
- `components/commitment/CommitmentForm.tsx` — comment field + "I'm interested" button; both required to submit.
- `components/commitment/CommitmentInbox.tsx` — list pending Commitments with approve/decline actions.

Library:
- `lib/gateway/client.ts` — typed wrapper around `/api/gateway/*`.
- `lib/gateway/types.generated.ts` — output of `pnpm generate:types`.
- `lib/identity/address.ts` — wallet → display name resolution; stake-address short form helpers.
- `lib/credentials/check.ts` — given a viewer wallet and an owner wallet, returns whether a credential exists between them.

**Andamio gateway endpoints consumed (preprod base: `https://preprod.api.andamio.io`):**
- `POST /api/v2/auth/login/session` — wallet nonce.
- `POST /api/v2/auth/login/validate` — JWT exchange.
- `POST /api/v2/course/create` — provision a per-user namespace on first post.
- `GET  /api/v2/course/owner/courses/list` — does this wallet have a namespace yet.
- `GET  /api/v2/course/detail/{courseId}` — fetch Assignment + gated "more" content.
- `PUT  /api/v2/course/update` — update Assignment body or gated body.
- `POST /api/v2/course/student/register` — register a visitor in the owner's namespace as part of the Commitment flow.
- `POST /api/v2/course/teacher/approve-student` — owner approves the Commitment.
- `POST /api/v2/course/credential/issue` — issue the credential on approval.
- `GET  /api/v2/course/teacher/pending` — owner's inbox of pending Commitments.
- `GET  /api/v2/course/student/credentials` — visitor's held credentials (powers `/network` and the gated read check).

**Reference patterns (read for guidance, do not copy code):**
- the internal `built-on-andamio-patterns` note — proxy + deployment patterns.
- `$REPOS/cardano-xp/` — single-course env-var pattern (we adapt to per-user dynamic namespaces).
- `$REPOS/midnight-pbl/` — Cloud Run + WIF GitHub Actions.

## 4. Tests

### Invariants (must always hold)

- INV-1: `ANDAMIO_API_KEY` does not appear in any client bundle. Verified by grepping `.next/static/` after a production build.
- INV-2: Every fetch from a client component to Andamio data goes through `/api/gateway/*` or `/api/auth/*`. No direct calls to `preprod.api.andamio.io` from client code.
- INV-3: Mesh SDK imports appear only in files marked `'use client'` or in `app/api/*` server routes. Verified by static check of import graph.
- INV-4: The proxy allowlists Andamio gateway paths; arbitrary upstream paths return 404.
- INV-5: User-facing copy contains no Andamio-internal terms (`course`, `module`, `SLT`, `student`, `teacher`, `credential issuance`, `assignment submission`).
- INV-6: Gated `/profile/[address]/more` content is never rendered server-side or sent in HTML to a viewer who does not hold a valid credential from the owner. The credential check happens server-side before render.

### Behaviors to verify

- BEH-1: A first-time wallet user publishing their first Assignment triggers Course creation, then Assignment publish, in that order. The user sees one action.
- BEH-2: Anonymous visit to `/profile/[address]` for a published wallet renders the Assignment Markdown.
- BEH-3: A wallet visitor leaves a comment AND clicks "I'm interested" on someone else's profile; the app submits both signals and a Commitment lands in the owner's inbox.
- BEH-4: A Commitment with only the comment OR only the interest click is rejected client-side with a clear message; nothing reaches the API.
- BEH-5: The owner approves a Commitment; the app calls `approve-student` then `credential/issue` and the UI surfaces a transaction reference to both parties.
- BEH-6: After approval, the visitor's view of `/profile/[ownerAddress]/more` renders the gated body. Before approval (or after decline), it shows a "request access" CTA.
- BEH-7: `/network` lists every wallet for which the current user holds a credential issued by `credential/issue`.
- BEH-8: A failed Andamio gateway call (timeout, 5xx) shows a user-actionable error and does not lock the UI.

### Edge cases

- EDGE-1: Wallet rejects signature during login — UI returns to a clean "connect wallet" state with a clear message.
- EDGE-2: Owner declines a Commitment — visitor sees declined state, no credential issued, no gated access granted.
- EDGE-3: User edits their Assignment after others have committed — existing Commitments and credentials are preserved; the published doc reflects the latest version.
- EDGE-4: Visitor with an expired JWT attempts to commit — automatic re-auth prompt, then the commit resumes (comment + interest preserved across the re-auth).
- EDGE-5: Production build with missing `ANDAMIO_API_KEY` or `ANDAMIO_GATEWAY_URL` env var — build fails fast, not at runtime.
- EDGE-6: Visitor opens a profile URL for a wallet that has never published — clear "this person hasn't published yet" empty state, no broken layout.

## 5. Acceptance Criteria

Each AC is binary testable.

- AC-1: `pnpm install && pnpm build && pnpm typecheck` all succeed on a clean clone of ``.
- AC-2: A grep for `ANDAMIO_API_KEY` against the production client bundle (`.next/static/`) returns zero matches.
- AC-3: All Andamio gateway calls in source originate from `app/api/gateway/*` or `app/api/auth/*` (server-side); zero direct client-side fetches to `andamio.io`.
- AC-4: A wallet visitor can connect via Mesh SDK and obtain a JWT via the Andamio nonce + validate flow.
- AC-5: A first-time wallet user publishing an Assignment creates a per-user Course namespace and the Assignment in a single user-facing action.
- AC-6: Anonymous visitor at `/profile/[address]` sees the published Assignment for any wallet that has published one.
- AC-7: An authenticated visitor cannot submit a Commitment unless both the comment field is non-empty AND the "I'm interested" action has been taken.
- AC-8: An owner viewing `/me/inbox` sees pending Commitments with approve and decline actions.
- AC-9: Approving a Commitment triggers an Andamio credential issuance and surfaces a transaction reference to both parties in the UI.
- AC-10: A wallet holding a credential from the owner sees the gated body at `/profile/[ownerAddress]/more`; a wallet without that credential sees a "request access" CTA.
- AC-11: The gated body is not present in HTML or JSON sent to an unauthorized viewer (verified by inspecting network responses).
- AC-12: `/network` lists exactly the wallets for which the current user holds an issued credential.
- AC-13: User-facing copy contains zero Andamio-internal terms from INV-5.
- AC-14: User-facing copy contains zero em-dashes and zero AI-slop tells from `feedback_no_self_congratulation.md`.
- AC-15: `.github/workflows/deploy.yml` deploys to Cloud Run via WIF; deploy succeeds end-to-end on push to `main`.
- AC-16: All env vars are present in `.env.example` and a missing required env var fails the build.

## 6. Anti-Requirements

- Must NOT be single-tenant. Anyone with a wallet can publish.
- Must NOT use Vite. Stack is Next.js 15 App Router.
- Must NOT include subscription, payment, or platform-fee logic in v1.
- Must NOT auto-issue credentials. Owner approval is the only path to issuance.
- Must NOT show gated `more` content to a viewer who does not hold a credential from the owner. The check is server-side, not just CSS.
- Must NOT include a public feed of all Assignments. Discovery in v1 is direct-link sharing + the `/network` view of approved connections.
- Must NOT traverse beyond 1-degree connections in v1. Multi-degree network graph is explicitly deferred.
- Must NOT include real-time collaboration, WebSockets, or chat.
- Must NOT include enterprise SSO, native mobile apps, or analytics dashboards.
- Must NOT expose Andamio-internal terminology (`course`, `module`, `SLT`, `student`, `teacher`, `assignment submission`, `credential issuance`) to users.
- Must NOT bundle Mesh SDK or wallet/crypto deps into the SSR path.
- Must NOT reference, import, or copy code from `$REPOS/working-with-me-platform/` (the abandoned Vite repo). Concept-mapping inspiration is captured in this spec; that repo is out of scope.
- Must NOT hardcode `gateway_url`, `network`, or any wallet identity. All env-driven or session-driven.
- Must NOT introduce a custom credential storage layer. Credentials are real Andamio credentials, queryable through Andamio's existing endpoints.

## 7. Context

### Concept lineage (do not expose to users)

The app maps Andamio's education primitives onto a connection flow. The mapping is implementation detail; UI copy uses only the user-facing terms.

| Andamio (internal)              | Working with Me (user-facing)              |
|---------------------------------|--------------------------------------------|
| Course (per user)               | Your space                                 |
| Course teacher                  | The owner (the user themselves)            |
| Assignment                      | What I'm working on (the public doc)       |
| Course module ("more")          | More about how I work (the gated doc)      |
| Assignment Submission           | Commitment (comment + interest)            |
| Submission approval             | Owner approves                             |
| Credential issuance             | Connection                                 |
| Credentials a wallet holds      | Your network                               |

The principle, from `built-on-andamio-patterns.md`: the education flow (enroll → submit → approve → credential) becomes a connection flow (read → commit → approve → connect). The credential is real; other Andamio-aware apps can consume it without any custom integration.

### Discovery model

V1 ships two discovery primitives only:
1. **Direct link sharing** — `/profile/[address]` is a stable, shareable URL. Cold-start discovery happens off-platform (DM, Slack, conference, etc.).
2. **One-degree network view** — `/network` lists approved connections. Once a user has connections, they can navigate to those wallets' profiles and see what those people are working on.

Multi-degree graph traversal, public feeds, search, and topical browsing are deferred. James: "we'll keep exploring as the project develops."

### Why per-user Course (not one-global-Course or topical)

Per-user Course gives every wallet a sovereign namespace they fully control. The owner is the Course teacher, with all the existing Andamio approval and credential-issuance authority. No central moderator. No global Course owner with platform-wide power. This composes cleanly with Andamio's existing identity + permission model.

### Built-on-Andamio patterns reused

- Server proxy that injects `X-API-Key` (key never reaches client).
- Mesh SDK wallet code in client-only components — Next.js App Router with `'use client'` boundaries makes the SSR/wallet polyfill problem (which bit `midnight-pbl` on Vite) avoidable.
- Cloud Run + WIF + GitHub Actions deployment from `midnight-pbl`.
- Andamio gateway preprod (`preprod.api.andamio.io`) is allowed without confirmation per global CLAUDE.md.

### Network policy

V1 deploys against preprod. Mainnet is a future deploy-time decision (env var swap), not a code branch.

### Visual design

The visual direction is **V1 — "Signal field"** from the design package shipped alongside this spec.

- **Anchor:** `docs/design/project/v1.jsx` + `docs/design/project/styles/v1.css`.
- **Shared design system:** `docs/design/project/styles/base.css` (tokens, primitives, the credential-token component).
- **Inspiration only:** V2 (`v2.jsx` / `v2.css`, "Index card stack") and V3 (`v3.jsx` / `v3.css`, "Live ticker"). On conflict V1 wins.
- **Steering notes for agents:** `docs/design/AGENT-NOTES.md` — read this first.
- **Fresh DNA, NOT the Andamio landing palette:** deep teal `#1A4856` + warm cream `#F4EFE6`, Geist (sans) + Newsreader (serif), IBM Plex Mono. Coral `#D8553A` is the single signal accent. No orange-on-foreground reverse cards, no dashed dividers, no JetBrains Mono.
- **Recurring artifact:** the credential token (`.cred-token` in `base.css`) appears in profile, inbox, gated unlock, and network views.
- **Machine-readable rubric:** `.agency/design-system.json` ships the V1 tokens and forbidden patterns; agency injects this into the planner / engineer / designer prompts at runtime.

The design files in `docs/design/` are HTML/CSS/JSX prototypes. Recreate the V1 look in Next.js + Tailwind + CSS variables — match the visual output, do not copy the prototype's component structure verbatim.

### Out of scope (revisit after v1 ships)

- Multi-degree network graph traversal and discovery.
- Public feed, search, tags, topical browsing.
- Subscription / payment / platform fees.
- Rich-text editor for Assignment body.
- Notifications outside the app (email, push).
- Native mobile apps.
- Multi-tier credentials (e.g., distinguishing "interested" vs "actively collaborating").

---

## Handoff readiness check (against agency Spec Format Sync)

- [x] 7 canonical sections present (Problem, Requirements, Where, Tests, Acceptance Criteria, Anti-Requirements, Context).
- [x] WHERE references actual files/functions and Andamio endpoints.
- [x] TESTS includes invariants AND edge cases.
- [x] Requirements specific enough for an autonomous agent (P0 / P1 tagged).
- [x] Acceptance criteria binary testable (AC-N prefix).
- [x] Anti-Requirements state what must NOT change or be added.
- [x] Cross-validation: Anti-Reqs do not contradict ACs.
- [ ] **File count exceeds agency's decomposer threshold (~26 files vs ≤12).** Agency's decomposer agent will split this into 2-5 child issues at planning time. This is the intended workflow for specs of this size; no manual pre-split needed unless James prefers to slice v1 thinner before handoff.
- [ ] **Pending James's review.** Once approved, this is "Ready for Work" — moves to a GitHub issue on the agency project board for the target repo.