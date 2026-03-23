import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';

const MIXPANEL_API = 'https://api-eu.mixpanel.com';

// Allowlist of valid Mixpanel ingestion endpoints to prevent SSRF
const ALLOWED_ENDPOINTS = new Set(['track', 'engage', 'groups', 'record']);

// Max body size: 2 MB (Mixpanel batch limit)
const MAX_BODY_BYTES = 2 * 1024 * 1024;

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  // Rate limit by IP
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const rl = rateLimit(`mp-proxy:${ip}`, { limit: 60, windowMs: 60_000 });
  if (!rl.success) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    );
  }

  const { path } = await params;
  const endpoint = path.join('/');

  // Validate the endpoint against the allowlist to prevent SSRF
  if (!ALLOWED_ENDPOINTS.has(endpoint)) {
    return NextResponse.json(
      { error: 'Invalid endpoint' },
      { status: 400 }
    );
  }

  const contentLength = req.headers.get('content-length');
  if (contentLength && parseInt(contentLength, 10) > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: 'Request body too large' },
      { status: 413 }
    );
  }

  const search = req.nextUrl.searchParams.toString();
  const body = await req.text();

  if (body.length > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: 'Request body too large' },
      { status: 413 }
    );
  }

  const resp = await fetch(`${MIXPANEL_API}/${endpoint}?${search}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  const data = await resp.text();
  return new NextResponse(data, {
    status: resp.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
