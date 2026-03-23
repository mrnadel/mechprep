'use client';

import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGems, useEngagementActions, useStreakEnhancements, useEngagementStore } from '@/store/useEngagementStore';
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
      role="status"
      aria-live="polite"
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
  isEquipped: boolean;
  onBuy: (itemId: string) => void;
  onToggleEquip: (itemId: string) => void;
}

const RARITY_COLORS: Record<string, { dot: string; bg: string; text: string }> = {
  common: { dot: '#9CA3AF', bg: '#F3F4F6', text: '#6B7280' },
  rare: { dot: '#3B82F6', bg: '#EFF6FF', text: '#2563EB' },
  epic: { dot: '#A855F7', bg: '#FAF5FF', text: '#7C3AED' },
  legendary: { dot: '#F59E0B', bg: '#FFFBEB', text: '#B45309' },
};

const ShopCard = memo(function ShopCard({ item, canAfford, isDisabled, disabledReason, isOwned, isEquipped, onBuy, onToggleEquip }: ShopCardProps) {
  const isCosmetic = item.type === 'title' || item.type === 'frame';
  const rarity = item.rarity;
  const rarityStyle = rarity ? RARITY_COLORS[rarity] : null;

  return (
    <div
      className="bg-white rounded-2xl border shadow-sm p-4 flex flex-col gap-3"
      style={{
        borderColor: isEquipped ? (item.type === 'frame' && item.metadata?.frameStyle === 'diamond' ? '#818CF8' : '#F59E0B') : '#F3F4F6',
        boxShadow: isEquipped ? '0 0 0 1px rgba(245,158,11,0.2)' : undefined,
      }}
    >
      {/* Icon + name */}
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-violet-50 flex items-center justify-center text-2xl">
          {item.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-bold text-gray-800 leading-tight">{item.name}</h3>
            {isEquipped && (
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-md uppercase">Active</span>
            )}
            {rarityStyle && (
              <span
                className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-md leading-none"
                style={{ background: rarityStyle.bg, color: rarityStyle.text }}
              >
                {rarity}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-0.5 leading-snug">{item.description}</p>
        </div>
      </div>

      {/* Cost + buy/equip button */}
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1">
          <span className="text-base">💎</span>
          <span className="text-sm font-extrabold text-violet-700">{item.cost}</span>
        </div>

        <div className="relative group">
          {isOwned && isCosmetic ? (
            <button
              onClick={() => onToggleEquip(item.id)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold transition-all min-h-[44px]"
              style={{
                background: isEquipped ? '#FEF3C7' : '#F0FDF4',
                color: isEquipped ? '#B45309' : '#16A34A',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {isEquipped ? 'Unequip' : 'Equip'}
            </button>
          ) : (
            <button
              onClick={() => !isDisabled && onBuy(item.id)}
              disabled={isDisabled}
              className="px-3.5 py-2 rounded-xl text-xs font-bold transition-all min-h-[44px]"
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
          )}

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
});

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

  function handleToggleEquip(itemId: string) {
    const item = shopItems.find((i) => i.id === itemId);
    if (!item) return;
    const { equipTitle, equipFrame } = useEngagementStore.getState();
    if (item.type === 'title') {
      const isCurrently = gems.selectedTitle === itemId;
      equipTitle(isCurrently ? null : itemId);
      showToast(isCurrently ? `Unequipped ${item.name}` : `Equipped ${item.name}!`);
    } else if (item.type === 'frame') {
      const isCurrently = gems.selectedFrame === itemId;
      equipFrame(isCurrently ? null : itemId);
      showToast(isCurrently ? `Unequipped ${item.name}` : `Equipped ${item.name}!`);
    }
  }

  function getItemState(item: ShopItem): {
    isOwned: boolean;
    isEquipped: boolean;
    isDisabled: boolean;
    disabledReason: string | null;
    canAfford: boolean;
  } {
    const canAfford = gems.balance >= item.cost;
    let isOwned = false;
    let isEquipped = false;
    let isDisabled = false;
    let disabledReason: string | null = null;

    if (item.type === 'title') {
      isOwned = gems.inventory.activeTitles.includes(item.id);
      isEquipped = gems.selectedTitle === item.id;
    } else if (item.type === 'frame') {
      isOwned = gems.inventory.activeFrames.includes(item.id);
      isEquipped = gems.selectedFrame === item.id;
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

    return { isOwned, isEquipped, isDisabled, disabledReason, canAfford };
  }

  const powerUps = shopItems.filter((i) => i.category === 'power-up');
  const titles = shopItems.filter((i) => i.type === 'title');
  const frames = shopItems.filter((i) => i.type === 'frame');

  const legendaryFrames = frames.filter((i) => i.rarity === 'legendary');
  const epicFrames = frames.filter((i) => i.rarity === 'epic');
  const rareFrames = frames.filter((i) => i.rarity === 'rare');
  const commonFrames = frames.filter((i) => i.rarity === 'common');

  function renderGrid(items: ShopItem[]) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((item) => {
          const { isOwned, isEquipped, isDisabled, disabledReason, canAfford } = getItemState(item);
          return (
            <ShopCard
              key={item.id}
              item={item}
              isOwned={isOwned}
              isEquipped={isEquipped}
              isDisabled={isDisabled}
              disabledReason={disabledReason}
              canAfford={canAfford}
              onBuy={handleBuy}
              onToggleEquip={handleToggleEquip}
            />
          );
        })}
      </div>
    );
  }

  const rarityGroups: { label: string; colorClass: string; items: ShopItem[] }[] = [
    { label: 'Legendary', colorClass: 'text-amber-500', items: legendaryFrames },
    { label: 'Epic', colorClass: 'text-purple-500', items: epicFrames },
    { label: 'Rare', colorClass: 'text-blue-500', items: rareFrames },
    { label: 'Common', colorClass: 'text-gray-500', items: commonFrames },
  ];

  return (
    <div className="space-y-8">
      {/* Power-ups */}
      <div>
        <h3 className="text-sm font-extrabold text-gray-500 uppercase tracking-wider mb-3">Power-ups</h3>
        {renderGrid(powerUps)}
      </div>

      {/* Avatar Frames — grouped by rarity */}
      <div>
        <h3 className="text-sm font-extrabold text-gray-500 uppercase tracking-wider mb-4">Avatar Frames</h3>
        <div className="space-y-6">
          {rarityGroups.map(({ label, colorClass, items }) =>
            items.length > 0 ? (
              <div key={label}>
                <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${colorClass}`}>
                  {label}
                </h4>
                {renderGrid(items)}
              </div>
            ) : null,
          )}
        </div>
      </div>

      {/* Titles */}
      <div>
        <h3 className="text-sm font-extrabold text-gray-500 uppercase tracking-wider mb-3">Titles</h3>
        {renderGrid(titles)}
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
