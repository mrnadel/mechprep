'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { ScreenFX, type FXName } from './ScreenFX';
import { useScrollLock } from '@/hooks/useScrollLock';

/**
 * Shared full-screen modal wrapper for all overlay screens.
 * Always covers the full viewport on all screen sizes.
 * Ensures consistent z-index (above ALL UI), layout, and FX.
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
  /** When true: no backdrop, always full viewport, no card mode on desktop */
  fullScreen?: boolean;
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
  fullScreen,
}: FullScreenModalProps) {
  useScrollLock(show);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex flex-col overflow-hidden"
          style={{ zIndex: 9999, background: bg }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
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

          <div className={`flex-1 flex flex-col items-center relative z-[1] px-6 text-center text-white w-full max-w-3xl mx-auto ${fullScreen ? 'pt-[12vh]' : 'pt-[15vh]'}`}>
            {children}
          </div>

          {footer && (
            <div className="shrink-0 px-6 pb-10 relative z-[1] w-full max-w-3xl mx-auto">
              {footer}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
