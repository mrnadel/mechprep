import { useEffect, useRef } from 'react';

/**
 * Pushes a history entry when `active` becomes true,
 * and calls `onBack` when the user presses the browser/mobile back button.
 */
export function useBackHandler(active: boolean, onBack: () => void) {
  const onBackRef = useRef(onBack);
  onBackRef.current = onBack;
  const hasPushed = useRef(false);

  useEffect(() => {
    if (!active) {
      hasPushed.current = false;
      return;
    }

    // Guard against React strict-mode double-mount pushing twice
    if (!hasPushed.current) {
      hasPushed.current = true;
      window.history.pushState({ overlay: true }, '');
    }

    const handlePopState = () => {
      hasPushed.current = false;
      onBackRef.current();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
    // Only re-run when active changes, not when onBack reference changes
  }, [active]);
}
