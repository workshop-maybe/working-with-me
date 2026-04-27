import 'server-only';

import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'andamio-session';

// Tracks the Andamio JWT lifetime (~24h). Tighten when the auth flow pins
// a precise expiry from the validate response.
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24;

export type SessionPayload = {
  jwt: string;
  stakeAddress: string;
};

export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  const cookie = store.get(SESSION_COOKIE_NAME);
  if (!cookie) return null;

  try {
    const parsed = JSON.parse(cookie.value) as unknown;
    if (
      parsed &&
      typeof parsed === 'object' &&
      typeof (parsed as { jwt?: unknown }).jwt === 'string' &&
      typeof (parsed as { stakeAddress?: unknown }).stakeAddress === 'string'
    ) {
      const { jwt, stakeAddress } = parsed as SessionPayload;
      return { jwt, stakeAddress };
    }
    return null;
  } catch {
    return null;
  }
}

export async function setSession(payload: SessionPayload): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE_NAME, JSON.stringify(payload), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function clearSession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE_NAME);
}
