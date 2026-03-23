import type { Metadata } from 'next';
import { Nunito, JetBrains_Mono } from 'next/font/google';
import { AuthSessionProvider } from '@/components/providers/SessionProvider';
import MixpanelProvider from '@/components/providers/MixpanelProvider';
import CookieConsent from '@/components/ui/CookieConsent';
import './globals.css';

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['600', '700', '800', '900'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'MechReady — Mechanical Engineering Interview Prep',
    template: '%s | MechReady',
  },
  description: 'Sharpen your mechanical engineering skills with gamified, interview-focused practice. Adaptive questions, real-world mechanisms, and smart feedback.',
  metadataBase: new URL('https://mechready.com'),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  keywords: ['mechanical engineering', 'interview prep', 'ME interview', 'engineering practice', 'thermodynamics', 'fluid mechanics', 'materials science', 'machine design'],
  authors: [{ name: 'MechReady' }],
  creator: 'MechReady',
  openGraph: {
    title: 'MechReady — Mechanical Engineering Interview Prep',
    description: 'Gamified mechanical engineering interview prep. Adaptive practice across 10 core ME topics with smart feedback.',
    url: 'https://mechready.com',
    siteName: 'MechReady',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
    title: 'MechReady — ME Interview Prep',
    description: 'Gamified mechanical engineering interview prep. Adaptive practice, real-world questions, and smart feedback.',
  },
  alternates: {
    canonical: 'https://mechready.com',
  },
  other: {
    'theme-color': '#4F46E5',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'MechReady',
      url: 'https://mechready.com',
      description: 'Gamified mechanical engineering interview prep platform with adaptive practice across 10 core ME topics.',
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
      name: 'MechReady',
      url: 'https://mechready.com',
      logo: 'https://mechready.com/favicon.svg',
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
            text: 'MechReady covers thermodynamics, fluid mechanics, materials science, statics & dynamics, machine design, manufacturing, heat transfer, and more.',
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
