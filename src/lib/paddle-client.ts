// ============================================================
// Paddle Client-Side (browser) — MechReady SaaS
// ============================================================

import { initializePaddle, type Paddle } from '@paddle/paddle-js';

let paddleInstance: Paddle | undefined;

export async function getPaddle(): Promise<Paddle | null> {
  if (paddleInstance) return paddleInstance;
  const isSandbox = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN?.startsWith('test_') ?? false;
  paddleInstance = await initializePaddle({
    environment: isSandbox ? 'sandbox' : 'production',
    token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!,
  });
  return paddleInstance ?? null;
}
