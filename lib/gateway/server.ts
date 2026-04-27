import 'server-only';

import { isAllowed } from '@/lib/gateway/allowlist';

export type GatewayFetchInit = {
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit;
  jwt?: string;
};

export async function gatewayFetch(
  path: string,
  init?: GatewayFetchInit,
): Promise<Response> {
  const method = (init?.method ?? 'GET').toUpperCase();
  const pathOnly = path.split('?')[0];

  if (!isAllowed(method, pathOnly)) {
    return new Response(null, { status: 404 });
  }

  // Lazy-load env so its zod parse runs at request time, not at build's
  // "Collecting page data" step (which evaluates the route module).
  const { env } = await import('@/lib/env');

  const headers = new Headers(init?.headers);
  headers.set('X-API-Key', env.ANDAMIO_API_KEY);
  if (init?.jwt) {
    headers.set('Authorization', `Bearer ${init.jwt}`);
  }

  const url = `${env.ANDAMIO_GATEWAY_URL}${path}`;

  return fetch(url, {
    method,
    headers,
    body: init?.body,
  });
}
