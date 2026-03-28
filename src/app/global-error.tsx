'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error boundary caught:', error);
  }, [error]);

  // global-error must render its own <html> and <body> since it replaces the root layout
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          backgroundColor: '#FAFAFA',
        }}
      >
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '28rem' }}>
            <div
              style={{
                marginBottom: '1.5rem',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '5rem',
                  height: '5rem',
                  borderRadius: '9999px',
                  backgroundColor: '#FEF2F2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                }}
              >
                ⚠️
              </div>
            </div>

            <h1
              style={{
                fontSize: '1.5rem',
                fontWeight: 900,
                color: '#0F172A',
                marginBottom: '0.5rem',
              }}
            >
              Critical Error
            </h1>
            <p
              style={{
                color: '#64748B',
                marginBottom: '2rem',
                lineHeight: 1.6,
              }}
            >
              Something went seriously wrong. Your progress has been saved — please try reloading.
            </p>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                alignItems: 'center',
              }}
            >
              <button
                onClick={reset}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.625rem 1.25rem',
                  backgroundColor: '#2563EB',
                  color: 'white',
                  borderRadius: '0.5rem',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                }}
              >
                Try Again
              </button>
              <a
                href="/"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.625rem 1.25rem',
                  backgroundColor: 'white',
                  color: '#334155',
                  borderRadius: '0.5rem',
                  border: '1px solid #E2E8F0',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                Back to Dashboard
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
