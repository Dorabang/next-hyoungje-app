import ContainerBox from '@/components/ContainerBox';
import Loading from '@/components/Loading';
import React from 'react';

const LoadingPage = () => {
  return (
    <ContainerBox className='w-full h-full'>
      <Loading />
    </ContainerBox>
  );
};

export default LoadingPage;
