import { ImageResponse } from 'next/og';
import { type NextRequest } from 'next/server';

export const runtime = 'edge';

const SIZE = { width: 1200, height: 630 };

/**
 * GET /api/certificate?name=...&profession=...&professionIcon=...&color=...&score=...&date=...
 * Returns a branded PNG certificate image (1200x630, LinkedIn-optimized).
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const name = searchParams.get('name') || 'Learner';
  const profession = searchParams.get('profession') || 'Course';
  const professionIcon = searchParams.get('professionIcon') || '🎓';
  const color = searchParams.get('color') || '#6366f1';
  const score = searchParams.get('score') || '0';
  const date = searchParams.get('date') || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return new ImageResponse(
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
        <div style={{ fontSize: 52, fontWeight: 900, color: '#1a1a2e', letterSpacing: -1, marginBottom: 8, display: 'flex' }}>
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

        {/* Date + branding */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#999' }}>{date}</div>
          <div style={{ width: 4, height: 4, borderRadius: 2, background: '#ccc', display: 'flex' }} />
          <div style={{ fontSize: 14, fontWeight: 800, color: '#999' }}>Octokeen</div>
        </div>
      </div>
    ),
    { ...SIZE }
  );
}
