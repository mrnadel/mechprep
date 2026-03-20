'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useStore } from '@/store/useStore';
import { useCourseStore } from '@/store/useCourseStore';
import { ArrowLeft, Edit3, Check, X, Lock, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { data: session, update: updateSession } = useSession();
  const progress = useStore((s) => s.progress);
  const courseProgress = useCourseStore((s) => s.progress);

  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState('');
  const [nameLoading, setNameLoading] = useState(false);

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  const displayName =
    progress.displayName || session?.user?.name || 'Engineer';
  const email = session?.user?.email || '';
  const image = session?.user?.image;
  const joinedDate = progress.joinedDate;

  const totalQuestions = progress.totalQuestionsAttempted;
  const accuracy =
    totalQuestions > 0
      ? Math.round((progress.totalQuestionsCorrect / totalQuestions) * 100)
      : 0;

  const initial = displayName.charAt(0).toUpperCase();
  const bgColors = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-green-500',
    'bg-orange-500',
    'bg-pink-500',
  ];
  const bgColor = bgColors[initial.charCodeAt(0) % bgColors.length];

  const handleSaveName = async () => {
    if (!newName.trim() || newName.trim().length < 2) return;
    setNameLoading(true);

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayName: newName.trim() }),
      });

      if (res.ok) {
        // Update local stores
        useStore.setState((state) => ({
          progress: { ...state.progress, displayName: newName.trim() },
        }));
        useCourseStore.setState((state) => ({
          progress: { ...state.progress, displayName: newName.trim() },
        }));
        await updateSession({ name: newName.trim() });
        setEditingName(false);
      }
    } catch {
      // Silent fallback
    } finally {
      setNameLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters');
      return;
    }

    setPasswordLoading(true);

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setPasswordError(data.error || 'Failed to change password');
      } else {
        setPasswordSuccess('Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setTimeout(() => {
          setShowPasswordForm(false);
          setPasswordSuccess('');
        }, 2000);
      }
    } catch {
      setPasswordError('Something went wrong');
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' });
  };

  return (
    <div className="pb-8">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="flex items-center h-14 px-4">
          <Link
            href="/"
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </Link>
          <h1 className="text-lg font-bold text-gray-900 ml-2">Profile</h1>
        </div>
      </div>

      <div className="px-4 pt-6 space-y-6">
        {/* Avatar & Info */}
        <div className="text-center">
          {image ? (
            <img
              src={image}
              alt={displayName}
              className="w-24 h-24 rounded-full mx-auto mb-3 border-4 border-white shadow-lg"
            />
          ) : (
            <div
              className={`w-24 h-24 rounded-full mx-auto mb-3 ${bgColor} flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-lg`}
            >
              {initial}
            </div>
          )}

          {/* Display Name */}
          {editingName ? (
            <div className="flex items-center justify-center gap-2">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="px-3 py-1.5 border-2 border-blue-400 rounded-lg text-center font-semibold focus:outline-none"
                autoFocus
                maxLength={50}
              />
              <button
                onClick={handleSaveName}
                disabled={nameLoading}
                className="p-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={() => setEditingName(false)}
                className="p-1.5 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-xl font-bold text-gray-900">
                {displayName}
              </h2>
              <button
                onClick={() => {
                  setNewName(displayName);
                  setEditingName(true);
                }}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          )}

          <p className="text-gray-500 text-sm mt-1">{email}</p>
          {joinedDate && (
            <p className="text-gray-400 text-xs mt-0.5">
              Joined{' '}
              {new Date(joinedDate).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </p>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <p className="text-2xl font-bold text-purple-600">
              {(progress.totalXp + courseProgress.totalXp).toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">Total XP</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <p className="text-2xl font-bold text-blue-600">
              {progress.currentLevel}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">Level</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <p className="text-2xl font-bold text-orange-500">
              {Math.max(progress.currentStreak, courseProgress.currentStreak)}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">Streak</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <p className="text-2xl font-bold text-green-600">{totalQuestions}</p>
            <p className="text-xs text-gray-500 mt-0.5">Questions</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <p className="text-2xl font-bold text-teal-600">{accuracy}%</p>
            <p className="text-xs text-gray-500 mt-0.5">Accuracy</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <p className="text-2xl font-bold text-pink-600">
              {progress.achievementsUnlocked.length}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">Achievements</p>
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="flex items-center gap-2 text-gray-700 font-semibold w-full"
          >
            <Lock className="w-4 h-4" />
            Change Password
          </button>

          {showPasswordForm && (
            <form onSubmit={handleChangePassword} className="mt-4 space-y-3">
              {passwordError && (
                <p className="text-red-500 text-sm">{passwordError}</p>
              )}
              {passwordSuccess && (
                <p className="text-green-500 text-sm">{passwordSuccess}</p>
              )}
              <input
                type="password"
                placeholder="Current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
              <input
                type="password"
                placeholder="New password (8+ characters)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={passwordLoading}
                className="w-full py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white font-semibold rounded-lg text-sm transition-colors"
              >
                {passwordLoading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          )}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3 bg-white hover:bg-red-50 text-red-500 font-semibold rounded-xl border border-red-200 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
      </div>
    </div>
  );
}
