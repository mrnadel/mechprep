import { notFound } from 'next/navigation';
import { GalleryLoader } from './GalleryLoader';

export default function GalleryPage() {
  if (process.env.NODE_ENV === 'production') notFound();
  return <GalleryLoader />;
}
