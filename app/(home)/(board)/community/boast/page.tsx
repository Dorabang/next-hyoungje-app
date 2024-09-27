import Loading from '@/components/common/Loading';
import PostFormat from '@/components/Posts/PostFormat';
import { Suspense } from 'react';

const BoastPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <PostFormat />
    </Suspense>
  );
};

export default BoastPage;
