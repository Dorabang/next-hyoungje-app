import { Fragment } from 'react';

import CommDetailPage from '@/components/Community/CommDetail';
import ContainerBox from '@/components/common/ContainerBox';
import { getPost } from '@/apis/posts';
import { allRoutes } from '@/constant/Routes';

interface CommunityDetailPageProps {
  params: { menu: string; id: number };
}

export const generateMetadata = async ({
  params: { menu, id },
}: {
  params: { menu: string; id: string };
}) => {
  const { post } = await getPost(Number(id));
  const BASE_URL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : process.env.NEXT_PUBLIC_FRONT_URL;

  const menuName = allRoutes.filter(({ link }) => link.includes(menu))[0];

  return {
    title: `옥동 || ${post.title}`,
    description: `한국춘란 산채품 전문 직거래장터 || ${menuName.name}`,
    metadataBase: new URL(`${BASE_URL}/${post.marketType}`),
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
};

const CommunityDetailPage = async ({
  params: { menu, id },
}: CommunityDetailPageProps) => {
  const postId = Number(id);
  const data = await getPost(postId);

  return (
    <Fragment>
      {!data || !data?.post ? (
        <ContainerBox className='py-20'>
          삭제된 게시물이거나 찾을 수 없는 게시물입니다.
        </ContainerBox>
      ) : (
        <CommDetailPage pathname={menu} postId={postId} data={data} />
      )}
    </Fragment>
  );
};

export default CommunityDetailPage;
