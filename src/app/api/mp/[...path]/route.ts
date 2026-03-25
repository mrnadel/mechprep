import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';

const MIXPANEL_API = 'https://api-eu.mixpanel.com';

// Only allow known Mixpanel ingestion endpoints
const ALLOWED_ENDPOINTS = ['track', 'engage', 'groups', 'record'];

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  const rl = rateLimit(`mp-proxy:${ip}`, { limit: 60, windowMs: 60_000 });
  if (!rl.success) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 },
    );
  }

  const { path } = await params;
  const endpoint = path.join('/');

  // Validate the endpoint is a known Mixpanel ingestion path
  if (!ALLOWED_ENDPOINTS.includes(endpoint)) {
    return NextResponse.json(
      { error: 'Invalid endpoint' },
      { status: 400 },
    );
  }

  const search = req.nextUrl.searchParams.toString();
  const body = await req.text();

  let resp: Response;
  try {
    resp = await fetch(`${MIXPANEL_API}/${endpoint}?${search}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
  } catch {
    return NextResponse.json({ error: 'Upstream request failed' }, { status: 502 });
  }

  const data = await resp.text();
  return new NextResponse(data, {
    status: resp.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
