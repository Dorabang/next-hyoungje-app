'use client';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';

import Link from 'next/link';

import AutoHeightImageWrapper from '@/components/common/Wrapper/AutoHeightImageWrapper';
import { useVideos } from '@/hooks/queries/useYoutube';

const VideoSlide = ({ id }: { id: number }) => {
  const { data: videos, isLoading } = useVideos(id);

  if (isLoading)
    return (
      <>
        {Array.from(Array(4)).map((_, idx) => (
          <VideoSkeleton key={idx} />
        ))}
      </>
    );

  return (
    <Swiper
      loop={true}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      slidesPerView={1}
      spaceBetween={20}
      speed={1500}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          centeredSlides: true,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 4,
          centeredSlides: true,
          spaceBetween: 20,
        },
      }}
      modules={[Autoplay]}
      className='w-full'
    >
      {videos &&
        videos.map(({ id, videoId, thumbnail, title }) => {
          return (
            <SwiperSlide key={id}>
              <Link
                target='_blank'
                className='group'
                href={`https://www.youtube.com/watch?v=${videoId}`}
              >
                <div className='overflow-hidden group-hover:[&_img]:scale-110 hover:[&_img]:transition-transform'>
                  <AutoHeightImageWrapper
                    src={thumbnail}
                    alt={`${title} 썸네일 이미지`}
                  />
                </div>
                <p className='text-grayColor-400 pt-3 font-medium group-hover:text-grayColor-500'>
                  {title.length > 45 ? title.slice(0, 45) + '...' : title}
                </p>
              </Link>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};

export default VideoSlide;

export const VideoSkeleton = () => {
  return (
    <div className='w-full h-[300px] bg-grayColor-200 animate-pulse flex flex-col gap-3'>
      <div className='w-full min-h-[300px]' />
      <div className='bg-grayColor-200 animate-pulse w-full h-4' />
    </div>
  );
};
