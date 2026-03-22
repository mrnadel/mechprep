import { NextRequest, NextResponse } from 'next/server';

const MIXPANEL_API = 'https://api-js.mixpanel.com';

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const target = url.searchParams.get('endpoint');
  if (!target) {
    return NextResponse.json({ error: 'Missing endpoint' }, { status: 400 });
  }

  const body = await req.text();
  const resp = await fetch(`${MIXPANEL_API}/${target}?${url.searchParams.toString()}`, {
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
