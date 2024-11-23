'use client';
import { useRouter } from 'next/navigation';

import { usePost } from '@/hooks/queries/usePosts';
import Logo from '@/assets/common/footer_logo.png';
import statusOptions from '../StatusOptions';
import BookmarkButton from './BookmarkButton';
import { allRoutes } from '@/constant/Routes';
import AutoHeightImageWrapper from '../common/Wrapper/AutoHeightImageWrapper';

const MyBookmark = ({ postId }: { postId: number }) => {
  const router = useRouter();
  const { data } = usePost(postId);

  const handleClickBookmark = async () => {
    const market = [
      'wild-market1',
      'wild-market2',
      'general-market',
      'natural-herb',
      'single-leaf',
    ];
    const path = `${data?.post.marketType}/${postId}`;
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
        {data.post.image ? (
          <AutoHeightImageWrapper
            alt={`${data.post.title} 대표 이미지`}
            src={data.post.image[0]}
          />
        ) : (
          <AutoHeightImageWrapper
            src={Logo.src}
            alt='기본 이미지'
            className='pb-8'
          />
        )}
      </div>
      <div className='absolute bottom-0 bg-white/80 backdrop-blur-[10px] flex flex-col gap-2 w-full px-5 py-3'>
        <div className='flex flex-col gap-2'>
          <div className='flex justify-between'>
            <h3 className='text-lg font-semibold'>
              {data.post.status ? statusOptions(data.post.status) : null}
              <span
                className={`${data.post.status && 'pl-3'} cursor-pointer hover:text-black active:text-black transition-colors hover:underline active:underline`}
                onClick={() => handleClickBookmark()}
              >
                {data.post.title}
              </span>
            </h3>
            <BookmarkButton postId={postId} />
          </div>
          <p className='text-grayColor-500 text-sm'>
            {
              allRoutes.filter((route) =>
                route.link.includes(data.post.marketType),
              )[0].name
            }
          </p>
          <div className='flex justify-between text-grayColor-500 text-sm'>
            <p>
              {data.post.user.displayName}
              {data.post.price ? ' / ' + data.post.price : null}
            </p>
            <p>{new Date(data.post.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookmark;
