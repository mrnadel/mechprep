import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

// Routes that require authentication (not necessarily Pro)
const authRequiredPrefixes = [
  '/profile',
  '/analytics',
  '/settings',
  '/friends',
  '/achievements',
  '/quests',
  '/shop',
  '/progress',
  '/skills',
  '/onboarding',
  '/checkout',
  '/admin',
];

// Routes that require Pro subscription — gated on the client side via
// useSubscription, but middleware redirects unauthenticated users to login
const premiumPrefixes = ['/analytics'];

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  const isAuthPage = pathname === '/login' || pathname === '/register' || pathname === '/get-started';

  // Authenticated users visiting auth pages -> redirect to home
  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  // Auth-required routes -> redirect to login
  if (!isLoggedIn && authRequiredPrefixes.some((p) => pathname.startsWith(p))) {
    const loginUrl = new URL('/login', req.nextUrl);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Everyone else can access all routes (subscription checks happen client-side)
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
