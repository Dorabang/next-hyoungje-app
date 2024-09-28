'use client';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';

import Link from 'next/link';
import Image from 'next/image';
import { usePosts } from '@/hooks/queries/usePosts';

const Slide = ({
  pathname,
  slidesPerView,
  speed,
  community,
}: {
  pathname: string;
  slidesPerView: number;
  speed: number;
  community?: boolean;
}) => {
  const { data: posts } = usePosts(pathname, 1, 'sale', null);

  return (
    <Swiper
      spaceBetween={20}
      centeredSlides={true}
      speed={speed}
      loop={posts === null ? false : true}
      autoplay={
        posts === null
          ? false
          : {
              delay: 3000,
              disableOnInteraction: false,
            }
      }
      breakpoints={{
        640: {
          slidesPerView: slidesPerView,
          loopedSlides: slidesPerView,
        },
      }}
      modules={[Autoplay]}
      className='w-full'
    >
      {posts?.data ? (
        posts.data.map(({ postId: id, image, user: { displayName } }) => {
          return (
            <SwiperSlide key={id} className='w-[50%]'>
              <Link
                href={
                  community
                    ? `/community/${pathname}/${id}`
                    : `/${pathname}/${id}`
                }
                className={`relative block w-full ${
                  slidesPerView !== 2 ? 'h-[300px]' : 'h-[250px] xl:h-[420px] '
                }`}
              >
                {image !== null && (
                  <Image
                    src={image[0]}
                    alt={`${displayName} 업로드 이미지`}
                    fill
                    sizes='100%'
                    className='object-cover'
                    priority
                  />
                )}
              </Link>
            </SwiperSlide>
          );
        })
      ) : (
        <div className='flex gap-5 w-[150%] overflow-hidden justify-center'>
          {Array.from(Array(3), (_, k) => (
            <div
              key={k}
              className={`relative w-full animate-pulse bg-grayColor-200 ${
                slidesPerView !== 2 ? 'h-[300px]' : 'h-[250px] xl:h-[420px] '
              }`}
            ></div>
          ))}
        </div>
      )}
    </Swiper>
  );
};

export default Slide;
