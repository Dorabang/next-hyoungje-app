'use client';
import { Fragment } from 'react';

import ContainerBox from '@/components/common/ContainerBox';
import CommDetailPage from '@/components/Community/CommDetail';
import { usePost } from '@/hooks/queries/usePosts';

interface CommunityDetailPageProps {
  params: { menu: string; id: number };
}

const CommunityDetailPage = ({ params: { id } }: CommunityDetailPageProps) => {
  const { data } = usePost(Number(id));

  return (
    <Fragment>
      {!data ? (
        <ContainerBox className='py-20'>
          <p>삭제된 게시물이거나 찾을 수 없는 게시물입니다.</p>
        </ContainerBox>
      ) : (
        <CommDetailPage postId={Number(id)} data={data} />
      )}
    </Fragment>
  );
};

export default CommunityDetailPage;
