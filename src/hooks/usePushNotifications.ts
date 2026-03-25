'use client';

import { useState, useEffect, useCallback } from 'react';

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? '';

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

type PushState = 'unsupported' | 'prompt' | 'granted' | 'denied' | 'loading';

export function usePushNotifications() {
  const [state, setState] = useState<PushState>('loading');
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!('serviceWorker' in navigator) || !('PushManager' in window) || !VAPID_PUBLIC_KEY) {
      setState('unsupported');
      return;
    }

    const permission = Notification.permission;
    if (permission === 'denied') {
      setState('denied');
      return;
    }

    // Check existing subscription
    navigator.serviceWorker.ready.then((reg) => {
      reg.pushManager.getSubscription().then((sub) => {
        if (sub) {
          setSubscription(sub);
          setState('granted');
        } else {
          setState(permission === 'granted' ? 'granted' : 'prompt');
        }
      });
    });
  }, []);

  const subscribe = useCallback(async () => {
    if (!('serviceWorker' in navigator) || !VAPID_PUBLIC_KEY) return false;

    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY) as BufferSource,
      });

      // Send subscription to server
      const res = await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sub.toJSON()),
      });

      if (res.ok) {
        setSubscription(sub);
        setState('granted');
        return true;
      }
      return false;
    } catch {
      // User denied or error
      if (Notification.permission === 'denied') {
        setState('denied');
      }
      return false;
    }
  }, []);

  const unsubscribe = useCallback(async () => {
    if (!subscription) return;

    try {
      await subscription.unsubscribe();
      await fetch('/api/push/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint: subscription.endpoint }),
      });
      setSubscription(null);
      setState('prompt');
    } catch {
      // ignore
    }
  }, [subscription]);

  return { state, subscription, subscribe, unsubscribe };
}
