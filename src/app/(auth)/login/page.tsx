'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { analytics } from '@/lib/mixpanel';

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
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

export default function LoginPage() {
  return (
    <Suspense>
      <LoginPageInner />
    </Suspense>
  );
}

function LoginPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid email or password');
      setLoading(false);
    } else {
      analytics.auth({ action: 'login', method: 'credentials' });
      router.push(callbackUrl);
      router.refresh();
    }
  };

  const handleGoogleSignIn = () => {
    setGoogleLoading(true);
    analytics.auth({ action: 'login', method: 'google' });
    signIn('google', { callbackUrl });
  };

  return (
    <>
      <h2 className="text-xl sm:text-2xl font-black text-surface-900 mb-6 sm:mb-8">Sign in</h2>

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
          <div role="alert" className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center font-semibold">
            {error}
          </div>
        )}

        <label htmlFor="login-email" className="sr-only">Email</label>
        <input
          id="login-email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="w-full px-4 py-3.5 bg-surface-50 border-2 border-surface-200 rounded-2xl text-surface-900 font-semibold placeholder-surface-300 focus:outline-none focus:border-primary-400 focus:bg-white transition-colors"
        />

        <label htmlFor="login-password" className="sr-only">Password</label>
        <input
          id="login-password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          className="w-full px-4 py-3.5 bg-surface-50 border-2 border-surface-200 rounded-2xl text-surface-900 font-semibold placeholder-surface-300 focus:outline-none focus:border-primary-400 focus:bg-white transition-colors"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-[#58CC02] hover:bg-[#4CAD02] disabled:bg-surface-200 disabled:shadow-none disabled:translate-y-0 text-white font-extrabold rounded-2xl transition-all text-[17px] tracking-wide active:translate-y-[2px]"
          style={{
            boxShadow: loading ? 'none' : '0 5px 0 #46A302',
          }}
        >
          {loading ? 'Signing in...' : 'LOG IN'}
        </button>
      </form>

      <p className="text-center text-surface-400 text-sm font-semibold mt-8">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-[#1CB0F6] font-bold">
          Sign up
        </Link>
      </p>
    </>
  );
}
