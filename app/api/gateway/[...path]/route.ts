import 'server-only';

import { isAllowed } from '@/lib/gateway/allowlist';
import { gatewayFetch } from '@/lib/gateway/server';
import { getSession } from '@/lib/session';

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

async function handle(
  request: Request,
  context: RouteContext,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
): Promise<Response> {
  const { path } = await context.params;
  const basePath = `/${path.join('/')}`;
  const search = new URL(request.url).search;
  const fullPath = `${basePath}${search}`;

  if (!isAllowed(method, basePath)) {
    return new Response(null, { status: 404 });
  }

  const session = await getSession();

  const headers = new Headers();
  const contentType = request.headers.get('content-type');
  if (contentType) headers.set('content-type', contentType);
  const accept = request.headers.get('accept');
  if (accept) headers.set('accept', accept);

  const body =
    method === 'GET' || method === 'DELETE'
      ? undefined
      : await request.arrayBuffer();

  return gatewayFetch(fullPath, {
    method,
    headers,
    body,
    jwt: session?.jwt,
  });
}

export async function GET(request: Request, context: RouteContext) {
  return handle(request, context, 'GET');
}

export async function POST(request: Request, context: RouteContext) {
  return handle(request, context, 'POST');
}

export async function PUT(request: Request, context: RouteContext) {
  return handle(request, context, 'PUT');
}

export async function DELETE(request: Request, context: RouteContext) {
  return handle(request, context, 'DELETE');
}
