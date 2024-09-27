'use client';
import Loading from '@/components/common/Loading';
import PostFormat from '@/components/Posts/PostFormat';
import useRedirect from '@/hooks/useRedirect';
import { Suspense } from 'react';

const SingleLeafPage = () => {
  useRedirect();

  return (
    <Suspense fallback={<Loading />}>
      <PostFormat />
    </Suspense>
  );
};

export default SingleLeafPage;
