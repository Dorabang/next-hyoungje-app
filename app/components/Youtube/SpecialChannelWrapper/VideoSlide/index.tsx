'use client';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';

import Link from 'next/link';

import AutoHeightImageWrapper from '@/components/AutoHeightImageWrapper';
import { useVideos } from '@/hooks/queries/useYoutube';

const VideoSlide = ({ id }: { id: string }) => {
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
        videos.map(({ id, snippet, contentDetails }) => {
          return (
            <SwiperSlide key={id}>
              <Link
                target='_blank'
                href={`https://www.youtube.com/watch?v=${contentDetails.videoId}`}
              >
                <AutoHeightImageWrapper
                  src={snippet.thumbnails.medium.url}
                  alt={`${snippet.title} 썸네일 이미지`}
                />
                <p className='text-grayColor-400 pt-3 font-medium'>
                  {snippet.title.length > 45
                    ? snippet.title.slice(0, 45) + '...'
                    : snippet.title}
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
