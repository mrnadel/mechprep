'use client';

import { GemShop } from '@/components/engagement/GemShop';
import { GemCounter } from '@/components/engagement/GemCounter';

export default function ShopPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Gem Shop</h1>
        {/* Show current gem balance */}
        <GemCounter />
      </div>
      <GemShop />
    </div>
  );
}
