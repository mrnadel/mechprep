'use client';

import { useEffect, useRef } from 'react';
import { useSubscription } from '@/hooks/useSubscription';

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Reusable Google AdSense ad slot.
 * Returns null for Pro users. Handles push() deduplication.
 */
export function AdUnit({
  slot,
  format = 'auto',
  responsive = true,
  className,
  style,
}: AdUnitProps) {
  const { isProUser } = useSubscription();
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current || isProUser) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense not loaded or blocked
    }
  }, [isProUser]);

  if (isProUser) return null;

  return (
    <ins
      className={`adsbygoogle ${className ?? ''}`}
      style={{ display: 'block', ...style }}
      data-ad-client="ca-pub-3282358085183080"
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? 'true' : 'false'}
    />
  );
}
