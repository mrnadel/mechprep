import { MetadataRoute } from 'next';
import { APP_URL } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/checkout/', '/settings/', '/onboarding/', '/invite/'],
      },
      // Block AI scrapers / heavy crawlers
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'CCBot', 'ClaudeBot', 'anthropic-ai', 'Bytespider', 'PetalBot', 'Scrapy', 'AhrefsBot', 'SemrushBot', 'MJ12bot', 'DotBot', 'BLEXBot', 'DataForSeoBot', 'FacebookExternalHit', 'ImagesiftBot'],
        disallow: ['/'],
      },
    ],
    sitemap: `${APP_URL}/sitemap.xml`,
  };
}
