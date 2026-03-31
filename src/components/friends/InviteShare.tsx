'use client';

import { useState } from 'react';
import { Copy, Share2, Check, RefreshCw } from 'lucide-react';
import useSWR from 'swr';
import { useIsDark } from '@/store/useThemeStore';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function InviteShare() {
  const { data, mutate } = useSWR('/api/invite/code', fetcher);
  const [copied, setCopied] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const dark = useIsDark();

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
          title: 'Join me on Octokeen!',
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
      <div
        className="rounded-2xl p-4 mb-5 animate-pulse"
        style={{
          background: dark ? '#1E293B' : 'white',
          border: `1px solid ${dark ? '#334155' : '#E2E8F0'}`,
        }}
      >
        <div className="h-4 rounded w-1/2 mb-3" style={{ background: dark ? '#334155' : '#F1F5F9' }} />
        <div className="h-10 rounded-xl" style={{ background: dark ? '#334155' : '#F1F5F9' }} />
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl p-3 sm:p-4 mb-4 sm:mb-5"
      style={{
        background: dark
          ? 'linear-gradient(135deg, rgba(19,78,74,0.25) 0%, #1E293B 100%)'
          : 'linear-gradient(135deg, #F0FDFA 0%, white 100%)',
        border: `1.5px solid ${dark ? '#0F766E' : '#CCFBF1'}`,
      }}
    >
      <p
        className="text-xs font-bold uppercase tracking-wider mb-1.5 sm:mb-2"
        style={{ color: dark ? '#5EEAD4' : '#0F766E' }}
      >
        Invite Friends
      </p>
      <p
        className="text-xs mb-2.5 sm:mb-3"
        style={{ color: dark ? '#94A3B8' : '#64748B' }}
      >
        Share your link — they&apos;ll be added as your friend when they join.
      </p>

      <div className="flex gap-2">
        <div
          className="flex-1 flex items-center rounded-xl px-3 py-2 min-w-0"
          style={{
            background: dark ? '#0F172A' : 'white',
            border: `1px solid ${dark ? '#334155' : '#E2E8F0'}`,
          }}
        >
          <span
            className="text-[11px] sm:text-xs font-mono truncate"
            style={{ color: dark ? '#CBD5E1' : '#475569' }}
          >
            {inviteUrl}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl transition-colors shrink-0"
          style={{
            background: dark ? '#0F172A' : 'white',
            border: `1px solid ${dark ? '#334155' : '#E2E8F0'}`,
          }}
          aria-label="Copy invite link"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4" style={{ color: dark ? '#94A3B8' : '#64748B' }} />
          )}
        </button>
        <button
          onClick={handleShare}
          className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary-600 text-white hover:bg-primary-700 transition-colors shrink-0"
          aria-label="Share invite link"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      <button
        onClick={handleRegenerate}
        disabled={regenerating}
        className="mt-0.5 text-[11px] font-semibold transition-colors flex items-center gap-1 disabled:opacity-50 min-h-[40px] sm:min-h-[44px] py-2"
        style={{ color: dark ? '#64748B' : '#94A3B8' }}
      >
        <RefreshCw className={`w-3 h-3 ${regenerating ? 'animate-spin' : ''}`} />
        Regenerate link
      </button>
    </div>
  );
}
