import { describe, it, expect } from 'vitest';
import { getCertificateUrl, generateCertificateId, getLinkedInShareUrl, getCertificatePageUrl } from '@/lib/certificate';

describe('getCertificateUrl', () => {
  it('builds correct URL with all params', () => {
    const url = getCertificateUrl({
      name: 'Alice',
      profession: 'Personal Finance',
      professionIcon: '\uD83D\uDCB0',
      color: '#10B981',
      score: 87,
    });
    expect(url).toContain('/api/certificate?');
    expect(url).toContain('name=Alice');
    expect(url).toContain('score=87');
    expect(url).toContain('profession=Personal+Finance');
  });

  it('handles special characters in profession name', () => {
    const url = getCertificateUrl({
      name: 'Bob',
      profession: 'Psychology & Human Behavior',
      professionIcon: '\uD83E\uDDE0',
      color: '#A78BFA',
      score: 45,
    });
    expect(url).toContain('Psychology');
    expect(url).toContain('%26');
  });

  it('includes date when provided', () => {
    const url = getCertificateUrl({
      name: 'Carol',
      profession: 'Space',
      professionIcon: '\uD83D\uDE80',
      color: '#818CF8',
      score: 92,
      date: 'April 7, 2026',
    });
    expect(url).toContain('date=April');
  });
});

describe('generateCertificateId', () => {
  it('returns OKC-XXXXXX format', () => {
    const id = generateCertificateId('Alice', 'Finance', '2026-04-07');
    expect(id).toMatch(/^OKC-[A-Z2-9]{6}$/);
  });

  it('is deterministic for same inputs', () => {
    const id1 = generateCertificateId('Alice', 'Finance', '2026-04-07');
    const id2 = generateCertificateId('Alice', 'Finance', '2026-04-07');
    expect(id1).toBe(id2);
  });

  it('differs for different inputs', () => {
    const id1 = generateCertificateId('Alice', 'Finance', '2026-04-07');
    const id2 = generateCertificateId('Bob', 'Finance', '2026-04-07');
    expect(id1).not.toBe(id2);
  });

  it('differs when profession changes', () => {
    const id1 = generateCertificateId('Alice', 'Finance', '2026-04-07');
    const id2 = generateCertificateId('Alice', 'Engineering', '2026-04-07');
    expect(id1).not.toBe(id2);
  });

  it('differs when date changes', () => {
    const id1 = generateCertificateId('Alice', 'Finance', '2026-04-07');
    const id2 = generateCertificateId('Alice', 'Finance', '2026-04-08');
    expect(id1).not.toBe(id2);
  });
});

describe('getCertificatePageUrl', () => {
  it('builds a URL to the /certificate page', () => {
    const url = getCertificatePageUrl(
      { name: 'Alice', profession: 'Finance', professionIcon: '\uD83D\uDCB0', color: '#10B981', score: 87 },
      'https://octokeen.com',
    );
    expect(url).toContain('https://octokeen.com/certificate?');
    expect(url).toContain('name=Alice');
    expect(url).toContain('score=87');
  });

  it('includes date when provided', () => {
    const url = getCertificatePageUrl(
      { name: 'Bob', profession: 'Space', professionIcon: '\uD83D\uDE80', color: '#818CF8', score: 50, date: 'April 7, 2026' },
      'https://octokeen.com',
    );
    expect(url).toContain('date=April');
  });
});

describe('getLinkedInShareUrl', () => {
  it('points to /certificate page, not api route', () => {
    const url = getLinkedInShareUrl(
      { name: 'Alice', profession: 'Finance', professionIcon: '\uD83D\uDCB0', color: '#10B981', score: 87 },
      'https://octokeen.com',
    );
    expect(url).toContain('linkedin.com/sharing/share-offsite');
    expect(url).toContain(encodeURIComponent('https://octokeen.com/certificate'));
    expect(url).not.toContain('summary=');
  });

  it('uses only the url parameter (no deprecated summary)', () => {
    const url = getLinkedInShareUrl(
      { name: 'Bob', profession: 'Psychology & Human Behavior', professionIcon: '\uD83E\uDDE0', color: '#A78BFA', score: 45 },
      'https://octokeen.com',
    );
    // The URL should only have ?url=... after the LinkedIn base
    const linkedInBase = 'https://www.linkedin.com/sharing/share-offsite/?url=';
    expect(url.startsWith(linkedInBase)).toBe(true);
    // There should be no & after the url param (no second param)
    const afterBase = url.slice(linkedInBase.length);
    expect(afterBase).not.toContain('&summary=');
  });
});
