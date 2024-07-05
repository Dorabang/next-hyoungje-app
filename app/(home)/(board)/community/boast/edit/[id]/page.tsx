'use client';
import { Suspense } from 'react';
import { usePathname } from 'next/navigation';

import CommEdit from '@/components/Community/CommEdit';
import Loading from '@/components/Loading';
import { useGetPost } from '@/hooks/queries/usePosts';

const ModifyPostPage = ({ params: { id } }: { params: { id: string } }) => {
  const pathname = usePathname().split('/')[2];
  const { data } = useGetPost(pathname, id);

  if (!data) return;
  return (
    <Suspense fallback={<Loading />}>
      <CommEdit post={data} pathname={pathname} />
    </Suspense>
  );
};

export default ModifyPostPage;
