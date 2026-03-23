'use client';

import { useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Lock, Sparkles } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import { UpgradeModal } from './UpgradeModal';
import type { Feature } from '@/lib/pricing';

interface UpgradeGateProps {
  feature: Feature;
  reason?: string;
  children: ReactNode;
  /** Render a compact inline lock instead of replacing children */
  inline?: boolean;
}

export function UpgradeGate({ feature, reason, children, inline }: UpgradeGateProps) {
  const { canAccess, isLoading } = useSubscription();
  const [showModal, setShowModal] = useState(false);

  // While loading, show a skeleton to prevent flash of Pro content
  if (isLoading) {
    return inline
      ? <span className="inline-block w-12 h-6 rounded-lg bg-gray-100 animate-pulse" />
      : <div className="rounded-2xl bg-gray-50 border border-gray-100 animate-pulse h-32" />;
  }

  if (canAccess(feature)) return <>{children}</>;

  if (inline) {
    return (
      <>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-50 text-primary-600 text-xs font-medium hover:bg-primary-100 transition-colors min-h-[44px] min-w-[44px] justify-center"
        >
          <Lock className="w-3 h-3" />
          <span>Pro</span>
        </button>
        <UpgradeModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          reason={reason}
        />
      </>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="relative rounded-2xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white p-6 text-center"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
            <Lock className="w-5 h-5 text-primary-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">
              {reason || 'This feature requires Pro'}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Upgrade to unlock full access
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-colors shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            Upgrade to Pro
          </button>
        </div>
      </motion.div>

      <UpgradeModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        reason={reason}
      />
    </>
  );
}
