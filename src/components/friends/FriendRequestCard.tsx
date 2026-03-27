'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, X, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { UserAvatar } from '@/components/ui/UserAvatar';

interface FriendRequestCardProps {
  id: string;
  userId: string;
  displayName: string;
  image: string | null;
  level: number;
  type: 'incoming' | 'outgoing';
  index: number;
  onAction?: () => void;
}

export default function FriendRequestCard({
  id,
  userId,
  displayName,
  image,
  level,
  type,
  index,
  onAction,
}: FriendRequestCardProps) {
  const [loading, setLoading] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [accepted, setAccepted] = useState(false);
  async function handleAccept() {
    setLoading(true);
    try {
      const res = await fetch(`/api/friends/request/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'accept' }),
      });
      if (res.ok) {
        setAccepted(true);
        onAction?.();
        setTimeout(() => setHidden(true), 1000);
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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="card-hover p-3 sm:p-4"
    >
      <div className="flex items-center gap-3">
        <Link href={`/user/${userId}`}>
          <UserAvatar image={image} name={displayName} size={44} />
        </Link>

        <div className="flex-1 min-w-0">
          <Link href={`/user/${userId}`}>
            <p className="text-sm font-bold text-surface-900 truncate">{displayName}</p>
          </Link>
          <p className="text-xs text-surface-400 font-semibold">Level {level}</p>
        </div>

        {accepted ? (
          <span className="flex items-center gap-1.5 text-sm font-bold text-green-600 shrink-0">
            <Check className="w-4 h-4" />
            Added!
          </span>
        ) : loading ? (
          <Loader2 className="w-5 h-5 animate-spin text-surface-400 shrink-0" />
        ) : type === 'incoming' ? (
          <div className="flex gap-2 shrink-0">
            <button
              onClick={handleAccept}
              className="p-2 sm:p-2.5 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center"
              title="Accept"
              aria-label="Accept friend request"
            >
              <Check className="w-5 h-5" />
            </button>
            <button
              onClick={handleDecline}
              className="p-2 sm:p-2.5 rounded-lg bg-surface-100 text-surface-500 hover:bg-surface-200 transition-colors min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center"
              title="Decline"
              aria-label="Decline friend request"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleCancel}
            className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors shrink-0 min-h-[40px] sm:min-h-[44px]"
          >
            Cancel
          </button>
        )}
      </div>
    </motion.div>
  );
}
