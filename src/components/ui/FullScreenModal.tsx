'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { ScreenFX, type FXName } from './ScreenFX';
import { useScrollLock } from '@/hooks/useScrollLock';

/**
 * Shared full-screen modal wrapper for all overlay screens.
 * Ensures consistent z-index (above ALL UI), backdrop, layout, and FX.
 */
interface FullScreenModalProps {
  show: boolean;
  bg: string;
  /** Effect name from fx-registry — e.g. 'confetti', 'fireworks', 'sparkle-dust' */
  fx?: FXName;
  closable?: boolean;
  onClose?: () => void;
  children: ReactNode;
  footer?: ReactNode;
  labelId?: string;
}

export function FullScreenModal({
  show,
  bg,
  fx,
  closable,
  onClose,
  children,
  footer,
  labelId,
}: FullScreenModalProps) {
  useScrollLock(show);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center sm:p-4"
          style={{ zIndex: 9999 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closable ? onClose : undefined}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative w-full h-full sm:h-auto sm:max-w-sm sm:rounded-2xl sm:shadow-2xl overflow-y-auto flex flex-col"
            style={{ background: bg }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelId}
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
          >
            {fx && <ScreenFX effect={fx} />}

            {closable && onClose && (
              <button
                onClick={onClose}
                className="absolute top-3 right-3 p-2.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                style={{ zIndex: 20 }}
                aria-label="Close"
              >
                <X className="w-4 h-4 text-white/70" />
              </button>
            )}

            <div className="flex-1 flex flex-col items-center sm:flex-initial relative z-[1] px-6 pt-[15vh] sm:pt-10 text-center text-white">
              {children}
            </div>

            {footer && (
              <div className="shrink-0 px-6 pb-8 sm:pb-5 relative z-[1]">
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
