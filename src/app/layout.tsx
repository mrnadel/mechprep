import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Nunito, JetBrains_Mono } from 'next/font/google';
import { AuthSessionProvider } from '@/components/providers/SessionProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
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
  other: {
    'google-adsense-account': 'ca-pub-3282358085183080',
  },
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
          description: 'All content free with 5 hearts — recharge over time',
        },
        {
          '@type': 'Offer',
          price: '7.99',
          priceCurrency: 'USD',
          name: 'Pro Monthly',
          description: 'Unlimited hearts, streak freeze, 2x XP weekends, full analytics',
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
            text: 'All lessons and practice modes are free. You get 5 hearts — wrong answers cost one, and they recharge over time. Pro gives unlimited hearts plus premium perks.',
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
    <html lang="en" data-scroll-behavior="smooth" className={`${nunito.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen">
        {/* Prevent FOUC: apply dark class before first paint */}
        <script
          dangerouslySetInnerHTML={{ __html: `(function(){try{var d=JSON.parse(localStorage.getItem('octokeen-theme')||'{}');var m=d&&d.state&&d.state.mode;if(m==='dark'||(m==='system'&&matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark')}catch(e){}})()` }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{ __html: `if('serviceWorker' in navigator)navigator.serviceWorker.register('/sw.js')` }}
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3282358085183080"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:text-sm focus:font-bold"
        >
          Skip to main content
        </a>
        <AuthSessionProvider>
          <ThemeProvider>
            <MixpanelProvider>
              {children}
            </MixpanelProvider>
            <CookieConsent />
          </ThemeProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
