'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Loader2 } from 'lucide-react';
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

  return (
    <FullScreenModal
      show={isOpen}
      bg="#5B4FCF"
      fx="sparkles"
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
      <MascotWithGlow pose="pro" size={160} className="mb-5" />
      <h3 id="upgrade-modal-title" className="text-[26px] font-extrabold mb-2">MechReady Pro</h3>
      <p className="text-sm text-white/50 mb-6">{reason || 'Unlock all premium features'}</p>
      <ul className="w-full space-y-2.5">
        {['Unlimited hearts', 'Weekly streak freeze', 'Full analytics dashboard', '2x XP on weekends'].map((b) => (
          <li key={b} className="flex items-center gap-3 text-[15px] text-white bg-white/10 rounded-2xl px-4 py-3">
            <Check className="w-4 h-4 text-green-400 shrink-0" />{b}
          </li>
        ))}
      </ul>
    </FullScreenModal>
  );
}
