'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ChevronRight,
  AlertTriangle,
  Loader2,
  Sun,
  Moon,
  Monitor,
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import { useCourseStore } from '@/store/useCourseStore';
import { useMasteryStore } from '@/store/useMasteryStore';
import { useSubscription } from '@/hooks/useSubscription';
import { useSoundStore } from '@/store/useSoundStore';
import { useNarrationStore } from '@/store/useNarrationStore';
import { useThemeStore, type ThemeMode } from '@/store/useThemeStore';
import { STORAGE_KEYS } from '@/lib/storage-keys';
import { PASSWORD_MIN_LENGTH } from '@/lib/game-config';

export default function SettingsPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { tier, isProUser, hasFetched } = useSubscription();
  const isAdmin = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const displayName = session?.user?.name || 'Engineer';

  // Password — only show for credentials (non-OAuth) users
  const hasPassword = session?.user?.provider === 'credentials';
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Reset progress
  const [resetStep, setResetStep] = useState(0);
  const [resetConfirmText, setResetConfirmText] = useState('');
  const [resetError, setResetError] = useState('');

  // Delete account
  const [deleteStep, setDeleteStep] = useState(0);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [deleteError, setDeleteError] = useState('');

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');
    if (newPassword.length < 8) { setPasswordError('New password must be at least 8 characters'); return; }
    setPasswordLoading(true);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) { setPasswordError(data.error || 'Failed to change password'); }
      else {
        setPasswordSuccess('Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setTimeout(() => { setShowPasswordForm(false); setPasswordSuccess(''); }, 2000);
      }
    } catch { setPasswordError('Something went wrong'); } finally {
      setPasswordLoading(false);
    }
  };

  const handleResetProgress = useCallback(async () => {
    if (resetConfirmText !== 'RESET MY PROGRESS') return;
    setResetStep(3);
    setResetError('');
    try {
      const res = await fetch('/api/user/reset-progress', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirmation: 'RESET MY PROGRESS' }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to reset');
      }
      useStore.getState().resetProgress();
      useCourseStore.setState({ progress: { displayName, totalXp: 0, currentStreak: 0, longestStreak: 0, lastActiveDate: '', activeDays: [], completedLessons: {} } });
      useMasteryStore.getState().clearEvents();
      setResetStep(0);
      setResetConfirmText('');
      window.location.reload();
    } catch (err: any) {
      setResetError(err.message || 'Something went wrong');
      setResetStep(2);
    }
  }, [resetConfirmText, displayName]);

  const handleDeleteAccount = useCallback(async () => {
    if (deleteConfirmText !== 'DELETE MY ACCOUNT') return;
    setDeleteStep(3);
    setDeleteError('');
    try {
      const res = await fetch('/api/user/delete-account', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirmation: 'DELETE MY ACCOUNT' }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete account');
      }
      // Sign out first, then clear local stores
      localStorage.clear();
      await signOut({ callbackUrl: '/login' });
    } catch (err: any) {
      setDeleteError(err.message || 'Something went wrong');
      setDeleteStep(2);
    }
  }, [deleteConfirmText]);

  const { state: pushState, subscribe: enablePush, unsubscribe: disablePush } = usePushNotifications();
  const soundEnabled = useSoundStore((s) => s.enabled);
  const toggleSound = useSoundStore((s) => s.toggleSound);
  const narrationEnabled = useNarrationStore((s) => s.enabled);
  const toggleNarration = useNarrationStore((s) => s.toggleNarration);
  const themeMode = useThemeStore((s) => s.mode);
  const setThemeMode = useThemeStore((s) => s.setMode);

  // Region
  const REGION_OPTIONS = [
    { code: 'US', label: 'United States', flag: '\u{1F1FA}\u{1F1F8}' },
    { code: 'GB', label: 'United Kingdom', flag: '\u{1F1EC}\u{1F1E7}' },
    { code: 'AU', label: 'Australia', flag: '\u{1F1E6}\u{1F1FA}' },
    { code: 'CA', label: 'Canada', flag: '\u{1F1E8}\u{1F1E6}' },
    { code: 'IL', label: 'Israel', flag: '\u{1F1EE}\u{1F1F1}' },
    { code: 'IN', label: 'India', flag: '\u{1F1EE}\u{1F1F3}' },
    { code: 'DE', label: 'Germany', flag: '\u{1F1E9}\u{1F1EA}' },
    { code: 'FR', label: 'France', flag: '\u{1F1EB}\u{1F1F7}' },
    { code: 'JP', label: 'Japan', flag: '\u{1F1EF}\u{1F1F5}' },
    { code: 'KR', label: 'South Korea', flag: '\u{1F1F0}\u{1F1F7}' },
    { code: 'BR', label: 'Brazil', flag: '\u{1F1E7}\u{1F1F7}' },
    { code: 'MX', label: 'Mexico', flag: '\u{1F1F2}\u{1F1FD}' },
    { code: 'NL', label: 'Netherlands', flag: '\u{1F1F3}\u{1F1F1}' },
    { code: 'SE', label: 'Sweden', flag: '\u{1F1F8}\u{1F1EA}' },
    { code: 'CH', label: 'Switzerland', flag: '\u{1F1E8}\u{1F1ED}' },
    { code: 'SG', label: 'Singapore', flag: '\u{1F1F8}\u{1F1EC}' },
    { code: 'NZ', label: 'New Zealand', flag: '\u{1F1F3}\u{1F1FF}' },
    { code: 'ZA', label: 'South Africa', flag: '\u{1F1FF}\u{1F1E6}' },
    { code: 'AE', label: 'United Arab Emirates', flag: '\u{1F1E6}\u{1F1EA}' },
    { code: 'EU', label: 'Europe (other)', flag: '\u{1F1EA}\u{1F1FA}' },
    { code: 'XX', label: 'Other', flag: '\u{1F30D}' },
  ] as const;
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [showRegionPicker, setShowRegionPicker] = useState(false);
  const [regionSearch, setRegionSearch] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.COUNTRY);
    if (stored) setSelectedCountry(stored);
  }, []);

  const handleCountryChange = useCallback(async (code: string) => {
    setSelectedCountry(code);
    setShowRegionPicker(false);
    localStorage.setItem(STORAGE_KEYS.COUNTRY, code);
    if (session?.user) {
      try {
        await fetch('/api/user/profile', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ country: code }),
        });
      } catch { /* silent — localStorage is the primary store */ }
    }
  }, [session?.user]);

  const currentRegion = REGION_OPTIONS.find((r) => r.code === selectedCountry) || REGION_OPTIONS[0];

  // Privacy — load from API, persist to DB
  const [profilePublic, setProfilePublic] = useState(true);
  useEffect(() => {
    fetch('/api/user/profile')
      .then((r) => r.json())
      .then((data) => {
        if (data.profilePublic !== undefined) setProfilePublic(data.profilePublic);
      })
      .catch(() => {});
  }, []);
  const toggleProfilePublic = useCallback(() => {
    const next = !profilePublic;
    setProfilePublic(next);
    fetch('/api/user/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profilePublic: next }),
    }).catch(() => {});
  }, [profilePublic]);

  // Auth provider
  const authProvider = session?.user?.provider;

  // Reusable row styles
  const rowBase = 'flex items-center w-full px-4 py-3 transition-colors';
  const rowLink = `${rowBase} hover:bg-gray-50 dark:hover:bg-surface-700`;
  const rowLabel = 'text-sm font-semibold text-gray-800 dark:text-surface-100 flex-1 text-left';
  const rowMeta = 'text-sm text-gray-400 dark:text-surface-500';
  const chevron = 'w-4 h-4 text-gray-300 dark:text-surface-600 shrink-0 ml-1';
  const divider = 'border-t border-gray-100 dark:border-surface-700';
  const card = 'bg-white dark:bg-surface-800 rounded-2xl border border-gray-100 dark:border-surface-700 overflow-hidden';
  const sectionLabel = 'text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-2 px-1';

  return (
    <div className="pb-10">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/90 dark:bg-surface-900/90 backdrop-blur-xl border-b border-gray-100 dark:border-surface-700">
        <div className="flex items-center h-14 px-4">
          <button onClick={() => router.back()} className="p-3 -ml-3 rounded-full hover:bg-gray-100 dark:hover:bg-surface-800 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-surface-400" />
          </button>
          <h1 className="text-lg font-extrabold text-gray-900 dark:text-surface-50 ml-2">Settings</h1>
        </div>
      </div>

      <div className="px-3 sm:px-4 mt-5 space-y-5 max-w-lg mx-auto">

        {/* ── Preferences ── */}
        <div>
          <h3 className={sectionLabel}>Preferences</h3>
          <div className={card}>
            {/* Sound */}
            <button onClick={toggleSound} className={rowBase + ' hover:bg-gray-50 dark:hover:bg-surface-700'}>
              <span className={rowLabel}>Sound effects</span>
              <div className={`relative w-11 h-6 rounded-full transition-colors ${soundEnabled ? 'bg-primary-500' : 'bg-gray-300 dark:bg-surface-600'}`}>
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${soundEnabled ? 'left-[22px]' : 'left-0.5'}`} />
              </div>
            </button>

            {/* Narration */}
            <button onClick={toggleNarration} className={`${divider} ${rowBase} hover:bg-gray-50 dark:hover:bg-surface-700`}>
              <div className="flex-1 text-left">
                <span className={rowLabel}>Read questions aloud</span>
                <p className="text-xs text-gray-400 dark:text-surface-500 mt-0.5">Uses your device&apos;s built-in voice</p>
              </div>
              <div className={`relative w-11 h-6 rounded-full shrink-0 transition-colors ${narrationEnabled ? 'bg-primary-500' : 'bg-gray-300 dark:bg-surface-600'}`}>
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${narrationEnabled ? 'left-[22px]' : 'left-0.5'}`} />
              </div>
            </button>

            {/* Theme */}
            <div className={`${divider} ${rowBase}`}>
              <span className={rowLabel}>Dark mode</span>
              <div className="flex bg-gray-100 dark:bg-surface-700 rounded-lg p-0.5 gap-0.5">
                {([
                  { value: 'light' as ThemeMode, icon: Sun, label: 'Light' },
                  { value: 'dark' as ThemeMode, icon: Moon, label: 'Dark' },
                  { value: 'system' as ThemeMode, icon: Monitor, label: 'System' },
                ]).map(({ value, icon: Icon, label }) => (
                  <button
                    key={value}
                    onClick={() => setThemeMode(value)}
                    className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all ${
                      themeMode === value
                        ? 'bg-white dark:bg-surface-600 shadow-sm text-gray-700 dark:text-surface-100'
                        : 'text-gray-400 dark:text-surface-500 hover:text-gray-600 dark:hover:text-surface-300'
                    }`}
                    aria-label={label}
                    title={label}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>
            </div>

            {/* Streak reminders */}
            {pushState !== 'unsupported' && pushState !== 'loading' && (
              <div className={`${divider} ${rowBase}`}>
                <span className={rowLabel}>Streak reminders</span>
                {pushState === 'granted' ? (
                  <button onClick={disablePush} className={`relative w-11 h-6 rounded-full bg-primary-500 transition-colors`}>
                    <span className="absolute top-0.5 left-[22px] w-5 h-5 rounded-full bg-white shadow-sm" />
                  </button>
                ) : pushState === 'prompt' ? (
                  <button onClick={enablePush} className="px-3 py-1 text-xs font-bold text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors">
                    Enable
                  </button>
                ) : (
                  <span className="text-xs text-gray-400 dark:text-surface-500">Blocked</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Account ── */}
        <div>
          <h3 className={sectionLabel}>Account</h3>
          <div className={card}>
            {/* Courses */}
            <Link href="/settings/courses" className={rowLink}>
              <span className={rowLabel}>Courses</span>
              <ChevronRight className={chevron} />
            </Link>

            {/* Region */}
            <button onClick={() => { setShowRegionPicker(true); setRegionSearch(''); }} className={`${divider} ${rowLink} text-left`}>
              <span className={rowLabel}>Region</span>
              <span className={rowMeta + ' mr-1 truncate max-w-[160px] text-right'}>{currentRegion.label}</span>
              <ChevronRight className={chevron} />
            </button>

            {/* Linked account */}
            <div className={`${divider} ${rowBase}`}>
              <span className={rowLabel}>
                {authProvider === 'google' ? 'Google' : 'Email & Password'}
              </span>
              <span className={rowMeta + ' truncate max-w-[180px] text-right'}>{session?.user?.email || ''}</span>
            </div>

            {/* Public profile */}
            <button onClick={toggleProfilePublic} className={`${divider} ${rowBase} hover:bg-gray-50 dark:hover:bg-surface-700`}>
              <span className={rowLabel}>Public profile</span>
              <div className={`relative w-11 h-6 rounded-full transition-colors ${profilePublic ? 'bg-primary-500' : 'bg-gray-300 dark:bg-surface-600'}`}>
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${profilePublic ? 'left-[22px]' : 'left-0.5'}`} />
              </div>
            </button>

            {/* Change password */}
            {hasPassword && (
              <>
                <button
                  onClick={() => setShowPasswordForm(!showPasswordForm)}
                  className={`${divider} ${rowLink}`}
                >
                  <span className={rowLabel}>Change password</span>
                  <ChevronRight className={`${chevron} transition-transform ${showPasswordForm ? 'rotate-90' : ''}`} />
                </button>

                <AnimatePresence>
                  {showPasswordForm && (
                    <motion.form
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleChangePassword}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 space-y-3 border-t border-gray-50 dark:border-surface-700 pt-3">
                        {passwordError && <p className="text-red-500 text-xs font-semibold">{passwordError}</p>}
                        {passwordSuccess && <p className="text-emerald-500 text-xs font-semibold">{passwordSuccess}</p>}
                        <input
                          type="password" placeholder="Current password" value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)} required
                          className="w-full px-3 py-2.5 bg-gray-50 dark:bg-surface-700 border border-gray-200 dark:border-surface-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all text-gray-800 dark:text-surface-100"
                        />
                        <input
                          type="password" placeholder="New password (8+ characters)" value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)} required minLength={PASSWORD_MIN_LENGTH}
                          className="w-full px-3 py-2.5 bg-gray-50 dark:bg-surface-700 border border-gray-200 dark:border-surface-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all text-gray-800 dark:text-surface-100"
                        />
                        <button
                          type="submit" disabled={passwordLoading}
                          className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white font-bold rounded-xl text-sm transition-colors"
                        >
                          {passwordLoading ? 'Updating...' : 'Update Password'}
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </>
            )}

            {/* Admin */}
            {isAdmin && (
              <Link href="/admin/users" className={`${divider} ${rowLink}`}>
                <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 flex-1">Admin Panel</span>
                <ChevronRight className={chevron} />
              </Link>
            )}
          </div>
        </div>

        {/* ── Subscription ── */}
        <div>
          <h3 className={sectionLabel}>Subscription</h3>
          <div className={card}>
            <Link href="/settings/billing" className={rowLink}>
              <span className={rowLabel}>Billing</span>
              <span className={rowMeta + ' mr-1'}>{hasFetched ? (isProUser ? 'Pro' : 'Free') : '...'}</span>
              <ChevronRight className={chevron} />
            </Link>
            {hasFetched && !isProUser && (
              <Link href="/pricing" className={`${divider} ${rowLink}`}>
                <span className="text-sm font-semibold text-amber-600 dark:text-amber-400 flex-1">Upgrade to Pro</span>
                <ChevronRight className={chevron} />
              </Link>
            )}
          </div>
        </div>

        {/* ── Support ── */}
        <div>
          <h3 className={sectionLabel}>Support</h3>
          <div className={card}>
            <Link href="/contact" className={rowLink}>
              <span className={rowLabel}>Help & FAQ</span>
              <ChevronRight className={chevron} />
            </Link>
          </div>
        </div>

        {/* ── Log Out ── */}
        <div className={card}>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className={`${rowBase} hover:bg-red-50 dark:hover:bg-red-900/20 justify-center`}
          >
            <span className="text-sm font-bold text-red-500">LOG OUT</span>
          </button>
        </div>

        {/* ── Danger Zone ── */}
        <div>
          <h3 className="text-xs font-bold text-red-400 dark:text-red-500 uppercase tracking-wider mb-2 px-1">Danger Zone</h3>
          <div className={`${card} !border-red-100 dark:!border-red-900/40`}>
            <button
              onClick={() => { setResetStep(resetStep === 0 ? 1 : 0); setResetConfirmText(''); setResetError(''); }}
              className={`${rowBase} hover:bg-red-50/50 dark:hover:bg-red-900/20`}
            >
              <span className="text-sm font-semibold text-gray-600 dark:text-surface-300 flex-1 text-left">Reset all progress</span>
              <ChevronRight className={`${chevron} transition-transform ${resetStep > 0 ? 'rotate-90' : ''}`} />
            </button>

            <AnimatePresence>
              {resetStep >= 1 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 border-t border-red-50 dark:border-red-900/30 pt-4 space-y-3">
                    {resetStep === 1 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                        <div className="flex gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
                          <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                          <div className="text-xs text-red-700 dark:text-red-400 space-y-1">
                            <p className="font-bold">This action is permanent and cannot be undone.</p>
                            <p>All XP, streaks, lessons, mastery, and achievements will be erased.</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => setResetStep(2)} className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl text-sm transition-colors">
                            I understand, continue
                          </button>
                          <button onClick={() => { setResetStep(0); setResetConfirmText(''); }} className="px-4 py-2.5 bg-gray-100 dark:bg-surface-700 hover:bg-gray-200 dark:hover:bg-surface-600 text-gray-600 dark:text-surface-300 font-bold rounded-xl text-sm transition-colors">
                            Cancel
                          </button>
                        </div>
                      </motion.div>
                    )}
                    {resetStep === 2 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                        {resetError && <p className="text-red-500 text-xs font-semibold">{resetError}</p>}
                        <p className="text-xs text-gray-500 dark:text-surface-400">
                          Type <span className="font-mono font-bold text-red-500 bg-red-50 dark:bg-red-900/20 px-1.5 py-0.5 rounded">RESET MY PROGRESS</span> to confirm:
                        </p>
                        <input type="text" value={resetConfirmText} onChange={(e) => setResetConfirmText(e.target.value)} placeholder="Type here..." autoFocus className="w-full px-3 py-2.5 bg-gray-50 dark:bg-surface-700 border-2 border-gray-200 dark:border-surface-600 rounded-xl text-sm font-mono focus:outline-none focus:border-red-400 transition-all text-gray-800 dark:text-surface-100" />
                        <div className="flex gap-2">
                          <button onClick={handleResetProgress} disabled={resetConfirmText !== 'RESET MY PROGRESS'} className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 disabled:bg-gray-200 dark:disabled:bg-surface-700 disabled:text-gray-400 text-white font-bold rounded-xl text-sm transition-colors">
                            Permanently Reset Everything
                          </button>
                          <button onClick={() => { setResetStep(0); setResetConfirmText(''); setResetError(''); }} className="px-4 py-2.5 bg-gray-100 dark:bg-surface-700 hover:bg-gray-200 dark:hover:bg-surface-600 text-gray-600 dark:text-surface-300 font-bold rounded-xl text-sm transition-colors">
                            Cancel
                          </button>
                        </div>
                      </motion.div>
                    )}
                    {resetStep === 3 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-2 py-4">
                        <Loader2 className="w-5 h-5 text-red-400 animate-spin" />
                        <span className="text-sm font-bold text-gray-500 dark:text-surface-400">Resetting all progress...</span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Delete Account */}
            <button
              onClick={() => { setDeleteStep(deleteStep === 0 ? 1 : 0); setDeleteConfirmText(''); setDeleteError(''); }}
              className={`${divider} !border-red-100 dark:!border-red-900/40 ${rowBase} hover:bg-red-50/50 dark:hover:bg-red-900/20`}
            >
              <span className="text-sm font-semibold text-red-500 flex-1 text-left">Delete account</span>
              <ChevronRight className={`${chevron} transition-transform ${deleteStep > 0 ? 'rotate-90' : ''}`} />
            </button>

            <AnimatePresence>
              {deleteStep >= 1 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 border-t border-red-50 dark:border-red-900/30 pt-4 space-y-3">
                    {deleteStep === 1 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                        <div className="flex gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
                          <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                          <div className="text-xs text-red-700 dark:text-red-400 space-y-1">
                            <p className="font-bold">This will permanently delete your account.</p>
                            <p>Your credentials, progress, subscription, and friend connections will be erased.</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => setDeleteStep(2)} className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl text-sm transition-colors">
                            I understand, continue
                          </button>
                          <button onClick={() => { setDeleteStep(0); setDeleteConfirmText(''); }} className="px-4 py-2.5 bg-gray-100 dark:bg-surface-700 hover:bg-gray-200 dark:hover:bg-surface-600 text-gray-600 dark:text-surface-300 font-bold rounded-xl text-sm transition-colors">
                            Cancel
                          </button>
                        </div>
                      </motion.div>
                    )}
                    {deleteStep === 2 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                        {deleteError && <p className="text-red-500 text-xs font-semibold">{deleteError}</p>}
                        <p className="text-xs text-gray-500 dark:text-surface-400">
                          Type <span className="font-mono font-bold text-red-500 bg-red-50 dark:bg-red-900/20 px-1.5 py-0.5 rounded">DELETE MY ACCOUNT</span> to confirm:
                        </p>
                        <input type="text" value={deleteConfirmText} onChange={(e) => setDeleteConfirmText(e.target.value)} placeholder="Type here..." autoFocus className="w-full px-3 py-2.5 bg-gray-50 dark:bg-surface-700 border-2 border-gray-200 dark:border-surface-600 rounded-xl text-sm font-mono focus:outline-none focus:border-red-400 transition-all text-gray-800 dark:text-surface-100" />
                        <div className="flex gap-2">
                          <button onClick={handleDeleteAccount} disabled={deleteConfirmText !== 'DELETE MY ACCOUNT'} className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-gray-200 dark:disabled:bg-surface-700 disabled:text-gray-400 text-white font-bold rounded-xl text-sm transition-colors">
                            Permanently Delete Account
                          </button>
                          <button onClick={() => { setDeleteStep(0); setDeleteConfirmText(''); setDeleteError(''); }} className="px-4 py-2.5 bg-gray-100 dark:bg-surface-700 hover:bg-gray-200 dark:hover:bg-surface-600 text-gray-600 dark:text-surface-300 font-bold rounded-xl text-sm transition-colors">
                            Cancel
                          </button>
                        </div>
                      </motion.div>
                    )}
                    {deleteStep === 3 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-2 py-4">
                        <Loader2 className="w-5 h-5 text-red-400 animate-spin" />
                        <span className="text-sm font-bold text-gray-500 dark:text-surface-400">Deleting your account...</span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Region picker modal */}
      <AnimatePresence>
        {showRegionPicker && (
          <motion.div
            key="region-overlay"
            className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowRegionPicker(false)}
          >
            <div className="absolute inset-0 bg-black/40" />
            <motion.div
              className="relative w-full sm:w-auto sm:mx-4 bg-white dark:bg-surface-800 overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Select your region"
              style={{
                maxWidth: 420,
                maxHeight: 'min(520px, calc(100vh - 48px))',
                borderRadius: 24,
                display: 'flex',
                flexDirection: 'column',
              }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-5 pt-5 pb-3">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-extrabold text-gray-800 dark:text-surface-100">Select Region</h2>
                  <button
                    onClick={() => setShowRegionPicker(false)}
                    className="w-8 h-8 rounded-full bg-gray-100 dark:bg-surface-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-surface-600 transition-colors"
                    aria-label="Close"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M11 3L3 11M3 3l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-gray-400 dark:text-surface-400" />
                    </svg>
                  </button>
                </div>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-surface-500" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.5" />
                    <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                  <input
                    type="text" value={regionSearch} onChange={(e) => setRegionSearch(e.target.value)}
                    placeholder="Search countries..." autoFocus
                    className="w-full pl-9 pr-3 py-2.5 bg-gray-100 dark:bg-surface-700 border-none rounded-xl text-sm text-gray-700 dark:text-surface-200 placeholder-gray-400 dark:placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto px-3 pb-5" style={{ WebkitOverflowScrolling: 'touch' }}>
                {(() => {
                  const q = regionSearch.toLowerCase().trim();
                  const filtered = q
                    ? REGION_OPTIONS.filter((r) => r.label.toLowerCase().includes(q) || r.code.toLowerCase().includes(q))
                    : REGION_OPTIONS;
                  if (filtered.length === 0) {
                    return (
                      <div className="py-8 text-center">
                        <p className="text-sm font-semibold text-gray-400 dark:text-surface-500">No matching region</p>
                        <p className="text-xs text-gray-300 dark:text-surface-600 mt-1">Try a different search term</p>
                      </div>
                    );
                  }
                  return filtered.map((r) => {
                    const isSelected = selectedCountry === r.code;
                    return (
                      <button
                        key={r.code}
                        onClick={() => handleCountryChange(r.code)}
                        className={`flex items-center gap-3 w-full px-3 py-3 rounded-xl text-left transition-all mb-0.5 ${
                          isSelected ? 'bg-sky-50 dark:bg-sky-900/30' : 'hover:bg-gray-50 dark:hover:bg-surface-700'
                        }`}
                      >
                        <span className="text-xl leading-none">{r.flag}</span>
                        <span className={`text-sm font-semibold flex-1 ${isSelected ? 'text-sky-700 dark:text-sky-300' : 'text-gray-700 dark:text-surface-200'}`}>
                          {r.label}
                        </span>
                        {isSelected && (
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" fill="#0EA5E9" />
                            <path d="M7.5 12.5L10.5 15.5L16.5 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </button>
                    );
                  });
                })()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
