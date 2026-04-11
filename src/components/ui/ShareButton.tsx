'use client';

import { useState, useCallback } from 'react';
import { Share2, Check, Loader2, Download } from 'lucide-react';
import { shareImage, type ShareResult } from '@/lib/share-utils';
import { cn } from '@/lib/utils';

interface ShareButtonProps {
  /** Absolute or relative URL to the share card image */
  imageUrl: string;
  /** Text to accompany the shared image */
  shareText: string;
  /** File name for the downloaded/shared PNG */
  fileName: string;
  /** Optional extra class names */
  className?: string;
}

export function ShareButton({
  imageUrl,
  shareText,
  fileName,
  className,
}: ShareButtonProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'copied' | 'downloaded'>('idle');

  const handleShare = useCallback(async () => {
    setStatus('loading');
    let result: ShareResult;
    try {
      result = await shareImage(imageUrl, shareText, fileName);
    } catch {
      setStatus('idle');
      return;
    }

    if (result === 'downloaded') {
      setStatus('downloaded');
      setTimeout(() => setStatus('idle'), 2000);
    } else {
      // 'shared' or 'cancelled' — reset
      setStatus('idle');
    }
  }, [imageUrl, shareText, fileName]);

  const isDesktop = typeof window !== 'undefined' && !('ontouchstart' in window);

  return (
    <div className="flex gap-2">
      <button
        onClick={handleShare}
        disabled={status === 'loading'}
        aria-label="Share your achievement"
        aria-busy={status === 'loading'}
        className={cn(
          'flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors',
          'bg-white/15 text-white hover:bg-white/25',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60',
          'disabled:opacity-60 disabled:cursor-wait',
          className,
        )}
      >
        {status === 'loading' ? (
          <span className="flex items-center gap-1.5" role="status" aria-live="polite">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Sharing...
          </span>
        ) : status === 'downloaded' ? (
          <span className="flex items-center gap-1.5" role="status" aria-live="polite">
            <Check className="w-3.5 h-3.5" />
            Saved!
          </span>
        ) : (
          <>
            <Share2 className="w-3.5 h-3.5" />
            Share
          </>
        )}
      </button>
      {isDesktop && status === 'idle' && (
        <button
          onClick={handleShare}
          aria-label="Download share card image"
          className={cn(
            'flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors',
            'bg-white/15 text-white hover:bg-white/25',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60',
            className,
          )}
        >
          <Download className="w-3.5 h-3.5" />
          Download
        </button>
      )}
    </div>
  );
}
