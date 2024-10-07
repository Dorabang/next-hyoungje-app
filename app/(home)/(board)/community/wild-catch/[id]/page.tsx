import { Fragment } from 'react';

import { getPost } from '@/apis/posts';
import ContainerBox from '@/components/common/ContainerBox';
import CommDetailPage from '@/components/Community/CommDetail';

interface DetailPageProps {
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
    description: '한국춘란 산채품 전문 직거래장터 || 산채기',
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
      '직거래',
      '산채기',
      '산채',
      '커뮤니티',
      data.post.title,
    ],
  };
};

const WildCatchDetailPage = async ({ params: { id } }: DetailPageProps) => {
  const data = await getPost(id);

  return (
    <Fragment>
      {!data || !data?.post ? (
        <ContainerBox className='py-20'>
          삭제된 게시물이거나 찾을 수 없는 게시물입니다.
        </ContainerBox>
      ) : (
        <CommDetailPage postId={id} data={data} />
      )}
    </Fragment>
  );
};
export default WildCatchDetailPage;
