'use client';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';

import { useEffect, useState } from 'react';
import getPosts from '@/utils/getPosts';
import { DocumentData } from 'firebase/firestore';
import GetImageURL from './GetSlideURL';
import Image from 'next/image';
import Link from 'next/link';

interface ImageObjProps {
  id: string;
  imageURL: string;
}

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
  const [downloadURL, setDownloadURL] = useState<ImageObjProps[] | null>(null);

  useEffect(() => {
    getPosts(pathname).then((response) => {
      if (!response) return;
      const imagePost = response.filter(
        (item) =>
          item?.image && item?.image?.length !== 0 && item.status === 'sale',
      );
      const latestPost = imagePost.slice(
        0,
        slidesPerView === 2 ? 5 : slidesPerView * 2,
      );
      setPosts(latestPost);
    });
  }, [pathname, slidesPerView]);

  const getImage = (postId: string, value: string) => {
    setDownloadURL((prev) =>
      prev
        ? prev.filter((item) => item.imageURL.includes(postId))
          ? [...prev, { id: postId, imageURL: value }]
          : prev
        : [{ id: postId, imageURL: value }],
    );
  };

  useEffect(() => {
    posts &&
      posts.map((post) => {
        const newImgArr =
          post.image && post.image?.length > 0 && post?.image[0];

        GetImageURL(
          `${pathname}/${post.creatorId}/post/${newImgArr}/image`,
          post?.id,
          getImage,
        );
      });
  }, [pathname, posts]);

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
        posts.map(({ id, creatorId }) => {
          return (
            <SwiperSlide key={id} className='w-[50%]'>
              {downloadURL &&
                downloadURL.map((img) => (
                  <Link
                    href={`/${pathname}/${id}`}
                    key={img.id}
                    className={`relative block w-full ${
                      slidesPerView !== 2
                        ? 'h-[300px]'
                        : 'h-[250px] xl:h-[420px] '
                    }`}
                  >
                    <Image
                      src={img.imageURL}
                      alt={`${creatorId} 업로드 이미지`}
                      fill
                      sizes='100%'
                      className='object-cover'
                      priority
                    />
                  </Link>
                ))}
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
