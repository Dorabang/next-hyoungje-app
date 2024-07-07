import Loading from '@/components/Loading';
import PostFormat from '@/components/Posts/PostFormat';
import { Suspense } from 'react';

const BoardPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <PostFormat />
    </Suspense>
  );
};

export default BoardPage;
