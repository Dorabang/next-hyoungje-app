'use client';
import Edit from '@/components/Edit';
import { usePathname } from 'next/navigation';
import { useGetPost } from '@/hooks/queries/usePosts';
import { Suspense } from 'react';
import ContainerBox from '@/components/ContainerBox';
import Loading from '@/components/Loading';

const DetailEditPage = ({ params: { id } }: { params: { id: string } }) => {
  const pathname = usePathname().trim().split('/')[1];
  const { data } = useGetPost(pathname, id);

  if (!data) return;

  return (
    <Suspense
      fallback={
        <ContainerBox>
          <Loading />
        </ContainerBox>
      }
    >
      <Edit post={data} pathname={pathname} />
    </Suspense>
  );
};

export default DetailEditPage;
