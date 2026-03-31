'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useScrollLock } from '@/hooks/useScrollLock';
import { AdUnit } from './AdUnit';

interface InterstitialAdProps {
  show: boolean;
  onClose: () => void;
}

const CLOSE_DELAY_MS = 5000;

/**
 * Full-screen interstitial ad overlay.
 * Close button appears after a 5-second delay.
 */
export function InterstitialAd({ show, onClose }: InterstitialAdProps) {
  const [canClose, setCanClose] = useState(false);

  useScrollLock(show);

  // Start close-button timer when ad appears
  useEffect(() => {
    if (!show) {
      setCanClose(false);
      return;
    }
    const timer = setTimeout(() => setCanClose(true), CLOSE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [show]);

  // Keyboard: Escape to close (only after delay)
  useEffect(() => {
    if (!show || !canClose) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [show, canClose, onClose]);

  const handleClose = useCallback(() => {
    if (canClose) onClose();
  }, [canClose, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="interstitial-ad"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
          style={{ background: 'rgba(0, 0, 0, 0.92)' }}
          role="dialog"
          aria-label="Advertisement"
        >
          {/* Ad label */}
          <div
            className="absolute top-4 left-4"
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase',
              letterSpacing: 1.5,
            }}
          >
            Ad
          </div>

          {/* Close button - appears after delay */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: canClose ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            disabled={!canClose}
            className="absolute top-4 right-4 rounded-full transition-colors"
            style={{
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.15)',
              cursor: canClose ? 'pointer' : 'default',
              pointerEvents: canClose ? 'auto' : 'none',
            }}
            aria-label="Close ad"
          >
            <X className="w-5 h-5 text-white/70" />
          </motion.button>

          {/* Countdown hint */}
          {!canClose && (
            <div
              className="absolute top-4 right-4"
              style={{
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CountdownRing durationMs={CLOSE_DELAY_MS} />
            </div>
          )}

          {/* Ad container */}
          <div
            className="w-full max-w-lg px-4"
            style={{ minHeight: 280 }}
          >
            <AdUnit
              slot="auto"
              format="rectangle"
              responsive
              style={{ minHeight: 250 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Tiny SVG ring that empties over the delay period, hinting when close becomes available. */
function CountdownRing({ durationMs }: { durationMs: number }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" className="opacity-40">
      <circle
        cx="16" cy="16" r="13"
        fill="none"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="2"
      />
      <circle
        cx="16" cy="16" r="13"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeDasharray={`${2 * Math.PI * 13}`}
        strokeDashoffset="0"
        strokeLinecap="round"
        style={{
          transform: 'rotate(-90deg)',
          transformOrigin: 'center',
          animation: `ad-countdown ${durationMs}ms linear forwards`,
        }}
      />
      <style>{`
        @keyframes ad-countdown {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: ${2 * Math.PI * 13}; }
        }
      `}</style>
    </svg>
  );
}
