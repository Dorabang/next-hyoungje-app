import React, { Suspense } from 'react';

import PostDetail from '@/components/Posts/PostDetail';
import { PageParams } from '@/constant/type';
import LoadingPage from '@/(home)/loading';

const DetailPage = async ({ params }: { params: PageParams }) => {
  const { id } = await params;

  return (
    <Suspense fallback={<LoadingPage />}>
      <PostDetail postId={Number(id)} />
    </Suspense>
  );
};

export default DetailPage;
