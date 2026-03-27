import { ImageResponse } from 'next/og';
import { APP_NAME, APP_TAGLINE } from '@/lib/constants';

export const runtime = 'edge';
export const alt = `${APP_NAME} — ${APP_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
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
          background: 'linear-gradient(135deg, #8B3EC7 0%, #B06AE0 50%, #CE82FF 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Graduation cap icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 96,
            height: 96,
            borderRadius: 24,
            background: 'rgba(255,255,255,0.15)',
            marginBottom: 32,
            fontSize: 48,
          }}
        >
          🎓
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: 'white',
            letterSpacing: -2,
            marginBottom: 16,
          }}
        >
          {APP_NAME}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.85)',
            maxWidth: 600,
            textAlign: 'center',
            lineHeight: 1.4,
          }}
        >
          {APP_TAGLINE}
        </div>

        {/* Stats bar */}
        <div
          style={{
            display: 'flex',
            gap: 48,
            marginTop: 40,
            padding: '16px 40px',
            borderRadius: 16,
            background: 'rgba(255,255,255,0.1)',
          }}
        >
          {[
            { num: '2', label: 'Professions' },
            { num: '1,700+', label: 'Questions' },
            { num: 'Free', label: 'To Start' },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div style={{ fontSize: 32, fontWeight: 900, color: 'white' }}>
                {stat.num}
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.6)',
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
