# Working with me

A small Next.js app that turns a Cardano stake address into a public
profile. Visitors see a person's Assignments, Commitments, Connections,
and Credentials in one place.

## Local setup

Prerequisites: pnpm 9, Node 20.

```sh
pnpm install
cp .env.example .env.local
pnpm dev
```

Other scripts:

- `pnpm build` runs the production build.
- `pnpm typecheck` runs `tsc --noEmit`.
- `pnpm lint` runs Next lint.

## Andamio prerequisites

Fill these names in your `.env.local` after copying from `.env.example`.
Reference the names only; never paste values into source or docs.

- `ANDAMIO_API_KEY` is the credential the server uses to authenticate
  outbound calls to the Andamio backend.
- `ANDAMIO_GATEWAY_URL` is the base URL of the Andamio gateway this
  app reads from.
- `ANDAMIO_NETWORK` is the network selector that picks which Andamio
  environment the app talks to.

## Design references

The design materials live under `docs/design/`. Read these before
touching UI:

- [docs/design/AGENT-NOTES.md](docs/design/AGENT-NOTES.md) is the
  vocabulary, voice, and visual rules an agent or contributor must
  follow.
- [docs/design/README.md](docs/design/README.md) is the handoff bundle
  that explains how the design references are organised.

## Vocabulary and voice

Use these user-facing nouns. They are also exported from
`lib/copy/vocabulary.ts` so JSX never hard-codes labels.

- Assignment, Assignments
- Commitment, Commitments
- Connection, Connections
- Credential, Credentials
- your space
- more about how I work

Voice rules:

- No em-dashes. Use commas, periods, or parentheses.
- Short sentences. Plain words.
- No AI-slop tokens or filler phrasing.
