import { describe, expect, mock, test, beforeEach } from 'bun:test';

mock.module('server-only', () => ({}));

process.env.ANDAMIO_API_KEY = 'test-api-key';
process.env.ANDAMIO_GATEWAY_URL = 'https://gateway.example.test';

const { gatewayFetch } = await import('./server');

const ALLOWED_GET_PATH = '/api/v2/course/owner/courses/list';
const ALLOWED_POST_PATH = '/api/v2/auth/login/session';

type FetchCall = [string, RequestInit];

function installFetchMock() {
  const calls: FetchCall[] = [];
  const fetchMock = mock(async (input: string, init: RequestInit = {}) => {
    calls.push([input, init]);
    return new Response(null, { status: 200 });
  });
  globalThis.fetch = fetchMock as unknown as typeof fetch;
  return { calls, fetchMock };
}

describe('gatewayFetch', () => {
  beforeEach(() => {
    delete (globalThis as { fetch?: unknown }).fetch;
  });

  test('returns 404 and never calls upstream when path is not allowlisted', async () => {
    const { calls } = installFetchMock();

    const res = await gatewayFetch('/api/v2/not/a/real/route', { method: 'GET' });

    expect(res.status).toBe(404);
    expect(calls.length).toBe(0);
  });

  test('returns 404 when method does not match an allowlisted route', async () => {
    const { calls } = installFetchMock();

    const res = await gatewayFetch(ALLOWED_GET_PATH, { method: 'POST' });

    expect(res.status).toBe(404);
    expect(calls.length).toBe(0);
  });

  test('forwards allowlisted request with X-API-Key header injected', async () => {
    const { calls } = installFetchMock();

    await gatewayFetch(ALLOWED_GET_PATH, { method: 'GET' });

    expect(calls.length).toBe(1);
    const [url, init] = calls[0];
    expect(url).toBe(`https://gateway.example.test${ALLOWED_GET_PATH}`);
    const headers = new Headers(init.headers);
    expect(headers.get('x-api-key')).toBe('test-api-key');
  });

  test('sets Authorization: Bearer <jwt> when init.jwt is provided', async () => {
    const { calls } = installFetchMock();

    await gatewayFetch(ALLOWED_GET_PATH, { method: 'GET', jwt: 'jwt-token-abc' });

    expect(calls.length).toBe(1);
    const headers = new Headers(calls[0][1].headers);
    expect(headers.get('authorization')).toBe('Bearer jwt-token-abc');
  });

  test('omits Authorization header when init.jwt is not provided', async () => {
    const { calls } = installFetchMock();

    await gatewayFetch(ALLOWED_GET_PATH, { method: 'GET' });

    expect(calls.length).toBe(1);
    const headers = new Headers(calls[0][1].headers);
    expect(headers.has('authorization')).toBe(false);
  });

  test('forwards method and body to upstream untouched', async () => {
    const { calls } = installFetchMock();

    const body = JSON.stringify({ stakeAddress: 'stake1u...' });
    await gatewayFetch(ALLOWED_POST_PATH, {
      method: 'POST',
      body,
      headers: { 'content-type': 'application/json' },
    });

    expect(calls.length).toBe(1);
    const [url, init] = calls[0];
    expect(url).toBe(`https://gateway.example.test${ALLOWED_POST_PATH}`);
    expect(init.method).toBe('POST');
    expect(init.body).toBe(body);
  });

  test('rejects encoded-slash widening attempts (defers to allowlist hardening)', async () => {
    const { calls } = installFetchMock();

    const res = await gatewayFetch('/api/v2/course/detail/abc%2F123', { method: 'GET' });

    expect(res.status).toBe(404);
    expect(calls.length).toBe(0);
  });

  test('allows path-template match for /api/v2/course/detail/{courseId}', async () => {
    const { calls } = installFetchMock();

    await gatewayFetch('/api/v2/course/detail/course-xyz', { method: 'GET' });

    expect(calls.length).toBe(1);
    expect(calls[0][0]).toBe('https://gateway.example.test/api/v2/course/detail/course-xyz');
  });
});
