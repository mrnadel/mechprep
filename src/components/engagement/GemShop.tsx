'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGems, useEngagementActions, useStreakEnhancements } from '@/store/useEngagementStore';
import { shopItems } from '@/data/gem-shop';
import type { ShopItem } from '@/data/engagement-types';
import { MAX_STREAK_FREEZES } from '@/data/engagement-types';

interface ToastState {
  id: number;
  message: string;
}

function SuccessToast({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-2xl text-sm font-bold text-white shadow-lg"
      style={{ background: '#10B981' }}
    >
      {message}
    </motion.div>
  );
}

interface ShopCardProps {
  item: ShopItem;
  canAfford: boolean;
  isDisabled: boolean;
  disabledReason: string | null;
  isOwned: boolean;
  onBuy: (itemId: string) => void;
}

function ShopCard({ item, canAfford, isDisabled, disabledReason, isOwned, onBuy }: ShopCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3">
      {/* Icon + name */}
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-violet-50 flex items-center justify-center text-2xl">
          {item.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-gray-800 leading-tight">{item.name}</h3>
          <p className="text-xs text-gray-500 mt-0.5 leading-snug">{item.description}</p>
        </div>
      </div>

      {/* Cost + buy button */}
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1">
          <span className="text-base">💎</span>
          <span className="text-sm font-extrabold text-violet-700">{item.cost}</span>
        </div>

        <div className="relative group">
          <button
            onClick={() => !isDisabled && onBuy(item.id)}
            disabled={isDisabled}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all"
            style={{
              background: isOwned
                ? '#F0FDF4'
                : isDisabled
                  ? '#F3F4F6'
                  : '#7C3AED',
              color: isOwned
                ? '#16A34A'
                : isDisabled
                  ? '#9CA3AF'
                  : '#FFFFFF',
              border: 'none',
              cursor: isDisabled ? 'not-allowed' : 'pointer',
              boxShadow: isDisabled || isOwned ? 'none' : '0 2px 0 #5B21B6',
            }}
          >
            {isOwned ? 'Owned' : 'Buy'}
          </button>

          {/* Tooltip for disabled state */}
          {isDisabled && disabledReason && !isOwned && (
            <div
              className="absolute bottom-full right-0 mb-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"
              style={{ background: '#1F2937' }}
            >
              {disabledReason}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function GemShop() {
  const gems = useGems();
  const streak = useStreakEnhancements();
  const { purchaseItem } = useEngagementActions();
  const [toasts, setToasts] = useState<ToastState[]>([]);

  function showToast(message: string) {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  }

  function handleBuy(itemId: string) {
    const success = purchaseItem(itemId);
    if (success) {
      const item = shopItems.find((i) => i.id === itemId);
      showToast(`Purchased ${item?.name ?? 'item'}!`);
    }
  }

  function getItemState(item: ShopItem): {
    isOwned: boolean;
    isDisabled: boolean;
    disabledReason: string | null;
    canAfford: boolean;
  } {
    const canAfford = gems.balance >= item.cost;
    let isOwned = false;
    let isDisabled = false;
    let disabledReason: string | null = null;

    if (item.type === 'title') {
      isOwned = gems.inventory.activeTitles.includes(item.id);
    } else if (item.type === 'frame') {
      isOwned = gems.inventory.activeFrames.includes(item.id);
    }

    if (isOwned) {
      isDisabled = true;
    } else if (item.type === 'streak_freeze' && streak.freezesOwned >= MAX_STREAK_FREEZES) {
      isDisabled = true;
      disabledReason = 'Max owned';
    } else if (!canAfford) {
      isDisabled = true;
      disabledReason = `Need ${item.cost - gems.balance} more gems`;
    }

    return { isOwned, isDisabled, disabledReason, canAfford };
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shopItems.map((item) => {
          const { isOwned, isDisabled, disabledReason, canAfford } = getItemState(item);
          return (
            <ShopCard
              key={item.id}
              item={item}
              isOwned={isOwned}
              isDisabled={isDisabled}
              disabledReason={disabledReason}
              canAfford={canAfford}
              onBuy={handleBuy}
            />
          );
        })}
      </div>

      {/* Success toasts */}
      <AnimatePresence>
        {toasts.map((toast) => (
          <SuccessToast key={toast.id} message={toast.message} />
        ))}
      </AnimatePresence>
    </div>
  );
}
