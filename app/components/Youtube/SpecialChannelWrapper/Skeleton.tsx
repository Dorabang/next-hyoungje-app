import React from 'react';
import Badge from '../Badge';
import { TfiArrowCircleRight } from 'react-icons/tfi';

const Skeleton = () => {
  return (
    <div className='flex flex-col gap-8 md:gap-16 min-h-[600px] bg-white rounded-xl mt-[30px] mb-[90px] md:mt-[80px] md:mb-[120px] px-5 py-4 md:px-10 md:py-8'>
      <div className='flex justify-between items-center flex-col gap-5 md:gap-0 md:flex-row'>
        <div className='flex flex-col gap-4 items-center md:items-start'>
          <div className='flex flex-col items-center md:items-start'>
            <Badge variant='skeleton' />
            <div
              className={`w-[200px] h-[32px] md:h-[64px] my-5 bg-grayColor-200 animate-pulse`}
            />
          </div>
          <div className='flex flex-col gap-2'>
            {Array.from(Array(3)).map((_, idx) => (
              <div
                className={`bg-grayColor-200 animate-pulse h-4 ${idx !== 2 ? 'w-[240px]' : 'w-[120px]'}`}
                key={idx}
              />
            ))}
          </div>
        </div>

        <div className='flex items-center gap-8'>
          <div className='flex flex-row md:flex-col items-end gap-2 text-grayColor-400 font-medium'>
            채널 바로가기
            <TfiArrowCircleRight />
          </div>
          <div className='border bg-grayColor-200 animate-pulse overflow-hidden rounded-full w-[72px] h-[72px] relative' />
        </div>
      </div>
      <div className='rounded-xl border border-grayColor-200 px-5 py-4 md:px-10 md:py-8'>
        <h4 className='font-medium'>최근 업로드된 영상</h4>
        <div className='flex flex-wrap gap-5 pt-3 [&_div]:w-full md:[&_div]:w-[calc((100%-40px)/3)] lg:[&_div]:w-[calc((100%-60px)/4)]'>
          {Array.from(Array(4)).map((_, idx) => (
            <div
              className='w-full h-[300px] bg-grayColor-200 animate-pulse'
              key={idx}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
