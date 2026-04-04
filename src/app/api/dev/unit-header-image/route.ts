import { NextRequest, NextResponse } from 'next/server';
import { writeFile, unlink, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

const UNITS_DIR = join(process.cwd(), 'public', 'images', 'course', 'units');

function devOnly() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Dev only' }, { status: 403 });
  }
  return null;
}

/** POST — upload an image for a unit header */
export async function POST(req: NextRequest) {
  const guard = devOnly();
  if (guard) return guard;

  const form = await req.formData();
  const unitId = form.get('unitId') as string | null;
  const file = form.get('file') as File | null;

  if (!unitId || !file) {
    return NextResponse.json({ error: 'unitId and file required' }, { status: 400 });
  }

  // Sanitize unitId to prevent path traversal
  const safe = unitId.replace(/[^a-zA-Z0-9_-]/g, '');
  if (!safe) {
    return NextResponse.json({ error: 'Invalid unitId' }, { status: 400 });
  }

  if (!existsSync(UNITS_DIR)) {
    await mkdir(UNITS_DIR, { recursive: true });
  }

  const ext = file.type === 'image/webp' ? 'webp'
    : file.type === 'image/png' ? 'png'
    : file.type === 'image/svg+xml' ? 'svg'
    : 'jpg';

  const filename = `${safe}.${ext}`;
  const filePath = join(UNITS_DIR, filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filePath, buffer);

  const url = `/images/course/units/${filename}?t=${Date.now()}`;
  return NextResponse.json({ url });
}

/** DELETE — remove a unit's header image override */
export async function DELETE(req: NextRequest) {
  const guard = devOnly();
  if (guard) return guard;

  const { unitId } = (await req.json()) as { unitId?: string };
  if (!unitId) {
    return NextResponse.json({ error: 'unitId required' }, { status: 400 });
  }

  const safe = unitId.replace(/[^a-zA-Z0-9_-]/g, '');
  if (!safe) {
    return NextResponse.json({ error: 'Invalid unitId' }, { status: 400 });
  }

  // Try common extensions
  for (const ext of ['webp', 'png', 'jpg', 'svg']) {
    const filePath = join(UNITS_DIR, `${safe}.${ext}`);
    if (existsSync(filePath)) {
      await unlink(filePath);
    }
  }

  return NextResponse.json({ ok: true });
}
