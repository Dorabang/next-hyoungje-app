'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Link from 'next/link';
import 'swiper/css';

import { usePosts } from '@/hooks/queries/usePosts';
import DefaultImage from '@/assets/common/okdong.jpg';
import AutoHeightImageWrapper from '@/components/common/Wrapper/AutoHeightImageWrapper';

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
  const { data: posts } = usePosts(pathname, 1, 'all', null);

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
                {image.length > 0 ? (
                  <AutoHeightImageWrapper
                    src={image[0]}
                    alt={`${displayName} 업로드 이미지`}
                  />
                ) : (
                  <AutoHeightImageWrapper
                    src={DefaultImage.src}
                    alt='기본 이미지'
                    className='pb-8'
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
