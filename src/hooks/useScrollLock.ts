import { useEffect } from 'react';

/** Reference-counted body scroll lock. Safe with multiple concurrent modals. */
let lockCount = 0;

/**
 * Set this to true to globally disable scroll locking.
 * Used by the dev gallery to prevent modals from locking the page.
 */
export let scrollLockDisabled = false;

export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active || scrollLockDisabled) return;
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
