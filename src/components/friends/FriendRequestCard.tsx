'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, X, Loader2 } from 'lucide-react';

interface FriendRequestCardProps {
  id: string;
  userId: string;
  displayName: string;
  image: string | null;
  level: number;
  type: 'incoming' | 'outgoing';
  onAction?: () => void;
}

export default function FriendRequestCard({
  id,
  userId,
  displayName,
  image,
  level,
  type,
  onAction,
}: FriendRequestCardProps) {
  const [loading, setLoading] = useState(false);
  const [hidden, setHidden] = useState(false);
  const initials = (displayName || '?').charAt(0).toUpperCase();

  async function handleAccept() {
    setLoading(true);
    try {
      const res = await fetch(`/api/friends/request/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'accept' }),
      });
      if (res.ok) {
        setHidden(true);
        onAction?.();
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleDecline() {
    setLoading(true);
    try {
      const res = await fetch(`/api/friends/request/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'decline' }),
      });
      if (res.ok) {
        setHidden(true);
        onAction?.();
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleCancel() {
    setLoading(true);
    try {
      const res = await fetch(`/api/friends/request/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setHidden(true);
        onAction?.();
      }
    } finally {
      setLoading(false);
    }
  }

  if (hidden) return null;

  return (
    <motion.div
      layout
      exit={{ opacity: 0, x: -50 }}
      className="flex items-center gap-3 p-4 rounded-xl border border-surface-200 bg-white"
    >
      <Link
        href={`/user/${userId}`}
        className="rounded-full flex items-center justify-center overflow-hidden shrink-0"
        style={{ width: 44, height: 44, background: '#E0E7FF' }}
      >
        {image ? (
          <img src={image} alt="" className="w-full h-full object-cover" />
        ) : (
          <span className="text-primary-700 font-bold text-sm">{initials}</span>
        )}
      </Link>

      <div className="flex-1 min-w-0">
        <Link href={`/user/${userId}`}>
          <p className="text-sm font-bold text-surface-900 truncate">{displayName}</p>
        </Link>
        <p className="text-xs text-surface-400 font-semibold">Level {level}</p>
      </div>

      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin text-surface-400 shrink-0" />
      ) : type === 'incoming' ? (
        <div className="flex gap-2 shrink-0">
          <button
            onClick={handleAccept}
            className="p-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
            title="Accept"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={handleDecline}
            className="p-2 rounded-lg bg-surface-100 text-surface-500 hover:bg-surface-200 transition-colors"
            title="Decline"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={handleCancel}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors shrink-0"
        >
          Cancel
        </button>
      )}
    </motion.div>
  );
}
