'use client';

import { useRouter } from 'next/navigation';

import { useGetPost } from '@/hooks/queries/usePosts';
import { useEffect, useState } from 'react';
import { getImageURL } from '@/apis/images';
import Logo from '@/assets/common/footer_logo.png';
import Image from 'next/image';
import statusOptions from '../StatusOptions';
import HasLikes from '../HasLikes';
import { authState } from '@/recoil/atoms';
import { useRecoilValue } from 'recoil';
import { allRoutes } from '@/constant/Routes';

const Bookmark = ({
  pathname,
  postId,
}: {
  pathname: string;
  postId: string;
}) => {
  const router = useRouter();
  const user = useRecoilValue(authState);
  const { data, refetch } = useGetPost(pathname, postId);
  const [image, setImage] = useState<string | null>(null);

  const path = allRoutes.filter((route) => route.link.includes(pathname));

  useEffect(() => {
    if (image === null && data?.image) {
      const img = data.image[0];
      const getPreviewImage = async () => {
        const url = await getImageURL(pathname, data.creatorId, img);
        setImage(url);
      };
      getPreviewImage();
    }
  }, [image, data, pathname]);

  const handleClickBookmark = async () => {
    const market = [
      'wild-market1',
      'wild-market2',
      'general-market',
      'natural-herb',
      'single-leaf',
    ];
    const path = `${pathname}/${postId}`;
    const route =
      market.filter((route: string) => path.includes(route)).length > 0
        ? path
        : `/community/${path}`;
    return router.push(route);
  };

  if (!data) return <div>게시물을 찾을 수 없습니다.</div>;

  return (
    <div className='w-full relative flex flex-col border border-grayColor-100 overflow-hidden hover:-translate-y-2 transition-transform'>
      <div
        className='w-full h-[350px] bg-grayColor-500 flex items-center justify-center cursor-pointer'
        onClick={() => handleClickBookmark()}
      >
        {image ? (
          <Image
            fill
            className='object-cover'
            alt={`${data.title} 대표 이미지`}
            src={image}
          />
        ) : (
          <Image
            src={Logo.src}
            alt='기본 이미지'
            width={Logo.width}
            height={Logo.height}
            className='pb-8'
          />
        )}
      </div>
      <div className='absolute bottom-0 bg-white/80 backdrop-blur-[10px] flex flex-col gap-2 w-full px-5 py-3'>
        <div className='flex flex-col gap-2'>
          <div className='flex justify-between'>
            <h3 className='text-lg font-semibold'>
              {data.status ? statusOptions(data.status) : null}
              <span
                className={`${data.status && 'pl-3'} cursor-pointer hover:text-black active:text-black transition-colors hover:underline active:underline`}
                onClick={() => handleClickBookmark()}
              >
                {data.title}
              </span>
            </h3>
            <HasLikes pathname={pathname} postId={postId} userId={user?.uid} />
          </div>
          <p className='text-grayColor-500 text-sm'>{path[0].name}</p>
          <div className='flex justify-between text-grayColor-500 text-sm'>
            <p>
              {data.creatorName}
              {data.price ? ' / ' + data.price : null}
            </p>
            <p>{new Date(data.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookmark;
