'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Lock, Sparkles, Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { PADDLE_PRICES } from '@/lib/pricing';
import { getPaddle } from '@/lib/paddle-client';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason?: string;
}

export function UpgradeModal({ isOpen, onClose, reason }: UpgradeModalProps) {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const handleSubscribe = async () => {
    if (!session?.user?.id) return;
    setLoading(true);
    try {
      const res = await fetch('/api/paddle/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: PADDLE_PRICES.PRO_MONTHLY }),
      });
      if (!res.ok) return;
      const { customerId } = await res.json();

      const paddle = await getPaddle();
      if (!paddle) return;
      paddle.Checkout.open({
        items: [{ priceId: PADDLE_PRICES.PRO_MONTHLY, quantity: 1 }],
        customer: { id: customerId },
        customData: { userId: session.user.id },
        settings: {
          successUrl: `${window.location.origin}/checkout/success`,
        },
      });
      onClose();
    } catch (err) {
      console.error('Checkout error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-md mx-4 mb-0 sm:mb-0 overflow-hidden shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="upgrade-modal-title"
            initial={{ y: 60, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>

            {/* Header */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 px-5 pt-6 pb-5 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-5 h-5 text-primary-200" />
                <span className="text-sm font-medium text-primary-200">
                  {reason || 'This feature requires Pro'}
                </span>
              </div>
              <h3 id="upgrade-modal-title" className="text-xl font-bold">MechReady Pro</h3>
              <p className="text-sm text-primary-100 mt-1">
                Unlock all units, unlimited practice, and full analytics
              </p>
            </div>

            {/* Content */}
            <div className="px-5 py-4">
              {/* Benefits */}
              <ul className="space-y-2.5 mb-5">
                {[
                  'All 10 course units unlocked',
                  'Unlimited daily practice',
                  'Detailed explanations for every question',
                  'Full analytics & progress tracking',
                  'Interview readiness score',
                  'Weekly streak freeze',
                ].map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-green-500 shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>

              {/* Subscribe button */}
              <button
                onClick={handleSubscribe}
                disabled={loading || !session}
                className={cn(
                  'w-full py-3 rounded-xl font-semibold text-sm transition-colors shadow-md shadow-primary-200 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50',
                  'bg-primary-600 hover:bg-primary-700 text-white',
                )}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                {session ? 'Subscribe to Pro' : 'Sign in to Subscribe'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
