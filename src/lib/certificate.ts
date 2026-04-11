// ============================================================
// Certificate — URL builder & share helpers
// ============================================================

import { APP_NAME } from '@/lib/constants';

export interface CertificateParams {
  name: string;
  profession: string;
  professionIcon: string;
  color: string;
  score: number;
  date?: string;
}

export type CertificateShareResult = 'shared' | 'copied' | 'downloaded' | 'cancelled';

/**
 * Generate a short deterministic certificate ID from user + profession + date.
 * Format: OKC-XXXXXX (6 uppercase alphanumeric chars).
 * NOT cryptographically secure — decorative only.
 */
export function generateCertificateId(name: string, profession: string, date: string): string {
  const input = `${name}:${profession}:${date}`;
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = ((hash << 5) - hash + input.charCodeAt(i)) | 0;
  }
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // No 0/O/1/I confusion
  let id = '';
  let h = Math.abs(hash);
  for (let i = 0; i < 6; i++) {
    id += chars[h % chars.length];
    h = Math.floor(h / chars.length);
  }
  return `OKC-${id}`;
}

/**
 * Build the public certificate page URL (for sharing/LinkedIn).
 */
export function getCertificatePageUrl(params: CertificateParams, appUrl: string): string {
  const certPageUrl = new URL('/certificate', appUrl);
  certPageUrl.searchParams.set('name', params.name);
  certPageUrl.searchParams.set('profession', params.profession);
  certPageUrl.searchParams.set('professionIcon', params.professionIcon);
  certPageUrl.searchParams.set('color', params.color);
  certPageUrl.searchParams.set('score', String(Math.round(params.score)));
  if (params.date) certPageUrl.searchParams.set('date', params.date);
  return certPageUrl.toString();
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
 * Returns the result so callers can show appropriate UI feedback.
 */
export async function shareCertificate(params: CertificateParams): Promise<CertificateShareResult> {
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
        return 'shared';
      }
    } catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') return 'cancelled';
      console.warn('[certificate] Image share failed, falling back:', e);
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
      return 'shared';
    } catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') return 'cancelled';
      console.warn('[certificate] Text share failed, falling back to download:', e);
      // Fall through to download
    }
  }

  // Final fallback: download
  await downloadCertificate(params);
  return 'downloaded';
}

/**
 * Build a LinkedIn share URL pointing to the public certificate page.
 * LinkedIn's share-offsite endpoint only accepts `url` — the shared content
 * preview is pulled from the target page's Open Graph tags.
 */
export function getLinkedInShareUrl(params: CertificateParams, appUrl: string): string {
  const certPageUrl = getCertificatePageUrl(params, appUrl);
  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(certPageUrl)}`;
}
