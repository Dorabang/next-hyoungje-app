import Loading from '@/components/common/Loading';
import PostFormat from '@/components/Posts/PostFormat';
import { Suspense } from 'react';

const WildMarket2Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <PostFormat />
    </Suspense>
  );
};

export default WildMarket2Page;
