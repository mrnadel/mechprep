import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/checkout/', '/settings/', '/onboarding/', '/invite/'],
      },
    ],
    sitemap: 'https://mechready.com/sitemap.xml',
  };
}
