'use client';
import { Suspense } from 'react';
import { usePathname } from 'next/navigation';

import Edit from '@/components/Edit';
import { usePost } from '@/hooks/queries/usePosts';
import Loading from '@/components/common/Loading';
import ContainerBox from '@/components/common/ContainerBox';

const DetailEditPage = ({ params: { id } }: { params: { id: number } }) => {
  const pathname = usePathname().trim().split('/')[1];
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
      <Edit post={data.post} pathname={pathname} />
    </Suspense>
  );
};

export default DetailEditPage;
