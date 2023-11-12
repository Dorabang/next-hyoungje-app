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
import GetImageURL from './GetImageURL';
import Image from 'next/image';
import Link from 'next/link';

interface ImageObjProps {
  id: string;
  imageURL: string;
}

const Slide = ({ pathname }: { pathname: string }) => {
  const [posts, setPosts] = useState<DocumentData[] | null>(null);
  const [downloadURL, setDownloadURL] = useState<ImageObjProps[] | null>(null);

  useEffect(() => {
    getPosts(pathname).then((response) => {
      const imagePost = response.filter(
        (item) =>
          item?.image && item?.image?.length !== 0 && item.status === 'sale'
      );
      const latestPost = imagePost.reverse().slice(0, 5);
      setPosts(latestPost);
    });
  }, [pathname]);

  const getImage = (postId: string, value: string) => {
    setDownloadURL((prev) =>
      prev
        ? prev.filter((item) => item.imageURL.includes(postId))
          ? [...prev, { id: postId, imageURL: value }]
          : prev
        : [{ id: postId, imageURL: value }]
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
          getImage
        );
      });
  }, [pathname, posts]);

  return (
    <Swiper
      spaceBetween={20}
      centeredSlides={true}
      speed={1500}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
      }}
      modules={[Autoplay]}
      className='w-full'
    >
      {posts &&
        posts.map(({ id, creatorId, title }) => {
          return (
            <SwiperSlide key={id} className='w-[50%]'>
              {downloadURL &&
                downloadURL.map(
                  (img) =>
                    img.id === id && (
                      <Link
                        href={`/${pathname}/${id}`}
                        key={img.id}
                        className='relative block w-full h-[250px] xl:h-[420px]'
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
                    )
                )}
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};

export default Slide;
