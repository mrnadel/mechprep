import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gem Shop',
  description: 'Spend gems on streak freezes, cosmetics, and more in the MechReady shop.',
  robots: { index: false },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
