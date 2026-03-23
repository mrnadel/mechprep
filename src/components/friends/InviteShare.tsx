'use client';

import { useState } from 'react';
import { Copy, Share2, Check, RefreshCw } from 'lucide-react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function InviteShare() {
  const { data, mutate } = useSWR('/api/invite/code', fetcher);
  const [copied, setCopied] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  const code = data?.code;
  const inviteUrl = typeof window !== 'undefined' && code
    ? `${window.location.origin}/invite/${code}`
    : '';

  async function handleCopy() {
    if (!inviteUrl) return;
    await navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleShare() {
    if (!inviteUrl) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join me on MechReady!',
          text: 'Practice mechanical engineering interview questions together.',
          url: inviteUrl,
        });
      } catch {
        // User cancelled
      }
    } else {
      handleCopy();
    }
  }

  async function handleRegenerate() {
    setRegenerating(true);
    try {
      const res = await fetch('/api/invite/code/regenerate', { method: 'POST' });
      const data = await res.json();
      if (data.code) {
        mutate({ code: data.code }, false);
      }
    } finally {
      setRegenerating(false);
    }
  }

  if (!code) {
    return (
      <div className="rounded-2xl border border-surface-200 bg-white p-4 mb-5 animate-pulse">
        <div className="h-4 bg-surface-100 rounded w-1/2 mb-3" />
        <div className="h-10 bg-surface-100 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-primary-100 bg-gradient-to-br from-primary-50 to-white p-4 mb-5">
      <p className="text-xs font-bold text-primary-700 uppercase tracking-wider mb-2">
        Invite Friends
      </p>
      <p className="text-xs text-surface-500 mb-3">
        Share your link — they'll be added as your friend when they join.
      </p>

      <div className="flex gap-2">
        <div className="flex-1 flex items-center bg-white rounded-xl border border-surface-200 px-3 py-2 min-w-0">
          <span className="text-xs font-mono text-surface-600 truncate">
            {inviteUrl}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center justify-center w-11 h-11 rounded-xl bg-white border border-surface-200 hover:bg-surface-50 transition-colors shrink-0"
          aria-label="Copy invite link"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4 text-surface-500" />
          )}
        </button>
        <button
          onClick={handleShare}
          className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary-600 text-white hover:bg-primary-700 transition-colors shrink-0"
          aria-label="Share invite link"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <button
        onClick={handleRegenerate}
        disabled={regenerating}
        className="mt-1 text-[11px] font-semibold text-surface-400 hover:text-surface-600 transition-colors flex items-center gap-1 disabled:opacity-50 min-h-[44px] py-2"
      >
        <RefreshCw className={`w-3 h-3 ${regenerating ? 'animate-spin' : ''}`} />
        Regenerate link
      </button>
    </div>
  );
}
