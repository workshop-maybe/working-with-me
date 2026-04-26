# Working with Me

## Local development

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
