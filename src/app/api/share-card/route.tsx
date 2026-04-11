import { ImageResponse } from 'next/og';
import { type NextRequest } from 'next/server';

export const runtime = 'edge';

const SIZE = { width: 1200, height: 630 };

type CardType = 'streak' | 'league' | 'level' | 'chapter' | 'course';

/**
 * GET /api/share-card?type=...&value=...&name=...
 * Returns a branded 1200x630 PNG share card image.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const type = searchParams.get('type') as CardType | null;
  const value = searchParams.get('value') || '';
  const name = searchParams.get('name') || 'Learner';

  switch (type) {
    case 'streak':
      return renderStreakCard(value, name);
    case 'league':
      return renderLeagueCard(value, name);
    case 'level':
      return renderLevelCard(value, name);
    case 'chapter':
      return renderChapterCard(value, name);
    case 'course':
      return renderCourseCard(value, name);
    default:
      return new Response('Invalid card type. Use: streak, league, level, chapter, course', {
        status: 400,
      });
  }
}

// ─── Shared layout wrapper ──────────────────

function CardLayout({
  gradient,
  emoji,
  headline,
  subline,
  extra,
}: {
  gradient: string;
  emoji: string;
  headline: string;
  subline: string;
  extra?: string;
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: gradient,
        fontFamily: 'system-ui, sans-serif',
        position: 'relative',
      }}
    >
      {/* Inner border frame */}
      <div
        style={{
          position: 'absolute',
          inset: 16,
          border: '2px solid rgba(255,255,255,0.15)',
          borderRadius: 24,
          display: 'flex',
        }}
      />

      {/* Brand top-left */}
      <div
        style={{
          position: 'absolute',
          top: 36,
          left: 44,
          fontSize: 22,
          fontWeight: 800,
          color: 'rgba(255,255,255,0.6)',
          letterSpacing: 1,
          display: 'flex',
        }}
      >
        Octokeen
      </div>

      {/* Large emoji icon */}
      <div style={{ fontSize: 120, lineHeight: 1, marginBottom: 16, display: 'flex' }}>
        {emoji}
      </div>

      {/* Headline */}
      <div
        style={{
          fontSize: 56,
          fontWeight: 900,
          color: 'white',
          lineHeight: 1.2,
          marginBottom: 12,
          textAlign: 'center',
          maxWidth: '80%',
          display: 'flex',
        }}
      >
        {headline}
      </div>

      {/* Subline (user name + detail) */}
      <div
        style={{
          fontSize: 26,
          fontWeight: 700,
          color: 'rgba(255,255,255,0.7)',
          marginBottom: extra ? 8 : 0,
          display: 'flex',
        }}
      >
        {subline}
      </div>

      {/* Optional extra stat line */}
      {extra && (
        <div
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.5)',
            display: 'flex',
          }}
        >
          {extra}
        </div>
      )}

      {/* Bottom branding */}
      <div
        style={{
          position: 'absolute',
          bottom: 36,
          fontSize: 18,
          fontWeight: 700,
          color: 'rgba(255,255,255,0.4)',
          display: 'flex',
        }}
      >
        octokeen.com
      </div>
    </div>
  );
}

// ─── Card renderers ─────────────────────────

function renderStreakCard(value: string, name: string) {
  return new ImageResponse(
    (
      <CardLayout
        gradient="linear-gradient(135deg, #FF9600, #E8850C)"
        emoji={'\u{1F525}'}
        headline={`${value}-Day Streak!`}
        subline={name}
      />
    ),
    {
      ...SIZE,
      headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=86400' },
    },
  );
}

function renderLeagueCard(value: string, name: string) {
  // Map tier names to colors and emoji
  const tierInfo: Record<string, { color: string; emoji: string }> = {
    bronze:   { color: '#cd7f32', emoji: '\u{1F949}' },
    silver:   { color: '#8a8a8a', emoji: '\u{1F948}' },
    gold:     { color: '#d4a017', emoji: '\u{1F947}' },
    platinum: { color: '#00a3b5', emoji: '\u{1F48E}' },
    masters:  { color: '#7b1fa2', emoji: '\u{1F451}' },
  };
  const tier = tierInfo[value.toLowerCase()] ?? { color: '#58A700', emoji: '\u{1F3C6}' };

  return new ImageResponse(
    (
      <CardLayout
        gradient={`linear-gradient(135deg, ${tier.color}, ${darken(tier.color)})`}
        emoji={tier.emoji}
        headline={`Promoted to ${value}!`}
        subline={name}
      />
    ),
    {
      ...SIZE,
      headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=86400' },
    },
  );
}

function renderLevelCard(value: string, name: string) {
  return new ImageResponse(
    (
      <CardLayout
        gradient="linear-gradient(135deg, #5B4FCF, #3C4D6B)"
        emoji={'\u{2B50}'}
        headline={`Level ${value}`}
        subline={name}
      />
    ),
    {
      ...SIZE,
      headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=86400' },
    },
  );
}

function renderChapterCard(value: string, name: string) {
  return new ImageResponse(
    (
      <CardLayout
        gradient="linear-gradient(135deg, #58A700, #4A8F00)"
        emoji={'\u{2705}'}
        headline={value}
        subline={name}
        extra="Chapter Complete"
      />
    ),
    {
      ...SIZE,
      headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=86400' },
    },
  );
}

function renderCourseCard(value: string, name: string) {
  return new ImageResponse(
    (
      <CardLayout
        gradient="linear-gradient(135deg, #5B4FCF, #7C3AED)"
        emoji={'\u{1F393}'}
        headline={`${value}`}
        subline={name}
        extra="Course Complete"
      />
    ),
    {
      ...SIZE,
      headers: { 'Cache-Control': 'public, max-age=86400, s-maxage=86400' },
    },
  );
}

// ─── Helpers ────────────────────────────────

/** Simple hex color darkener for gradient endpoints */
function darken(hex: string): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, ((num >> 16) & 0xff) - 40);
  const g = Math.max(0, ((num >> 8) & 0xff) - 40);
  const b = Math.max(0, (num & 0xff) - 40);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}
