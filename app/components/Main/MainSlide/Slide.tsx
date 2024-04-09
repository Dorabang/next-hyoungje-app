'use client';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';

import { useEffect, useState } from 'react';
import { getSlidePosts } from '@/apis/slides';
import { DocumentData } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';

const Slide = ({
  pathname,
  slidesPerView,
  speed,
}: {
  pathname: string;
  slidesPerView: number;
  speed: number;
}) => {
  const [posts, setPosts] = useState<DocumentData[] | null>(null);
  console.log('🚀 ~ posts:', posts);

  useEffect(() => {
    const getPosts = async () => {
      const leastPosts = await getSlidePosts(pathname);
      setPosts(leastPosts);
    };
    getPosts();
  }, [pathname, slidesPerView]);

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
      {posts !== null ? (
        posts.map(({ id, creatorId, image }) => {
          return (
            <SwiperSlide key={id} className='w-[50%]'>
              <Link
                href={`/${pathname}/${id}`}
                className={`relative block w-full ${
                  slidesPerView !== 2 ? 'h-[300px]' : 'h-[250px] xl:h-[420px] '
                }`}
              >
                <Image
                  src={image}
                  alt={`${creatorId} 업로드 이미지`}
                  fill
                  sizes='100%'
                  className='object-cover'
                  priority
                />
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
