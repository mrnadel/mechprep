'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useHeartsStore } from '@/store/useHeartsStore';
import { useEngagementStore, useGems } from '@/store/useEngagementStore';
import { analytics } from '@/lib/mixpanel';
import { playSound } from '@/lib/sounds';
import { GameButton } from '@/components/ui/GameButton';
import { FullScreenModal } from '@/components/ui/FullScreenModal';
import { MascotWithGlow } from '@/components/ui/MascotWithGlow';

interface OutOfHeartsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HEART_COST = 100; // gems per heart, same as CourseHeader

function formatCountdown(ms: number): string {
  if (ms <= 0) return '0:00';
  const totalSeconds = Math.ceil(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

export function OutOfHeartsModal({ isOpen, onClose }: OutOfHeartsModalProps) {
  const getTimeUntilNextHeart = useHeartsStore((s) => s.getTimeUntilNextHeart);
  const rechargeHearts = useHeartsStore((s) => s.rechargeHearts);
  const current = useHeartsStore((s) => s.current);
  const max = useHeartsStore((s) => s.max);
  const gems = useGems();
  const [countdown, setCountdown] = useState('');

  const missingHearts = max - current;
  const refillCost = missingHearts * HEART_COST;
  const canRefill = missingHearts > 0 && gems.balance >= HEART_COST;
  const fullRefillCost = missingHearts > 1 ? refillCost : null;
  const canFullRefill = fullRefillCost !== null && gems.balance >= fullRefillCost;

  useEffect(() => { if (isOpen) { analytics.feature('hearts_depleted', {}); playSound('outOfHearts'); } }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const tick = () => { rechargeHearts(); setCountdown(formatCountdown(getTimeUntilNextHeart())); };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [isOpen, getTimeUntilNextHeart, rechargeHearts]);

  useEffect(() => { if (isOpen && current > 0) onClose(); }, [isOpen, current, onClose]);

  const handleClose = useCallback(() => onClose(), [onClose]);

  const buyOneHeart = useCallback(() => {
    if (gems.balance < HEART_COST) return;
    useHeartsStore.setState((s) => ({
      current: s.current + 1,
      lastRechargeAt: s.current + 1 >= s.max ? Date.now() : s.lastRechargeAt,
    }));
    useEngagementStore.getState().addGems(-HEART_COST, 'heart_purchase');
    playSound('purchase');
  }, [gems.balance]);

  const refillAll = useCallback(() => {
    if (!fullRefillCost || gems.balance < fullRefillCost) return;
    useHeartsStore.setState({ current: max, lastRechargeAt: Date.now() });
    useEngagementStore.getState().addGems(-fullRefillCost, 'heart_refill');
    playSound('purchase');
  }, [gems.balance, fullRefillCost, max]);

  return (
    <FullScreenModal
      show={isOpen}
      bg="#CE3030"
      fx="hearts"
      closable
      onClose={handleClose}
      labelId="out-of-hearts-title"
      footer={
        <Link href="/pricing" onClick={() => { analytics.subscription({ action: 'checkout_initiated', plan: 'pro', interval: 'month', source: 'out_of_hearts' }); handleClose(); }}>
          <GameButton variant="gold" className="pointer-events-none">Get Unlimited Hearts</GameButton>
        </Link>
      }
    >
      <motion.div className="mb-6" initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}>
        <MascotWithGlow pose="sad" size={160} />
      </motion.div>
      <h3 id="out-of-hearts-title" className="text-[26px] font-extrabold mb-6">Out of Hearts</h3>
      <div className="bg-white/15 rounded-2xl px-8 py-4 mb-4">
        <p className="text-xs font-semibold text-white/50 mb-1">Next heart in</p>
        <p className="text-4xl font-extrabold text-white tabular-nums">{countdown}</p>
      </div>

      {/* Buy hearts with gems */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 320 }}>
        <button
          onClick={buyOneHeart}
          disabled={!canRefill}
          className="transition-all active:scale-[0.97]"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            padding: '14px 20px',
            borderRadius: 16,
            background: canRefill ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)',
            border: '2px solid rgba(255,255,255,0.25)',
            cursor: canRefill ? 'pointer' : 'not-allowed',
            opacity: canRefill ? 1 : 0.5,
            width: '100%',
          }}
        >
          <span style={{ fontSize: 18 }}>❤️</span>
          <span style={{ fontSize: 14, fontWeight: 800, color: 'white' }}>
            Buy 1 Heart
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginLeft: 'auto' }}>
            <span style={{ fontSize: 16 }}>💎</span>
            <span style={{ fontSize: 14, fontWeight: 800, color: 'white' }}>{HEART_COST}</span>
          </div>
        </button>

        {fullRefillCost !== null && (
          <button
            onClick={refillAll}
            disabled={!canFullRefill}
            className="transition-all active:scale-[0.97]"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '14px 20px',
              borderRadius: 16,
              background: canFullRefill ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)',
              border: '2px solid rgba(255,255,255,0.25)',
              cursor: canFullRefill ? 'pointer' : 'not-allowed',
              opacity: canFullRefill ? 1 : 0.5,
              width: '100%',
            }}
          >
            <span style={{ fontSize: 18 }}>❤️‍🔥</span>
            <span style={{ fontSize: 14, fontWeight: 800, color: 'white' }}>
              Refill All ({missingHearts})
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginLeft: 'auto' }}>
              <span style={{ fontSize: 16 }}>💎</span>
              <span style={{ fontSize: 14, fontWeight: 800, color: 'white' }}>{fullRefillCost}</span>
            </div>
          </button>
        )}

        <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>
          You have {gems.balance} 💎
        </p>
      </div>
    </FullScreenModal>
  );
}
