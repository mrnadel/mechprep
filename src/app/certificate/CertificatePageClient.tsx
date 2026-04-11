'use client';

import { useState, useMemo } from 'react';
import { Download, Share2, Linkedin, ArrowLeft, Check, Loader2 } from 'lucide-react';
import Link from 'next/link';
import {
  getCertificateUrl,
  shareCertificate,
  downloadCertificate,
  getLinkedInShareUrl,
  generateCertificateId,
  type CertificateParams,
} from '@/lib/certificate';
import { APP_NAME } from '@/lib/constants';
import { useIsDark } from '@/store/useThemeStore';

interface Props {
  params: { [key: string]: string | undefined };
}

export function CertificatePageClient({ params }: Props) {
  const isDark = useIsDark();

  const certParams: CertificateParams = useMemo(() => ({
    name: params.name || 'Learner',
    profession: params.profession || 'Course',
    professionIcon: params.professionIcon || '\uD83C\uDF93',
    color: params.color || '#6366f1',
    score: Number(params.score) || 0,
    date: params.date,
  }), [params.name, params.profession, params.professionIcon, params.color, params.score, params.date]);

  const certUrl = getCertificateUrl(certParams);
  const certId = generateCertificateId(
    certParams.name,
    certParams.profession,
    certParams.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
  );

  const [shareState, setShareState] = useState<'idle' | 'loading' | 'done'>('idle');

  const handleShare = async () => {
    setShareState('loading');
    try {
      const result = await shareCertificate(certParams);
      if (result !== 'cancelled') {
        setShareState('done');
        setTimeout(() => setShareState('idle'), 2000);
      } else {
        setShareState('idle');
      }
    } catch {
      setShareState('idle');
    }
  };

  const handleLinkedIn = () => {
    const url = getLinkedInShareUrl(certParams, window.location.origin);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`min-h-screen flex flex-col items-center px-4 py-8 ${isDark ? 'bg-surface-900' : 'bg-[#FAFAFA]'}`}>
      <div className="w-full max-w-2xl">
        {/* Back link */}
        <Link
          href="/"
          className={`inline-flex items-center gap-1.5 text-sm font-semibold mb-6 transition-colors ${
            isDark ? 'text-surface-400 hover:text-surface-200' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <ArrowLeft className="w-4 h-4" /> Back to {APP_NAME}
        </Link>

        {/* Certificate image */}
        <div className={`rounded-2xl overflow-hidden shadow-lg mb-6 ${isDark ? 'border border-surface-700' : 'border border-gray-200'}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={certUrl}
            alt={`${certParams.name}'s ${certParams.profession} certificate`}
            className="w-full h-auto"
          />
        </div>

        {/* Certificate ID */}
        <p className={`text-center text-xs font-mono mb-4 ${isDark ? 'text-surface-500' : 'text-gray-400'}`}>
          Certificate {certId}
        </p>

        {/* Action buttons */}
        <div className="flex justify-center gap-3 flex-wrap">
          <button
            onClick={() => downloadCertificate(certParams)}
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
              isDark
                ? 'bg-surface-800 border-2 border-surface-600 text-surface-200 hover:bg-surface-700'
                : 'bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Download className="w-4 h-4" /> Download
          </button>
          <button
            onClick={handleShare}
            disabled={shareState === 'loading'}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-colors disabled:opacity-60 disabled:cursor-wait"
            style={{ background: certParams.color }}
          >
            {shareState === 'loading' ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Sharing...</>
            ) : shareState === 'done' ? (
              <><Check className="w-4 h-4" /> Shared!</>
            ) : (
              <><Share2 className="w-4 h-4" /> Share</>
            )}
          </button>
          <button
            onClick={handleLinkedIn}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold bg-[#0A66C2] text-white hover:bg-[#004182] transition-colors"
          >
            <Linkedin className="w-4 h-4" /> LinkedIn
          </button>
        </div>
      </div>
    </div>
  );
}
