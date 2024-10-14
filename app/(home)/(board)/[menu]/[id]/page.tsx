'use client';
import { Fragment } from 'react';

import ContainerBox from '@/components/common/ContainerBox';
import PostDetail from '@/components/Posts/PostDetail';
import { usePost } from '@/hooks/queries/usePosts';

interface DetailPageProps {
  params: { menu: string; id: string };
}

const DetailPage = ({ params: { id } }: DetailPageProps) => {
  const { data } = usePost(Number(id));

  return (
    <Fragment>
      {!data ? (
        <ContainerBox className='py-20'>
          <p>삭제된 게시물이거나 찾을 수 없는 게시물입니다.</p>
        </ContainerBox>
      ) : (
        <PostDetail postId={Number(id)} data={data} />
      )}
    </Fragment>
  );
};

export default DetailPage;
