import { Fragment, ReactNode } from 'react';
import type { Metadata } from 'next';

import { BASE_API_URL, BASE_FRONT_URL } from '@/constant/api';
import { allRoutes } from '@/constant/Routes';
import { PageParams } from '@/constant/type';
import { getPost, PostData } from '@/apis/posts';
import { queryClient } from '@/components/common/Wrapper/QueryClientWrapper';
import { postQueryOptions } from '@/constant/queryOptions/postQueryOptions';

export const generateMetadata = async ({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> => {
  const { id, menu } = await params;
  const url = `${BASE_API_URL}/posts/${id}`;
  const { post } = (await fetch(url).then((res) => res.json()))
    .data as PostData;

  const menuName = allRoutes.filter(({ link }) => link.includes(menu))[0];

  return {
    title: `옥동 || ${post.title}`,
    description: `한국춘란 산채품 전문 직거래장터 - ${menuName.name}`,
    metadataBase: new URL(`${BASE_FRONT_URL}/${post.marketType}`),
    openGraph: {
      title: `옥동 || ${post.title}`,
      description: post.contents,
      ...(post.image[0] && { images: [post.image[0]] }),
    },
    keywords: [
      '옥동',
      '형제난원',
      '옥동 난원',
      '산채품',
      '직거래',
      '산채',
      '약초',
      post.title,
      post.variant,
      post.place || '춘란',
    ],
  };
};

const DetailLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: { menu: string; id: string };
}) => {
  const { id } = params;
  await queryClient.prefetchQuery(postQueryOptions.getPost(Number(id)));

  return <Fragment>{children}</Fragment>;
};

export default DetailLayout;
