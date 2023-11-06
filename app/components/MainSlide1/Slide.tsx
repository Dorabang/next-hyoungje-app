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
import GetImageURL from '@/utils/getImageURL';
import Image from 'next/image';

const Slide = ({ pathname }: { pathname: string }) => {
  const [posts, setPosts] = useState<DocumentData[] | null>(null);
  const [imagePosts, setImagePosts] = useState<DocumentData[] | null>(null);
  const [test, setTest] = useState<string | null>(null);
  console.log('🚀 ~ file: slide.tsx:23 ~ Slide ~ imagePosts:', imagePosts);

  useEffect(() => {
    getPosts(pathname).then((response) => {
      const imagePost = response.filter(
        (item) => item?.image.length !== 0 && item.status === 'sale'
      );
      const latestPost = imagePost.reverse().slice(0, 5);
      setPosts(latestPost);
    });
  }, [pathname]);

  useEffect(() => {
    const getImage = (value: string) => {
      setTest(value);
    };

    if (posts && posts.length !== 0) {
      if (!test || test.length === 0) {
        const addImgArr = posts.map((post) => {
          const newImgArr = post.image[0];

          GetImageURL(
            `${pathname}/${post.creatorId}/post/${newImgArr}/image`,
            getImage
          );

          return { ...post, image: test };
        });

        setImagePosts(addImgArr);
      }
    }
  }, [pathname, posts, test]);

  /* 
  useEffect(() => {
    const getImage = (value: string) => {
      setImageArr(value);
    };

    if (images && post?.creatorId) {
      const currentImage = images.find((item) => item.id === post.id);
      GetImageURL(
        `${pathname}/${post.creatorId}/post/${currentImage?.image}/image`,
        getImage
      );
    }
  }, [pathname, images, post?.creatorId, post?.id]);
 */

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
      {imagePosts &&
        imagePosts.map(({ id, image, creatorId, title }) => {
          return (
            <SwiperSlide key={id} className='w-[50%]'>
              {image && (
                <div className='relative w-full h-[250px] xl:h-[420px]'>
                  <Image
                    src={image}
                    alt={`${creatorId} 업로드 이미지`}
                    fill
                    sizes='100%'
                    className='object-cover'
                    priority
                  />
                </div>
              )}
              {title}
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};

export default Slide;
