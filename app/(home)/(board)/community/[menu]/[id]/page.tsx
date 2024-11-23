import React, { Suspense } from 'react';

import CommDetailPage from '@/components/Community/CommDetail';
import { PageParams } from '@/constant/type';
import LoadingPage from '@/(home)/loading';

const CommunityDetailPage = async ({ params }: { params: PageParams }) => {
  const { id } = await params;

  return (
    <Suspense fallback={<LoadingPage />}>
      <CommDetailPage postId={Number(id)} />
    </Suspense>
  );
};

export default CommunityDetailPage;
