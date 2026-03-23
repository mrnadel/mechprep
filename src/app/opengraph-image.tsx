import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'MechReady — Mechanical Engineering Interview Prep';
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
          background: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 50%, #818CF8 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Gear icon */}
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
          }}
        >
          <svg
            width="56"
            height="56"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
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
          MechReady
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
          Mechanical Engineering Interview Prep
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
            { num: '10', label: 'Topics' },
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
