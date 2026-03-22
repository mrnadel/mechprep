'use client';

import { useState } from 'react';
import { UserPlus, UserCheck, Clock, UserMinus, Loader2 } from 'lucide-react';

type Relationship = 'none' | 'request_sent' | 'request_received' | 'friends';

interface AddFriendButtonProps {
  targetUserId: string;
  initialRelationship: Relationship;
  requestId?: string;
  onRelationshipChange?: () => void;
}

export default function AddFriendButton({
  targetUserId,
  initialRelationship,
  requestId,
  onRelationshipChange,
}: AddFriendButtonProps) {
  const [relationship, setRelationship] = useState(initialRelationship);
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  async function sendRequest() {
    setLoading(true);
    try {
      const res = await fetch('/api/friends/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ receiverId: targetUserId }),
      });
      if (res.ok) {
        setRelationship('request_sent');
        onRelationshipChange?.();
      }
    } finally {
      setLoading(false);
    }
  }

  async function acceptRequest() {
    if (!requestId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/friends/request/${requestId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'accept' }),
      });
      if (res.ok) {
        setRelationship('friends');
        onRelationshipChange?.();
      }
    } finally {
      setLoading(false);
    }
  }

  async function cancelRequest() {
    if (!requestId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/friends/request/${requestId}`, { method: 'DELETE' });
      if (res.ok) {
        setRelationship('none');
        setShowMenu(false);
        onRelationshipChange?.();
      }
    } finally {
      setLoading(false);
    }
  }

  async function removeFriend() {
    setLoading(true);
    try {
      const res = await fetch(`/api/friends/${targetUserId}`, { method: 'DELETE' });
      if (res.ok) {
        setRelationship('none');
        setShowMenu(false);
        onRelationshipChange?.();
      }
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <button disabled className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-100 text-surface-400 text-sm font-semibold">
        <Loader2 className="w-4 h-4 animate-spin" />
      </button>
    );
  }

  if (relationship === 'none') {
    return (
      <button
        onClick={sendRequest}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors active:scale-[0.97]"
      >
        <UserPlus className="w-4 h-4" />
        Add Friend
      </button>
    );
  }

  if (relationship === 'request_sent') {
    return (
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-100 text-surface-500 text-sm font-semibold"
        >
          <Clock className="w-4 h-4" />
          Request Sent
        </button>
        {showMenu && (
          <div className="absolute top-full mt-1 right-0 bg-white rounded-lg shadow-lg border border-surface-200 py-1 z-10">
            <button
              onClick={cancelRequest}
              className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left"
            >
              Cancel Request
            </button>
          </div>
        )}
      </div>
    );
  }

  if (relationship === 'request_received') {
    return (
      <div className="flex gap-2">
        <button
          onClick={acceptRequest}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors active:scale-[0.97]"
        >
          <UserCheck className="w-4 h-4" />
          Accept
        </button>
      </div>
    );
  }

  // friends
  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-primary-200 text-primary-700 text-sm font-semibold hover:bg-primary-50 transition-colors"
      >
        <UserCheck className="w-4 h-4" />
        Friends
      </button>
      {showMenu && (
        <div className="absolute top-full mt-1 right-0 bg-white rounded-lg shadow-lg border border-surface-200 py-1 z-10">
          <button
            onClick={removeFriend}
            className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left flex items-center gap-2"
          >
            <UserMinus className="w-4 h-4" />
            Remove Friend
          </button>
        </div>
      )}
    </div>
  );
}
