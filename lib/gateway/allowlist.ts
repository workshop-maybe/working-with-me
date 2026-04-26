/**
 * Single source of truth for which Andamio gateway routes the proxy will forward.
 *
 * Every proxied request must match an entry in `AllowedRoutes` exactly — by HTTP
 * method (case-insensitive) and by path template. There is no wildcard or
 * "allow everything under /api/v2/*" escape hatch: adding a 12th route requires
 * editing this file.
 *
 * Path templates use `{param}` placeholders. A `{param}` segment matches exactly
 * one URL-decoded path segment that is non-empty and contains no '/' — so an
 * encoded slash (`%2F`) in the request never silently widens the match.
 */

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type AllowedRoute = {
  method: HttpMethod;
  pathTemplate: string;
};

export const AllowedRoutes: readonly AllowedRoute[] = Object.freeze([
  { method: 'POST', pathTemplate: '/api/v2/auth/login/session' },
  { method: 'POST', pathTemplate: '/api/v2/auth/login/validate' },
  { method: 'POST', pathTemplate: '/api/v2/course/create' },
  { method: 'GET', pathTemplate: '/api/v2/course/owner/courses/list' },
  { method: 'GET', pathTemplate: '/api/v2/course/detail/{courseId}' },
  { method: 'PUT', pathTemplate: '/api/v2/course/update' },
  { method: 'POST', pathTemplate: '/api/v2/course/student/register' },
  { method: 'POST', pathTemplate: '/api/v2/course/teacher/approve-student' },
  { method: 'POST', pathTemplate: '/api/v2/course/credential/issue' },
  { method: 'GET', pathTemplate: '/api/v2/course/teacher/pending' },
  { method: 'GET', pathTemplate: '/api/v2/course/student/credentials' },
] as const);

function matchTemplate(template: string, path: string): boolean {
  const templateSegments = template.split('/');
  const pathSegments = path.split('/');

  if (templateSegments.length !== pathSegments.length) return false;

  for (let i = 0; i < templateSegments.length; i++) {
    const t = templateSegments[i];
    const p = pathSegments[i];

    if (t.startsWith('{') && t.endsWith('}')) {
      if (p.length === 0) return false;
      let decoded: string;
      try {
        decoded = decodeURIComponent(p);
      } catch {
        return false;
      }
      if (decoded.length === 0) return false;
      if (decoded.includes('/')) return false;
      continue;
    }

    if (t !== p) return false;
  }

  return true;
}

export function isAllowed(method: string, path: string): boolean {
  if (typeof method !== 'string' || typeof path !== 'string') return false;
  if (!path.startsWith('/api/')) return false;

  const upper = method.toUpperCase();

  for (const route of AllowedRoutes) {
    if (route.method !== upper) continue;
    if (matchTemplate(route.pathTemplate, path)) return true;
  }

  return false;
}
