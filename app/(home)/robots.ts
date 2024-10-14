import { BASE_FRONT_URL } from '@/constant/api';
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/account',
        '/mypage',
        '/login',
        '/bookmark',
        '/single-leaf',
        '/edit',
      ],
    },
    sitemap: `${BASE_FRONT_URL}/sitemap.xml`,
    host: `${BASE_FRONT_URL}`,
  };
}
