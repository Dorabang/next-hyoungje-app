import { MetadataRoute } from 'next';

export const getPosts = async () => {
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_API_PROD_URL
      : process.env.NEXT_PUBLIC_API_DEV_URL;

  return await fetch(`${baseUrl}/posts/sitemap`, {
    next: { revalidate: 24 * 60 * 60 }, // 24시간 캐시
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject();
      }
      return res.json();
    })
    .catch(() => {
      return [];
    });
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts: { postId: number; marketType: string; updatedAt: string }[] =
    await getPosts();
  console.log('🚀 ~ sitemap ~ posts:', posts);

  const community = ['board', 'boast'];

  const BASE_URL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : process.env.NEXT_PUBLIC_FRONT_URL;

  const defaultSiteMap: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/youtube`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
  ];

  const postsSitemap = posts.map((post) => {
    const category = community.filter(
      (community) => community === post.marketType,
    ).length
      ? `community/${post.marketType}`
      : post.marketType;

    return {
      url: `${BASE_URL}/${category}/${post.postId}`,
      lastModified: new Date(post.updatedAt),
      changeFrequench: 'daily',
      priority: 0.9,
    };
  });

  return [...defaultSiteMap, ...postsSitemap];
}
