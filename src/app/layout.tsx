import type { Metadata } from 'next';
import { Nunito, JetBrains_Mono } from 'next/font/google';
import { AuthSessionProvider } from '@/components/providers/SessionProvider';
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
  title: 'MechPrep — Mechanical Engineering Interview Training',
  description: 'Sharpen your mechanical engineering skills with gamified, interview-focused practice. Adaptive questions, real-world mechanisms, and smart feedback.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${nunito.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen">
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  );
}
