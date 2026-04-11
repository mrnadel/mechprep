import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.paddle.com https://public.profitwell.com https://cdn.mxpnl.com https://static.cloudflareinsights.com https://pagead2.googlesyndication.com https://adservice.google.com https://www.googletagservices.com https://tpc.googlesyndication.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://cdn.jsdelivr.net",
      "style-src 'self' 'unsafe-inline' https://*.paddle.com",
      "img-src 'self' data: blob: https://*.googleusercontent.com https://*.paddle.com https://picsum.photos https://fastly.picsum.photos https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google",
      "font-src 'self' https://*.paddle.com",
      "connect-src 'self' https://*.paddle.com https://*.supabase.co https://api-js.mixpanel.com https://api.mixpanel.com https://api-eu.mixpanel.com https://*.ingest.sentry.io https://public.profitwell.com https://pagead2.googlesyndication.com https://adservice.google.com https://tpc.googlesyndication.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://csi.gstatic.com https://huggingface.co https://*.huggingface.co https://*.hf.co https://cdn-lfs.huggingface.co https://cdn.jsdelivr.net",
      "worker-src 'self' blob:",
      "frame-src https://*.paddle.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com https://pagead2.googlesyndication.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://accounts.google.com",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '*.paddle.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'fastly.picsum.photos',
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        source: '/api/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  // Suppress source map upload warnings when SENTRY_AUTH_TOKEN is not set
  silent: !process.env.SENTRY_AUTH_TOKEN,

  // Upload source maps for better stack traces in production
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // Hide source maps from clients
  sourcemaps: {
    deleteSourcemapsAfterUpload: true,
  },

  // Disable Sentry telemetry
  telemetry: false,
});
