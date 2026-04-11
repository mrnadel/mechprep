import type { Metadata } from 'next';
import { APP_NAME, APP_URL } from '@/lib/constants';
import { CertificatePageClient } from './CertificatePageClient';

interface Props {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp = await searchParams;
  const name = sp.name || 'Learner';
  const profession = sp.profession || 'Course';
  const score = sp.score || '0';

  const certUrl = new URL('/api/certificate', APP_URL);
  for (const [k, v] of Object.entries(sp)) {
    if (v) certUrl.searchParams.set(k, v);
  }

  return {
    title: `${name}'s ${profession} Certificate — ${APP_NAME}`,
    description: `${name} completed the ${profession} course on ${APP_NAME} with a ${score}% readiness score.`,
    robots: { index: false, follow: false },
    openGraph: {
      title: `${name}'s ${profession} Certificate`,
      description: `${name} completed the ${profession} course with a ${score}% readiness score.`,
      images: [{ url: certUrl.toString(), width: 1200, height: 630, alt: `${APP_NAME} Certificate` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${name}'s ${profession} Certificate`,
      description: `${name} completed the ${profession} course with a ${score}% readiness score.`,
      images: [certUrl.toString()],
    },
  };
}

export default async function CertificatePage({ searchParams }: Props) {
  const sp = await searchParams;
  return <CertificatePageClient params={sp} />;
}
