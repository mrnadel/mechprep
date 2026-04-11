import { ImageResponse } from 'next/og';
import { type NextRequest } from 'next/server';

export const runtime = 'edge';

const SIZE = { width: 1200, height: 630 };

/**
 * Generate a short deterministic certificate ID from user + profession + date.
 * Duplicated from certificate.ts to avoid importing non-edge-safe modules.
 */
function generateCertificateId(name: string, profession: string, date: string): string {
  const input = `${name}:${profession}:${date}`;
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = ((hash << 5) - hash + input.charCodeAt(i)) | 0;
  }
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id = '';
  let h = Math.abs(hash);
  for (let i = 0; i < 6; i++) {
    id += chars[h % chars.length];
    h = Math.floor(h / chars.length);
  }
  return `OKC-${id}`;
}

/**
 * Convert an ArrayBuffer to a base64 data URI (Edge-safe, no Buffer).
 */
function arrayBufferToBase64(buffer: ArrayBuffer, mime: string): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return `data:${mime};base64,${btoa(binary)}`;
}

/**
 * GET /api/certificate?name=...&profession=...&professionIcon=...&color=...&score=...&date=...
 * Returns a branded PNG certificate image (1200x630, LinkedIn-optimized).
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const rawName = searchParams.get('name') || 'Learner';
  const profession = searchParams.get('profession') || 'Course';
  const professionIcon = searchParams.get('professionIcon') || '\uD83C\uDF93';
  const color = searchParams.get('color') || '#6366f1';
  const score = searchParams.get('score') || '0';
  const date = searchParams.get('date') || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  // Name handling: truncate long names, reduce font for medium names
  const name = rawName.length > 30 ? rawName.slice(0, 27) + '...' : rawName;
  const nameFontSize = rawName.length > 20 ? 40 : 52;

  // Deterministic certificate ID
  const certId = generateCertificateId(rawName, profession, date);

  // Fetch mascot image and convert to base64 (Edge-safe)
  let mascotBase64: string | null = null;
  try {
    const mascotUrl = new URL('/mascot/celebrating.png', req.nextUrl.origin);
    const mascotRes = await fetch(mascotUrl);
    if (mascotRes.ok) {
      const mascotBuffer = await mascotRes.arrayBuffer();
      mascotBase64 = arrayBufferToBase64(mascotBuffer, 'image/png');
    }
  } catch {
    // Mascot fetch failed — render without it
  }

  const imageResponse = new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(145deg, ${color}15 0%, #ffffff 30%, #ffffff 70%, ${color}10 100%)`,
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Border frame */}
        <div
          style={{
            position: 'absolute',
            inset: 16,
            border: `3px solid ${color}40`,
            borderRadius: 20,
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 24,
            border: `1px solid ${color}20`,
            borderRadius: 16,
            display: 'flex',
          }}
        />

        {/* Corner flourishes — top-left */}
        <div
          style={{
            position: 'absolute',
            top: 32,
            left: 32,
            width: 40,
            height: 40,
            borderLeft: `3px solid ${color}50`,
            borderTop: `3px solid ${color}50`,
            borderRadius: '4px 0 0 0',
            display: 'flex',
          }}
        />
        {/* Corner flourishes — top-right */}
        <div
          style={{
            position: 'absolute',
            top: 32,
            right: 32,
            width: 40,
            height: 40,
            borderRight: `3px solid ${color}50`,
            borderTop: `3px solid ${color}50`,
            borderRadius: '0 4px 0 0',
            display: 'flex',
          }}
        />
        {/* Corner flourishes — bottom-left */}
        <div
          style={{
            position: 'absolute',
            bottom: 32,
            left: 32,
            width: 40,
            height: 40,
            borderLeft: `3px solid ${color}50`,
            borderBottom: `3px solid ${color}50`,
            borderRadius: '0 0 0 4px',
            display: 'flex',
          }}
        />
        {/* Corner flourishes — bottom-right */}
        <div
          style={{
            position: 'absolute',
            bottom: 32,
            right: 32,
            width: 40,
            height: 40,
            borderRight: `3px solid ${color}50`,
            borderBottom: `3px solid ${color}50`,
            borderRadius: '0 0 4px 0',
            display: 'flex',
          }}
        />

        {/* Mascot (top-right area) */}
        {mascotBase64 && (
          <div style={{ position: 'absolute', top: 48, right: 56, display: 'flex' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={mascotBase64} width={72} height={72} alt="" />
          </div>
        )}

        {/* Top bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 8,
          }}
        >
          <span style={{ fontSize: 32 }}>{professionIcon}</span>
          <span style={{ fontSize: 16, fontWeight: 800, color: color, textTransform: 'uppercase', letterSpacing: 3 }}>
            Certificate of Completion
          </span>
        </div>

        {/* Divider */}
        <div style={{ width: 80, height: 3, background: color, borderRadius: 2, marginBottom: 32, display: 'flex' }} />

        {/* Name */}
        <div style={{ fontSize: nameFontSize, fontWeight: 900, color: '#1a1a2e', letterSpacing: -1, marginBottom: 8, display: 'flex' }}>
          {name}
        </div>

        {/* Subtitle */}
        <div style={{ fontSize: 20, fontWeight: 600, color: '#666', marginBottom: 32, display: 'flex' }}>
          has successfully completed
        </div>

        {/* Course name */}
        <div
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: color,
            marginBottom: 40,
            padding: '12px 32px',
            background: `${color}10`,
            borderRadius: 12,
            display: 'flex',
          }}
        >
          {profession}
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 48, marginBottom: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 36, fontWeight: 900, color: color }}>{score}%</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#999', textTransform: 'uppercase', letterSpacing: 1 }}>Readiness Score</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 36, fontWeight: 900, color: color }}>100%</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#999', textTransform: 'uppercase', letterSpacing: 1 }}>Course Progress</div>
          </div>
        </div>

        {/* Date + branding + certificate ID */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#999' }}>{date}</div>
          <div style={{ width: 4, height: 4, borderRadius: 2, background: '#ccc', display: 'flex' }} />
          <div style={{ fontSize: 14, fontWeight: 800, color: '#999' }}>Octokeen</div>
          <div style={{ width: 4, height: 4, borderRadius: 2, background: '#ccc', display: 'flex' }} />
          <div style={{ fontSize: 13, fontWeight: 600, color: '#bbb', fontFamily: 'monospace' }}>{certId}</div>
        </div>
      </div>
    ),
    { ...SIZE }
  );

  // Cache for 1 hour at edge, stale-while-revalidate for 24 hours.
  // Certificates are deterministic (same params = same image), so caching is safe.
  imageResponse.headers.set(
    'Cache-Control',
    'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400'
  );

  return imageResponse;
}
