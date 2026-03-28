'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { PADDLE_PRICES } from '@/lib/pricing';
import { getPaddle } from '@/lib/paddle-client';
import { analytics } from '@/lib/mixpanel';
import { GameButton } from '@/components/ui/GameButton';
import { FullScreenModal } from '@/components/ui/FullScreenModal';
import { MascotWithGlow } from '@/components/ui/MascotWithGlow';

interface UpgradeModalProps { isOpen: boolean; onClose: () => void; reason?: string; }

export function UpgradeModal({ isOpen, onClose, reason }: UpgradeModalProps) {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  useEffect(() => { if (isOpen) analytics.feature('upgrade_modal_shown', { reason }); }, [isOpen, reason]);

  const handleSubscribe = async () => {
    if (!session?.user?.id) return;
    setLoading(true);
    analytics.subscription({ action: 'checkout_initiated', plan: 'pro', interval: 'month', source: 'upgrade_modal' });
    try {
      const res = await fetch('/api/paddle/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ priceId: PADDLE_PRICES.PRO_MONTHLY }) });
      if (!res.ok) return;
      const { transactionId } = await res.json();
      const paddle = await getPaddle();
      if (!paddle || !transactionId) return;
      paddle.Checkout.open({ transactionId, settings: { successUrl: `${window.location.origin}/checkout/success` } });
      onClose();
    } catch (err) {
      console.error('Checkout error:', err);
      analytics.error({ action: 'checkout', message: 'Checkout failed', source: 'upgrade_modal' });
    } finally { setLoading(false); }
  };

  const features = [
    { icon: '❤️', title: 'Unlimited hearts', sub: 'Never stop practicing' },
    { icon: '❄️', title: 'Weekly streak freeze', sub: 'Protection for busy days' },
    { icon: '📈', title: 'Full analytics', sub: 'Track every topic in depth' },
    { icon: '⚡', title: '2x XP on weekends', sub: 'Level up faster' },
  ];

  return (
    <FullScreenModal
      show={isOpen}
      bg="linear-gradient(180deg, #6B3FA0 0%, #4A2D7A 100%)"
      fx="sparkle-dust"
      closable
      onClose={onClose}
      labelId="upgrade-modal-title"
      footer={
        <GameButton variant="gold" onClick={handleSubscribe} disabled={loading || !session}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {session ? 'Subscribe to Pro' : 'Sign in to Subscribe'}
        </GameButton>
      }
    >
      {/* Mascot with glow ring */}
      <div className="relative mb-2">
        <div
          className="absolute -inset-5 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,200,0,.2) 0%, transparent 70%)',
            animation: 'upgrade-glow 2.5s ease-in-out infinite',
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/mascot/upgrade-pro.png"
          alt=""
          width={150}
          height={150}
          className="relative z-[1] drop-shadow-[0_8px_24px_rgba(0,0,0,.3)]"
        />
      </div>

      {/* Pro badge */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-yellow-400/20 border border-yellow-400/30 text-[11px] font-extrabold text-yellow-200 uppercase tracking-widest mb-3">
        ★ Pro
      </div>

      <h3 id="upgrade-modal-title" className="text-[28px] font-black mb-1">MechReady Pro</h3>
      <p className="text-sm text-white/50 mb-5">{reason || 'Unlock your full potential'}</p>

      <ul className="w-full space-y-2">
        {features.map((f) => (
          <li key={f.title} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3">
            <div className="w-9 h-9 rounded-[10px] bg-white/12 flex items-center justify-center text-lg shrink-0">
              {f.icon}
            </div>
            <div className="text-left">
              <div className="text-[14px] font-bold text-white">{f.title}</div>
              <div className="text-[11px] text-white/40">{f.sub}</div>
            </div>
          </li>
        ))}
      </ul>

      <style>{`
        @keyframes upgrade-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
      `}</style>
    </FullScreenModal>
  );
}
