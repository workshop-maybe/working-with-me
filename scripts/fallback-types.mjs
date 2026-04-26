#!/usr/bin/env node
/**
 * Fallback for `pnpm generate:types` when the Andamio v2 OpenAPI doc is
 * unreachable. Prints a notice on stderr and exits 0 so the script does not
 * fail the build pipeline; the hand-written lib/gateway/types.generated.ts
 * remains in place.
 */
process.stderr.write(
  'generate:types: v2 OpenAPI doc unreachable; keeping committed lib/gateway/types.generated.ts.\n',
);
process.exit(0);
