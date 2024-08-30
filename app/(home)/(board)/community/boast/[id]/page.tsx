'use client';
import CommDetailPage from '@/components/Community/CommDetail';
import ContainerBox from '@/components/ContainerBox';
import Loading from '@/components/Loading';
import { usePost } from '@/hooks/queries/usePosts';
import { Suspense } from 'react';

interface CommunityDetailPageProps {
  params: { id: number };
}

const BoastDetailPage = ({ params: { id } }: CommunityDetailPageProps) => {
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
      <CommDetailPage postId={id} data={data} />
    </Suspense>
  );
};

export default BoastDetailPage;
