import { Fragment } from 'react';

import ContainerBox from '@/components/common/ContainerBox';
import PostDetail from '@/components/Posts/PostDetail';
import { getPost } from '@/apis/posts';

interface WildMarketDetailPageProps {
  params: { id: number };
}

export const generateMetadata = async ({
  params: { id },
}: {
  params: { id: number };
}) => {
  const data = await getPost(id);

  return {
    title: `옥동 || ${data.post.title}`,
    description: '한국춘란 산채품 전문 직거래장터 || 산채품장터1',
    metadataBase: new URL('https://www.hyoungje.kr'),
    openGraph: {
      title: `옥동 || ${data.post.title}`,
      description: data.post.contents,
      images: [{ url: data.post.image }],
    },
    robots: {
      index: false,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
      },
    },
    keywords: [
      '옥동',
      '형제난원',
      '산채품',
      '한국춘란',
      '난',
      '난초',
      '산채품 직거래',
      '난초 직거래',
      '산채',
      '집채',
      '춘란',
      '약초',
      data.post.variant,
      data.post.place,
      data.post.title,
    ],
  };
};

const DetailPage = async ({ params: { id } }: WildMarketDetailPageProps) => {
  const data = await getPost(id);

  return (
    <Fragment>
      {!data || !data?.post ? (
        <ContainerBox className='py-20'>
          삭제된 게시물이거나 찾을 수 없는 게시물입니다.
        </ContainerBox>
      ) : (
        <PostDetail postId={id} data={data} />
      )}
    </Fragment>
  );
};

export default DetailPage;
