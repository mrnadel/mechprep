import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the auth module
const mockAuth = vi.fn();
vi.mock('@/lib/auth', () => ({
  auth: (handler: any) => {
    // Store the handler so we can call it in tests
    mockAuth.mockImplementation(handler);
    return handler;
  },
}));

// Mock NextResponse
vi.mock('next/server', () => ({
  NextResponse: {
    redirect: vi.fn((url: URL) => ({ type: 'redirect', url: url.toString() })),
    next: vi.fn(() => ({ type: 'next' })),
  },
}));

import { NextResponse } from 'next/server';

// Import middleware after mocks
import middleware, { config } from '@/middleware';

function createMockRequest(pathname: string, isLoggedIn: boolean) {
  const url = new URL(`http://localhost:3000${pathname}`);
  return {
    auth: isLoggedIn ? { user: { id: '1' } } : null,
    nextUrl: url,
  };
}

describe('middleware', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('config.matcher', () => {
    it('has a matcher that excludes api, _next, and favicon', () => {
      expect(config.matcher).toBeDefined();
      expect(config.matcher[0]).toContain('(?!api|_next/static|_next/image|favicon.ico)');
    });
  });

  describe('authenticated user on auth pages', () => {
    it('redirects logged-in user from /login to /', () => {
      const req = createMockRequest('/login', true);
      const result = (middleware as any)(req);

      expect(NextResponse.redirect).toHaveBeenCalled();
      const redirectUrl = (NextResponse.redirect as any).mock.calls[0][0];
      expect(redirectUrl.pathname).toBe('/');
    });

    it('redirects logged-in user from /register to /', () => {
      const req = createMockRequest('/register', true);
      (middleware as any)(req);

      expect(NextResponse.redirect).toHaveBeenCalled();
    });

    it('redirects logged-in user from /get-started to /', () => {
      const req = createMockRequest('/get-started', true);
      (middleware as any)(req);

      expect(NextResponse.redirect).toHaveBeenCalled();
    });
  });

  describe('unauthenticated user on protected routes', () => {
    it('redirects unauthenticated user from /profile to /login', () => {
      const req = createMockRequest('/profile', false);
      (middleware as any)(req);

      expect(NextResponse.redirect).toHaveBeenCalled();
      const redirectUrl = (NextResponse.redirect as any).mock.calls[0][0];
      expect(redirectUrl.pathname).toBe('/login');
      expect(redirectUrl.searchParams.get('callbackUrl')).toBe('/profile');
    });

    it('redirects unauthenticated user from /analytics to /login', () => {
      const req = createMockRequest('/analytics', false);
      (middleware as any)(req);

      expect(NextResponse.redirect).toHaveBeenCalled();
      const redirectUrl = (NextResponse.redirect as any).mock.calls[0][0];
      expect(redirectUrl.pathname).toBe('/login');
      expect(redirectUrl.searchParams.get('callbackUrl')).toBe('/analytics');
    });

    it('redirects unauthenticated user from /analytics/topic to /login', () => {
      const req = createMockRequest('/analytics/topic', false);
      (middleware as any)(req);

      expect(NextResponse.redirect).toHaveBeenCalled();
      const redirectUrl = (NextResponse.redirect as any).mock.calls[0][0];
      expect(redirectUrl.pathname).toBe('/login');
    });
  });

  describe('public routes', () => {
    it('allows unauthenticated user on /login', () => {
      const req = createMockRequest('/login', false);
      const result = (middleware as any)(req);

      expect(NextResponse.next).toHaveBeenCalled();
    });

    it('allows unauthenticated user on /', () => {
      const req = createMockRequest('/', false);
      (middleware as any)(req);

      expect(NextResponse.next).toHaveBeenCalled();
    });

    it('allows authenticated user on /', () => {
      const req = createMockRequest('/', true);
      (middleware as any)(req);

      expect(NextResponse.next).toHaveBeenCalled();
    });

    it('allows unauthenticated user on /course', () => {
      const req = createMockRequest('/course', false);
      (middleware as any)(req);

      expect(NextResponse.next).toHaveBeenCalled();
    });
  });
});
