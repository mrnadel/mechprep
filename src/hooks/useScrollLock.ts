import { useEffect } from 'react';

/** Reference-counted body scroll lock. Safe with multiple concurrent modals. */
let lockCount = 0;

export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
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
