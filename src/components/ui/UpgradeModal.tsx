'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Lock, Sparkles, Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { PADDLE_PRICES } from '@/lib/pricing';
import { getPaddle } from '@/lib/paddle-client';
import { analytics } from '@/lib/mixpanel';
import { GameButton } from '@/components/ui/GameButton';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason?: string;
}

export function UpgradeModal({ isOpen, onClose, reason }: UpgradeModalProps) {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (isOpen) analytics.feature('upgrade_modal_shown', { reason });
  }, [isOpen, reason]);

  const handleSubscribe = async () => {
    if (!session?.user?.id) return;
    setLoading(true);
    analytics.subscription({ action: 'checkout_initiated', plan: 'pro', interval: 'month', source: 'upgrade_modal' });
    try {
      const res = await fetch('/api/paddle/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: PADDLE_PRICES.PRO_MONTHLY }),
      });
      if (!res.ok) return;
      const { transactionId } = await res.json();
      const paddle = await getPaddle();
      if (!paddle || !transactionId) return;
      paddle.Checkout.open({
        transactionId,
        settings: { successUrl: `${window.location.origin}/checkout/success` },
      });
      onClose();
    } catch (err) {
      console.error('Checkout error:', err);
      analytics.error({ action: 'checkout', message: 'Checkout failed', source: 'upgrade_modal' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative bg-white w-full h-full sm:h-auto sm:max-w-md sm:mx-4 sm:rounded-2xl overflow-y-auto sm:shadow-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="upgrade-modal-title"
            initial={{ y: 60, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>

            {/* Content — centered */}
            <div className="flex-1 flex flex-col justify-center sm:flex-initial relative z-[1]">
              <div className="bg-gradient-to-br from-primary-600 to-primary-700 px-5 pt-6 pb-5 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="w-5 h-5 text-primary-200" />
                  <span className="text-sm font-medium text-primary-200">
                    {reason || 'This feature requires Pro'}
                  </span>
                </div>
                <h3 id="upgrade-modal-title" className="text-xl font-extrabold">MechReady Pro</h3>
              </div>

              <div className="px-5 py-4">
                <ul className="space-y-2.5">
                  {[
                    'Unlimited hearts — never wait',
                    'Weekly streak freeze',
                    'Full analytics dashboard',
                    '2x XP on weekends',
                  ].map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2.5 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-green-500 shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer — pinned bottom */}
            <div className="shrink-0 px-5 pb-8 sm:pb-5 relative z-[1]">
              <GameButton
                variant="indigo"
                onClick={handleSubscribe}
                disabled={loading || !session}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                {session ? 'Subscribe to Pro' : 'Sign in to Subscribe'}
              </GameButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
