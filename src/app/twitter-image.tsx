import { ImageResponse } from 'next/og';
import { APP_NAME, APP_TAGLINE } from '@/lib/constants';

export const runtime = 'edge';
export const alt = `${APP_NAME} — ${APP_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export { default } from './opengraph-image';
