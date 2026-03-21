import { useEffect, useRef } from 'react';

/**
 * Pushes a history entry when `active` becomes true,
 * and calls `onBack` when the user presses the browser/mobile back button.
 * Cleans up the extra history entry if the overlay is dismissed by other means.
 */
export function useBackHandler(active: boolean, onBack: () => void) {
  const pushed = useRef(false);
  const onBackRef = useRef(onBack);
  onBackRef.current = onBack;

  useEffect(() => {
    if (!active) {
      pushed.current = false;
      return;
    }

    // Push a sentinel state so pressing back fires popstate instead of navigating away
    window.history.pushState({ overlay: true }, '');
    pushed.current = true;

    const handlePopState = () => {
      // The user pressed back — close the overlay
      pushed.current = false;
      onBackRef.current();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      // If the overlay was dismissed via UI (not back button), pop the extra history entry
      if (pushed.current) {
        pushed.current = false;
        window.history.back();
      }
    };
  }, [active]);
}
