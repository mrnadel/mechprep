// ============================================================
// Certificate — URL builder & share helpers
// ============================================================

import { APP_NAME } from '@/lib/constants';

interface CertificateParams {
  name: string;
  profession: string;
  professionIcon: string;
  color: string;
  score: number;
  date?: string;
}

/**
 * Build the certificate image URL (served by /api/certificate).
 */
export function getCertificateUrl(params: CertificateParams): string {
  const sp = new URLSearchParams({
    name: params.name,
    profession: params.profession,
    professionIcon: params.professionIcon,
    color: params.color,
    score: String(Math.round(params.score)),
    ...(params.date && { date: params.date }),
  });
  return `/api/certificate?${sp.toString()}`;
}

/**
 * Download the certificate as a PNG.
 */
export async function downloadCertificate(params: CertificateParams): Promise<void> {
  const url = getCertificateUrl(params);
  const res = await fetch(url);
  const blob = await res.blob();
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${APP_NAME}-certificate-${params.profession.toLowerCase().replace(/\s+/g, '-')}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
}

/**
 * Share the certificate via Web Share API (with image) or fallback to download.
 */
export async function shareCertificate(params: CertificateParams): Promise<void> {
  const url = getCertificateUrl(params);

  // Try Web Share API with file
  if (navigator.canShare) {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const file = new File([blob], 'certificate.png', { type: 'image/png' });

      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: `${APP_NAME} Certificate`,
          text: `I completed the ${params.profession} course on ${APP_NAME} with a ${Math.round(params.score)}% readiness score!`,
          files: [file],
        });
        return;
      }
    } catch {
      // Fall through to text-only share
    }
  }

  // Fallback: text-only share
  if (navigator.share) {
    try {
      await navigator.share({
        title: `${APP_NAME} Certificate`,
        text: `I completed the ${params.profession} course on ${APP_NAME} with a ${Math.round(params.score)}% readiness score!`,
      });
      return;
    } catch {
      // Fall through to download
    }
  }

  // Final fallback: download
  await downloadCertificate(params);
}

/**
 * Build a LinkedIn share URL with pre-filled text.
 */
export function getLinkedInShareUrl(params: CertificateParams, appUrl: string): string {
  const text = `I just completed the ${params.profession} course on ${APP_NAME} with a ${Math.round(params.score)}% readiness score! 🎓\n\n${appUrl}`;
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(appUrl)}&summary=${encodeURIComponent(text)}`;
}
