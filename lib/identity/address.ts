/**
 * Pure helpers for rendering Cardano stake addresses and display names.
 *
 * Zero external dependencies. No React, no fetch, no environment reads.
 * Safe to import from server components, client components, or plain
 * Node scripts.
 */

const ELLIPSIS = '…';
const ANONYMOUS = 'Anonymous';

export function shortAddress(
  address: string,
  opts?: { head?: number; tail?: number },
): string {
  if (address == null) return '';
  if (typeof address !== 'string') return '';
  const trimmed = address.trim();
  if (trimmed.length === 0) return '';

  const head = opts?.head ?? 8;
  const tail = opts?.tail ?? 6;

  if (trimmed.length <= head + tail + 1) return trimmed;

  return `${trimmed.slice(0, head)}${ELLIPSIS}${trimmed.slice(trimmed.length - tail)}`;
}

export function displayName(
  input: { stakeAddress?: string; handle?: string; name?: string } | null | undefined,
): string {
  if (input == null) return ANONYMOUS;

  const name = input.name?.trim();
  if (name) return name;

  const handle = input.handle?.trim();
  if (handle) return handle;

  const stake = input.stakeAddress?.trim();
  if (stake) {
    const short = shortAddress(stake);
    if (short) return short;
  }

  return ANONYMOUS;
}
