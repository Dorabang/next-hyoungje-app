import React from 'react';
import Loading from '../Loading';

const LoadingPromise = () => {
  return (
    <div className='fixed z-10 w-full h-full bg-white/80'>
      <Loading />
    </div>
  );
};

export default LoadingPromise;
