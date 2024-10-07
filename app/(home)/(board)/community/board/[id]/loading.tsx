import React from 'react';

import ContainerBox from '@/components/common/ContainerBox';
import Loading from '@/components/common/Loading';

const LoadingPage = () => {
  return (
    <ContainerBox className='py-20 w-full min-h-[700px]'>
      <Loading />
    </ContainerBox>
  );
};

export default LoadingPage;
