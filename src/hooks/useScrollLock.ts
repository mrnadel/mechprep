import { useEffect } from 'react';

/** Reference-counted body scroll lock. Safe with multiple concurrent modals. */
let lockCount = 0;

/**
 * Mutable config for scroll locking.
 * Set scrollLockConfig.disabled = true to globally disable (used by dev gallery).
 */
export const scrollLockConfig = { disabled: false };

export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active || scrollLockConfig.disabled) return;
    lockCount++;
    document.body.style.overflow = 'hidden';
    return () => {
      lockCount--;
      if (lockCount === 0) {
        document.body.style.overflow = '';
      }
    };
  }, [active]);
}
