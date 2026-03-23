'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Cookie } from 'lucide-react';

const STORAGE_KEY = 'mechready-cookie-consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);

    // Migrate old "true" value from previous banner to new "accepted" format
    if (consent === 'true') {
      localStorage.setItem(STORAGE_KEY, 'accepted');
      window.dispatchEvent(new CustomEvent('cookie-consent', { detail: 'accepted' }));
      return;
    }

    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleResponse = (accepted: boolean) => {
    const value = accepted ? 'accepted' : 'declined';
    localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);

    // Notify providers (e.g. MixpanelProvider) of the consent decision
    window.dispatchEvent(new CustomEvent('cookie-consent', { detail: value }));
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          role="dialog"
          aria-label="Cookie consent"
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-surface-200 bg-white shadow-lg"
        >
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:flex-nowrap sm:gap-4">
            <div className="flex items-center gap-3 text-sm text-surface-600">
              <Cookie className="hidden h-5 w-5 flex-shrink-0 text-surface-400 sm:block" />
              <p>
                We use essential cookies to keep you signed in and optional
                analytics cookies to improve the app.{' '}
                <Link
                  href="/privacy"
                  className="text-primary-600 underline hover:text-primary-700"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
            <div className="flex flex-shrink-0 items-center gap-2">
              <button
                onClick={() => handleResponse(false)}
                className="rounded-lg px-4 py-2 text-sm font-semibold text-surface-500 hover:text-surface-700 transition-colors"
              >
                Decline
              </button>
              <button
                onClick={() => handleResponse(true)}
                className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
