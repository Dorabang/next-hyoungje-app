'use client';
import { Suspense } from 'react';

import ContainerBox from '@/components/ContainerBox';
import Loading from '@/components/Loading';
import PostDetail from '@/components/Posts/PostDetail';
import { usePost } from '@/hooks/queries/usePosts';

interface DetailPageProps {
  params: { id: number };
}

const NaturalHerbDetailPage = ({ params: { id } }: DetailPageProps) => {
  const { data, isLoading } = usePost(id);

  if (isLoading)
    return (
      <ContainerBox className='py-20'>
        <Loading />
      </ContainerBox>
    );

  if (!data || !data?.post)
    return (
      <ContainerBox className='py-20'>
        삭제된 게시물이거나 찾을 수 없는 게시물입니다.
      </ContainerBox>
    );

  return (
    <Suspense fallback={<Loading />}>
      <PostDetail postId={id} data={data} />
    </Suspense>
  );
};

export default NaturalHerbDetailPage;
