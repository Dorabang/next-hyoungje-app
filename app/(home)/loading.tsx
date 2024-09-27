import ContainerBox from '@/components/common/ContainerBox';
import Loading from '@/components/common/Loading';
import React from 'react';

const LoadingPage = () => {
  return (
    <ContainerBox className='w-full h-full flex justify-center items-center'>
      <Loading />
    </ContainerBox>
  );
};

export default LoadingPage;
