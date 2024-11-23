import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { BASE_API_URL, BASE_FRONT_URL } from '@/constant/api';
import { allRoutes } from '@/constant/Routes';
import { PageParams } from '@/constant/type';
import { PostData } from '@/apis/posts';
import ContainerBox from '@/components/common/ContainerBox';

export const generateMetadata = async ({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> => {
  const { id, menu } = await params;

  const url = `${BASE_API_URL}/posts/${id}`;
  const { data } = (await fetch(url).then((res) => res.json())) as {
    data: PostData;
  };

  if (!id || !menu || !data) {
    notFound();
  }

  const menuName = allRoutes.filter(({ link }) => link.includes(menu))[0];

  return {
    title: `옥동 || ${data.post.title}`,
    description: `한국춘란 산채품 전문 직거래장터 - ${menuName.name}`,
    metadataBase: new URL(`${BASE_FRONT_URL}/${data.post.marketType}`),
    openGraph: {
      title: `옥동 || ${data.post.title}`,
      description: data.post.contents,
      ...(data.post.image[0] && { images: [data.post.image[0]] }),
    },
    keywords: [
      '옥동',
      '형제난원',
      '옥동 난원',
      '산채품',
      '직거래',
      '산채',
      '약초',
      data.post.title,
      data.post.variant,
      data.post.place || '춘란',
    ],
  };
};

const DetailLayout = async ({ children }: { children: ReactNode }) => {
  return <ContainerBox>{children}</ContainerBox>;
};

export default DetailLayout;
