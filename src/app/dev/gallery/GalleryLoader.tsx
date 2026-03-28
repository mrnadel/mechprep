'use client';

import dynamic from 'next/dynamic';

const GalleryClient = dynamic(() => import('./GalleryClient'), { ssr: false });

export function GalleryLoader() {
  return <GalleryClient />;
}
