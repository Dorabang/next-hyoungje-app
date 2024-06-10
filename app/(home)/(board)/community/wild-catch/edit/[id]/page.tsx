'use client';

import CommEdit from '@/components/Community/CommEdit';
import ContainerBox from '@/components/ContainerBox';
import Loading from '@/components/Loading';
import { useGetPost } from '@/hooks/queries/usePosts';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';

const ModifyPostPage = ({ params: { id } }: { params: { id: string } }) => {
  const pathname = usePathname().split('/')[2];
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
      <CommEdit post={data} pathname={pathname} />
    </Suspense>
  );
};

export default ModifyPostPage;
