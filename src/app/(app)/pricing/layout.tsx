import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing | Free & Pro Plans',
  description: 'Compare Octokeen Free and Pro plans. Unlimited practice, all 10 units, adaptive learning, and interview simulation starting at $9/mo.',
  alternates: { canonical: '/pricing' },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
