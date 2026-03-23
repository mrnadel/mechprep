// ============================================================
// Environment Variable Validation — MechReady
// ============================================================
// Validates all required env vars at startup so missing config
// produces a clear error instead of a cryptic runtime crash.

import { z } from 'zod';

// --------------- Server-side env vars ---------------

const serverSchema = z.object({
  // Database
  POSTGRES_URL: z
    .string()
    .min(1, 'POSTGRES_URL is required — set it in .env.local'),
  POSTGRES_URL_NON_POOLING: z
    .string()
    .min(1)
    .optional(),

  // Auth (NextAuth reads AUTH_SECRET/AUTH_URL automatically)
  AUTH_GOOGLE_ID: z
    .string()
    .min(1, 'AUTH_GOOGLE_ID is required for Google OAuth'),
  AUTH_GOOGLE_SECRET: z
    .string()
    .min(1, 'AUTH_GOOGLE_SECRET is required for Google OAuth'),

  // Paddle (server-side)
  PADDLE_API_KEY: z
    .string()
    .min(1, 'PADDLE_API_KEY is required for payment processing'),
  PADDLE_WEBHOOK_SECRET: z
    .string()
    .min(1, 'PADDLE_WEBHOOK_SECRET is required for webhook verification'),
  PADDLE_PRO_MONTHLY_PRICE_ID: z
    .string()
    .min(1)
    .optional(),
  PADDLE_PRO_YEARLY_PRICE_ID: z
    .string()
    .min(1)
    .optional(),

  // Admin
  ADMIN_USER_ID: z
    .string()
    .min(1)
    .optional(),

  // Node
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
});

// --------------- Client-side env vars (NEXT_PUBLIC_) ---------------

const clientSchema = z.object({
  NEXT_PUBLIC_PADDLE_CLIENT_TOKEN: z
    .string()
    .default(''),
  NEXT_PUBLIC_MIXPANEL_TOKEN: z
    .string()
    .optional(),
  NEXT_PUBLIC_PADDLE_PRO_MONTHLY_PRICE_ID: z
    .string()
    .optional(),
  NEXT_PUBLIC_PADDLE_PRO_YEARLY_PRICE_ID: z
    .string()
    .optional(),
  NEXT_PUBLIC_ADMIN_USER_ID: z
    .string()
    .optional(),
});

// --------------- Validation ---------------

export type ServerEnv = z.infer<typeof serverSchema>;
export type ClientEnv = z.infer<typeof clientSchema>;

/**
 * Validate server-side environment variables.
 * Call this in server code paths; during `next build` some vars may be
 * absent, so we only validate at runtime (not at import time).
 */
export function validateServerEnv(): ServerEnv {
  const result = serverSchema.safeParse(process.env);
  if (!result.success) {
    const formatted = result.error.issues
      .map((i) => `  - ${i.path.join('.')}: ${i.message}`)
      .join('\n');
    throw new Error(
      `\n\nMissing or invalid environment variables:\n${formatted}\n\nSee .env.example for required values.\n`,
    );
  }
  return result.data;
}

/**
 * Validate client-side environment variables.
 * These are baked in at build time so they are always available.
 */
export function validateClientEnv(): ClientEnv {
  const result = clientSchema.safeParse({
    NEXT_PUBLIC_PADDLE_CLIENT_TOKEN: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
    NEXT_PUBLIC_MIXPANEL_TOKEN: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN,
    NEXT_PUBLIC_PADDLE_PRO_MONTHLY_PRICE_ID: process.env.NEXT_PUBLIC_PADDLE_PRO_MONTHLY_PRICE_ID,
    NEXT_PUBLIC_PADDLE_PRO_YEARLY_PRICE_ID: process.env.NEXT_PUBLIC_PADDLE_PRO_YEARLY_PRICE_ID,
    NEXT_PUBLIC_ADMIN_USER_ID: process.env.NEXT_PUBLIC_ADMIN_USER_ID,
  });
  if (!result.success) {
    console.warn(
      '[env] Client env validation warnings:',
      result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`),
    );
  }
  return result.success ? result.data : (clientSchema.parse({}) as ClientEnv);
}

// --------------- Cached singletons ---------------

let _serverEnv: ServerEnv | null = null;
let _clientEnv: ClientEnv | null = null;

/**
 * Get validated server env (cached after first call).
 * Safe to call in API routes and server components.
 */
export function serverEnv(): ServerEnv {
  if (!_serverEnv) {
    _serverEnv = validateServerEnv();
  }
  return _serverEnv;
}

/**
 * Get validated client env (cached after first call).
 * Safe to call anywhere.
 */
export function clientEnv(): ClientEnv {
  if (!_clientEnv) {
    _clientEnv = validateClientEnv();
  }
  return _clientEnv;
}
