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
  title: 'MechReady — Mechanical Engineering Interview Training',
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
  openGraph: {
    title: 'MechReady — Mechanical Engineering Interview Training',
    description: 'Sharpen your mechanical engineering skills with gamified, interview-focused practice. 1,700+ questions across 10 core ME topics.',
    url: 'https://mechready.com',
    siteName: 'MechReady',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary',
    images: ['/og-image.png'],
    title: 'MechReady — ME Interview Training',
    description: 'Gamified mechanical engineering interview prep. 1,700+ questions, adaptive practice, and smart feedback.',
  },
  other: {
    'theme-color': '#4F46E5',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${nunito.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen">
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
