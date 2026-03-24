import type { Metadata, Viewport } from 'next';
import { Nunito, JetBrains_Mono } from 'next/font/google';
import { AuthSessionProvider } from '@/components/providers/SessionProvider';
import MixpanelProvider from '@/components/providers/MixpanelProvider';
import CookieConsent from '@/components/ui/CookieConsent';
import { APP_NAME, APP_URL, APP_DOMAIN, APP_TAGLINE, APP_DESCRIPTION, APP_THEME_COLOR } from '@/lib/constants';
import './globals.css';

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: APP_THEME_COLOR,
};

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} — ${APP_TAGLINE}`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(APP_URL),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  keywords: ['gamified learning', 'interview prep', 'engineering practice', 'personal finance', 'mechanical engineering', 'adaptive learning', 'online education', 'professional development'],
  authors: [{ name: APP_NAME }],
  creator: APP_NAME,
  openGraph: {
    title: `${APP_NAME} — ${APP_TAGLINE}`,
    description: APP_DESCRIPTION,
    url: APP_URL,
    siteName: APP_NAME,
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
    title: `${APP_NAME} — ${APP_TAGLINE}`,
    description: APP_DESCRIPTION,
  },
  alternates: {
    canonical: APP_URL,
  },
  other: {},
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: APP_NAME,
      url: APP_URL,
      description: APP_DESCRIPTION,
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web',
      offers: [
        {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          name: 'Free',
          description: 'Unit 1 access with 5 daily practice questions',
        },
        {
          '@type': 'Offer',
          price: '9',
          priceCurrency: 'USD',
          name: 'Pro Monthly',
          description: 'Unlimited practice, all 10 units, adaptive learning',
        },
      ],
    },
    {
      '@type': 'Organization',
      name: APP_NAME,
      url: APP_URL,
      logo: `${APP_URL}/favicon.svg`,
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What do I get for free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Full access to Unit 1 with up to 5 practice questions per day. Basic progress stats included.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I cancel anytime?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Cancel your Pro subscription at any time from Settings. You keep access until the end of your billing period.',
          },
        },
        {
          '@type': 'Question',
          name: 'What topics are covered?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `${APP_NAME} offers courses across multiple professions including mechanical engineering and personal finance, with more on the way.`,
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${nunito.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{ __html: `if('serviceWorker' in navigator)navigator.serviceWorker.register('/sw.js')` }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:text-sm focus:font-bold"
        >
          Skip to main content
        </a>
        <AuthSessionProvider>
          <MixpanelProvider>
            {children}
          </MixpanelProvider>
          <CookieConsent />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
