'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Props {
  inviterName: string;
  inviterImage: string | null;
  inviteCode: string;
  loggedIn: boolean;
  isSelf: boolean;
}

export default function InviteClient({ inviterName, inviterImage, inviteCode, loggedIn, isSelf }: Props) {
  const router = useRouter();
  const [accepting, setAccepting] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const cookieSet = useRef(false);

  useEffect(() => {
    if (cookieSet.current || isSelf) return;
    cookieSet.current = true;
    fetch('/api/invite/set-cookie', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: inviteCode }),
    }).catch(() => {});
  }, [inviteCode, isSelf]);

  useEffect(() => {
    if (isSelf) router.replace('/friends');
  }, [isSelf, router]);

  async function handleAccept() {
    setAccepting(true);
    try {
      const res = await fetch('/api/invite/accept', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setResult('success');
        setTimeout(() => router.push('/friends'), 1500);
      } else if (data.already) {
        setResult('already');
        setTimeout(() => router.push('/friends'), 1500);
      } else {
        setResult(data.error || 'Something went wrong');
      }
    } catch {
      setResult('Something went wrong');
    } finally {
      setAccepting(false);
    }
  }

  if (isSelf) return null;

  const initials = inviterName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-4">
      <div className="bg-white rounded-2xl shadow-lg border border-surface-200 p-8 max-w-sm w-full text-center">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center" style={{ background: 'var(--color-primary-100)' }}>
            {inviterImage ? (
              <img src={inviterImage} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="text-primary-700 font-bold text-2xl">{initials}</span>
            )}
          </div>
        </div>

        <h1 className="text-xl font-extrabold text-surface-900 mb-1">
          {inviterName} invited you!
        </h1>
        <p className="text-sm text-surface-500 mb-6">
          Join MechReady and study mechanical engineering together.
        </p>

        {result === 'success' && (
          <div className="rounded-xl bg-green-50 border border-green-200 p-4 mb-4">
            <p className="text-sm font-semibold text-green-700">You&apos;re now friends with {inviterName}!</p>
          </div>
        )}
        {result === 'already' && (
          <div className="rounded-xl bg-blue-50 border border-blue-200 p-4 mb-4">
            <p className="text-sm font-semibold text-blue-700">You&apos;re already friends with {inviterName}!</p>
          </div>
        )}
        {result && result !== 'success' && result !== 'already' && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-4 mb-4">
            <p className="text-sm font-semibold text-red-700">{result}</p>
          </div>
        )}

        {!result && loggedIn && (
          <button
            onClick={handleAccept}
            disabled={accepting}
            className="w-full py-3 rounded-xl bg-primary-600 text-white font-bold text-sm hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            {accepting ? 'Adding...' : `Add ${inviterName} as Friend`}
          </button>
        )}

        {!result && !loggedIn && (
          <div className="flex flex-col gap-3">
            <Link
              href="/register"
              className="w-full py-3 rounded-xl bg-primary-600 text-white font-bold text-sm hover:bg-primary-700 transition-colors text-center"
            >
              Join MechReady
            </Link>
            <Link
              href="/login"
              className="text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              Already have an account? Log in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
