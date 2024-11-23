'use client';
import React, { Suspense } from 'react';

import CommEdit from '@/components/Community/CommEdit';
import Loading from '@/components/common/Loading';
import { usePost } from '@/hooks/queries/usePosts';
import ContainerBox from '@/components/common/ContainerBox';
import { PageParams } from '@/constant/type';

const ModifyPostPage = ({ params }: { params: PageParams }) => {
  const { id } = React.use(params);
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
