import { PostData } from '@/apis/posts';
import { BASE_API_URL, BASE_FRONT_URL } from '@/constant/api';
import { allRoutes } from '@/constant/Routes';
import { Fragment, ReactNode } from 'react';

export const generateMetadata = async ({
  params: { menu, id },
}: {
  params: { menu: string; id: string };
}) => {
  try {
    const url = `${BASE_API_URL}/api/posts/${id}`;
    const res = await fetch(url);
    const { post } = (await res.json()).data as PostData;

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
        '산채품',
        '한국춘란',
        '난',
        '난초',
        post.title,
        '직거래',
        '산채',
        '집채',
        '춘란',
        '약초',
      ],
    };
  } catch (error) {
    console.log('🚀 ~ error:', error);
  }
};

const DetailLayout = ({ children }: { children: ReactNode }) => {
  return <Fragment>{children}</Fragment>;
};

export default DetailLayout;
