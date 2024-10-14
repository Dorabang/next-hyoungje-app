import { MetadataRoute } from 'next';

import { BASE_API_URL, BASE_FRONT_URL } from '@/constant/api';

export const getPosts = async () => {
  return await fetch(`${BASE_API_URL}/posts/sitemap`, {
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

  const community = ['board', 'boast', 'okdong', 'notice', 'wild-catch', 'qna'];

  const defaultSiteMap: MetadataRoute.Sitemap = [
    {
      url: `${BASE_FRONT_URL}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_FRONT_URL}/youtube`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
  ];

  const postsSitemap = posts.map((post) => {
    if (post.marketType === 'okdong')
      return {
        url: `${BASE_FRONT_URL}/community/${post.marketType}`,
        lastModified: new Date(post.updatedAt),
        changeFrequench: 'daily',
        priority: 0.9,
      };

    const category = community.filter(
      (community) => community === post.marketType,
    ).length
      ? `community/${post.marketType}`
      : post.marketType;

    return {
      url: `${BASE_FRONT_URL}/${category}/${post.postId}`,
      lastModified: new Date(post.updatedAt),
      changeFrequench: 'daily',
      priority: 0.9,
    };
  });

  return [...defaultSiteMap, ...postsSitemap];
}
