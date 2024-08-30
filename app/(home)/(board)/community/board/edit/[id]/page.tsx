'use client';
import { Suspense } from 'react';

import CommEdit from '@/components/Community/CommEdit';
import Loading from '@/components/Loading';
import { usePost } from '@/hooks/queries/usePosts';
import ContainerBox from '@/components/ContainerBox';

const ModifyPostPage = ({ params: { id } }: { params: { id: number } }) => {
  const { data, isLoading } = usePost(id);

  if (isLoading) return <Loading />;

  if (!data)
    return (
      <ContainerBox className='py-20'>
        삭제된 게시물이거나 찾을 수 없는 게시물입니다.
      </ContainerBox>
    );

  return (
    <Suspense fallback={<Loading />}>
      <CommEdit post={data.post} />
    </Suspense>
  );
};

export default ModifyPostPage;
