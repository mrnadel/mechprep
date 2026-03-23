'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { analytics } from '@/lib/mixpanel';

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: '8+ chars', met: password.length >= 8 },
    { label: 'Uppercase', met: /[A-Z]/.test(password) },
    { label: 'Number', met: /\d/.test(password) },
    { label: 'Special char', met: /[^A-Za-z0-9]/.test(password) },
  ];

  if (!password) return null;

  const score = checks.filter((c) => c.met).length;

  return (
    <div className="space-y-2 pt-1">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1.5 sm:h-1 flex-1 rounded-full transition-colors ${
              i <= score
                ? score >= 4
                  ? 'bg-[#58CC02]'
                  : score === 3
                    ? 'bg-amber-400'
                    : 'bg-red-400'
                : 'bg-surface-200'
            }`}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {checks.map((check) => (
          <span
            key={check.label}
            className={`text-xs font-bold ${check.met ? 'text-[#58CC02]' : 'text-surface-300'}`}
          >
            {check.met ? '\u2713' : '\u2022'} {check.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, displayName }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Registration failed');
        setLoading(false);
        return;
      }

      analytics.auth({ action: 'signup', method: 'credentials' });

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Account created but login failed. Try signing in.');
        setLoading(false);
      } else {
        router.push('/');
        router.refresh();
      }
    } catch {
      setError('Something went wrong. Please try again.');
      analytics.error({ action: 'signup', message: 'Registration request failed', source: 'register_page' });
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setGoogleLoading(true);
    analytics.auth({ action: 'signup', method: 'google' });
    signIn('google', { callbackUrl: '/' });
  };

  return (
    <>
      <h2 className="text-xl sm:text-2xl font-black text-surface-900 mb-6 sm:mb-8">Create account</h2>

      {/* Google */}
      <button
        onClick={handleGoogleSignIn}
        disabled={googleLoading}
        className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-white border-2 border-surface-200 rounded-2xl text-surface-700 font-bold hover:border-surface-300 disabled:opacity-60 transition-colors"
      >
        <GoogleIcon />
        {googleLoading ? 'Redirecting...' : 'Continue with Google'}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-px bg-surface-200" />
        <span className="text-xs font-bold text-surface-300 uppercase tracking-wider">or</span>
        <div className="flex-1 h-px bg-surface-200" />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-3">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center font-semibold">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
          minLength={2}
          maxLength={50}
          className="w-full px-4 py-3.5 bg-surface-50 border-2 border-surface-200 rounded-2xl text-surface-900 font-semibold placeholder-surface-300 focus:outline-none focus:border-primary-400 focus:bg-white transition-colors"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3.5 bg-surface-50 border-2 border-surface-200 rounded-2xl text-surface-900 font-semibold placeholder-surface-300 focus:outline-none focus:border-primary-400 focus:bg-white transition-colors"
        />

        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="w-full px-4 py-3.5 bg-surface-50 border-2 border-surface-200 rounded-2xl text-surface-900 font-semibold placeholder-surface-300 focus:outline-none focus:border-primary-400 focus:bg-white transition-colors"
          />
          <PasswordStrength password={password} />
        </div>

        <button
          type="submit"
          disabled={loading || password.length < 8}
          className="w-full py-3.5 bg-[#58CC02] hover:bg-[#4CAD02] disabled:bg-surface-200 disabled:shadow-none disabled:translate-y-0 text-white font-extrabold rounded-2xl transition-all text-[17px] tracking-wide active:translate-y-[2px]"
          style={{
            boxShadow: loading || password.length < 8 ? 'none' : '0 5px 0 #46A302',
          }}
        >
          {loading ? 'Creating account...' : 'CREATE ACCOUNT'}
        </button>
      </form>

      <p className="text-center text-surface-400 text-sm font-semibold mt-8">
        Already have an account?{' '}
        <Link href="/login" className="text-[#1CB0F6] font-bold">
          Sign in
        </Link>
      </p>
    </>
  );
}
