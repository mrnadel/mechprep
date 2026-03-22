import { describe, it, expect, vi, beforeEach } from 'vitest';

// We'll test the middleware logic by extracting the handler inline.
// The middleware file does: export default auth((req) => { ... })
// So auth() wraps a handler. We mock auth to capture and return the handler.

// Mock NextResponse
vi.mock('next/server', () => ({
  NextResponse: {
    redirect: vi.fn((url: URL) => ({ type: 'redirect', url })),
    next: vi.fn(() => ({ type: 'next' })),
  },
}));

// Capture the handler function that middleware passes to auth()
let middlewareHandler: ((req: any) => any) | null = null;

vi.mock('@/lib/auth', () => ({
  auth: (handler: any) => {
    middlewareHandler = handler;
    return handler;
  },
}));

// Force the module to load (vi.mock is hoisted before this runs)
// This will call auth(handler) synchronously during module init
import '@/middleware';
import { config } from '@/middleware';
import { NextResponse } from 'next/server';

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

  it('captured the middleware handler', () => {
    expect(middlewareHandler).not.toBeNull();
    expect(typeof middlewareHandler).toBe('function');
  });

  describe('config', () => {
    it('has a matcher that excludes api, _next, and favicon', () => {
      expect(config.matcher).toBeDefined();
      expect(config.matcher[0]).toContain('(?!api|_next/static|_next/image|favicon.ico)');
    });
  });

  describe('authenticated user on auth pages', () => {
    it('redirects logged-in user from /login to /', () => {
      const req = createMockRequest('/login', true);
      middlewareHandler!(req);

      expect(NextResponse.redirect).toHaveBeenCalled();
      const redirectUrl = (NextResponse.redirect as any).mock.calls[0][0];
      expect(redirectUrl.pathname).toBe('/');
    });

    it('redirects logged-in user from /register to /', () => {
      const req = createMockRequest('/register', true);
      middlewareHandler!(req);

      expect(NextResponse.redirect).toHaveBeenCalled();
      const redirectUrl = (NextResponse.redirect as any).mock.calls[0][0];
      expect(redirectUrl.pathname).toBe('/');
    });

    it('redirects logged-in user from /get-started to /', () => {
      const req = createMockRequest('/get-started', true);
      middlewareHandler!(req);

      expect(NextResponse.redirect).toHaveBeenCalled();
    });
  });

  describe('unauthenticated user on protected routes', () => {
    it('redirects unauthenticated user from /profile to /login with callbackUrl', () => {
      const req = createMockRequest('/profile', false);
      middlewareHandler!(req);

      expect(NextResponse.redirect).toHaveBeenCalled();
      const redirectUrl = (NextResponse.redirect as any).mock.calls[0][0];
      expect(redirectUrl.pathname).toBe('/login');
      expect(redirectUrl.searchParams.get('callbackUrl')).toBe('/profile');
    });

    it('redirects unauthenticated user from /analytics to /login', () => {
      const req = createMockRequest('/analytics', false);
      middlewareHandler!(req);

      expect(NextResponse.redirect).toHaveBeenCalled();
      const redirectUrl = (NextResponse.redirect as any).mock.calls[0][0];
      expect(redirectUrl.pathname).toBe('/login');
      expect(redirectUrl.searchParams.get('callbackUrl')).toBe('/analytics');
    });

    it('redirects unauthenticated user from /analytics/topic to /login', () => {
      const req = createMockRequest('/analytics/topic', false);
      middlewareHandler!(req);

      expect(NextResponse.redirect).toHaveBeenCalled();
    });
  });

  describe('public routes', () => {
    it('allows unauthenticated user on /login', () => {
      const req = createMockRequest('/login', false);
      middlewareHandler!(req);

      expect(NextResponse.next).toHaveBeenCalled();
    });

    it('allows unauthenticated user on /', () => {
      const req = createMockRequest('/', false);
      middlewareHandler!(req);

      expect(NextResponse.next).toHaveBeenCalled();
    });

    it('allows authenticated user on /', () => {
      const req = createMockRequest('/', true);
      middlewareHandler!(req);

      expect(NextResponse.next).toHaveBeenCalled();
    });

    it('allows unauthenticated user on /course', () => {
      const req = createMockRequest('/course', false);
      middlewareHandler!(req);

      expect(NextResponse.next).toHaveBeenCalled();
    });

    it('allows authenticated user on /profile', () => {
      const req = createMockRequest('/profile', true);
      middlewareHandler!(req);

      expect(NextResponse.next).toHaveBeenCalled();
    });
  });
});
