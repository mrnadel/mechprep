// ============================================================
// Paddle Server-Side Client — MechReady SaaS
// ============================================================

import { Environment, Paddle } from '@paddle/paddle-node-sdk';
import { serverEnv } from './env';

let _paddle: Paddle | null = null;

function getPaddleServer(): Paddle {
  if (!_paddle) {
    const apiKey = serverEnv().PADDLE_API_KEY;
    const isSandbox = apiKey.startsWith('pdl_sdbx_');
    _paddle = new Paddle(apiKey, {
      environment: isSandbox ? Environment.sandbox : Environment.production,
    });
  }
  return _paddle;
}

// Lazy proxy so the Paddle SDK is not instantiated at module load time
// (which would crash during `next build` when env vars are absent).
const paddle: Paddle = new Proxy({} as Paddle, {
  get(_target, prop, receiver) {
    const instance = getPaddleServer();
    const value = Reflect.get(instance, prop, receiver);
    if (typeof value === 'function') {
      return value.bind(instance);
    }
    return value;
  },
});

export default paddle;
