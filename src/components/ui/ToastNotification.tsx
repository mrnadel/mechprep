'use client';

import { useEffect, useCallback } from 'react';
import { create } from 'zustand';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Toast Store ───

interface Toast {
  id: string;
  icon: string;
  title: string;
  subtitle?: string;
  color?: string;
  /** Auto-dismiss duration in ms (default 3500) */
  duration?: number;
}

interface ToastStore {
  toasts: Toast[];
  push: (toast: Omit<Toast, 'id'>) => void;
  dismiss: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  push: (toast) => {
    const id = `t-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    set((s) => ({
      toasts: [...s.toasts, { ...toast, id }].slice(-5), // keep max 5
    }));
  },
  dismiss: (id) => {
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
  },
}));

// ─── Individual Toast ───

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, toast.duration ?? 3500);
    return () => clearTimeout(timer);
  }, [toast.duration, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -30, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 60, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      onClick={onDismiss}
      role="status"
      aria-live="polite"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 16px 10px 12px',
        borderRadius: 16,
        background: '#FFFFFF',
        border: '2px solid #E5E5E5',
        boxShadow: '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.05)',
        cursor: 'pointer',
        maxWidth: 340,
        width: '100%',
        userSelect: 'none',
      }}
    >
      <motion.span
        style={{ fontSize: 26, lineHeight: 1, flexShrink: 0 }}
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 14, delay: 0.1 }}
      >
        {toast.icon}
      </motion.span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize: 14,
            fontWeight: 800,
            color: toast.color ?? '#3C3C3C',
            lineHeight: 1.25,
            margin: 0,
          }}
        >
          {toast.title}
        </p>
        {toast.subtitle && (
          <p
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: '#AFAFAF',
              margin: '2px 0 0',
              lineHeight: 1.3,
            }}
          >
            {toast.subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ─── Container (mount once in layout) ───

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  const dismiss = useToastStore((s) => s.dismiss);

  const handleDismiss = useCallback(
    (id: string) => () => dismiss(id),
    [dismiss],
  );

  if (toasts.length === 0) return null;

  return (
    <div
      aria-label="Notifications"
      style={{
        position: 'fixed',
        top: 'max(env(safe-area-inset-top, 0px), 12px)',
        left: 0,
        right: 0,
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        padding: '0 16px',
        pointerEvents: 'none',
      }}
    >
      <AnimatePresence mode="sync">
        {toasts.slice(0, 3).map((toast) => (
          <div key={toast.id} style={{ pointerEvents: 'auto', width: '100%', maxWidth: 340 }}>
            <ToastItem toast={toast} onDismiss={handleDismiss(toast.id)} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
