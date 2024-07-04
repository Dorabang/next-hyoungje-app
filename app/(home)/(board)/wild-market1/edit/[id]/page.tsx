'use client';
import { Suspense } from 'react';
import { usePathname } from 'next/navigation';

import Edit from '@/components/Edit';
import { useGetPost } from '@/hooks/queries/usePosts';
import Loading from '@/components/Loading';

const DetailEditPage = ({ params: { id } }: { params: { id: string } }) => {
  const pathname = usePathname().trim().split('/')[1];
  const { data } = useGetPost(pathname, id);

  if (!data) return;

  return (
    <Suspense fallback={<Loading />}>
      <Edit post={data} pathname={pathname} />
    </Suspense>
  );
};

export default DetailEditPage;
