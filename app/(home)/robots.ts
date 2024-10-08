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
    sitemap: `${process.env.NEXT_PUBLIC_FRONT_URL}/sitemap.xml`,
    host: `${process.env.NEXT_PUBLIC_FRONT_URL}`,
  };
}
