'use client';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { VideoData } from '../../type';
import { getVideos } from '@/apis/youtube';
import AutoHeightImageWrapper from '@/components/AutoHeightImageWrapper';

const VideoSlide = ({ id }: { id: string }) => {
  const [videos, setVideos] = useState<VideoData[] | null>(null);

  useEffect(() => {
    if (videos === null) {
      (async () => {
        const response = await getVideos(id);
        setVideos(response);
      })();
    }
  }, [videos, id]);

  return (
    <Swiper
      loop={true}
      // autoplay={{ delay: 3000, disableOnInteraction: false }}
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
      {videos !== null &&
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
