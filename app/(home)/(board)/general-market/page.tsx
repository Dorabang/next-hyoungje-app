import Loading from '@/components/Loading';
import PostFormat from '@/components/Posts/PostFormat';
import { Suspense } from 'react';

const GeneralMarketPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <PostFormat />
    </Suspense>
  );
};

export default GeneralMarketPage;
