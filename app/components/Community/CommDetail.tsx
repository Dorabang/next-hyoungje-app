'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { IoArrowBack } from 'react-icons/io5';

import DateFormat from '@/utils/DateFormat';
import ContainerBox from '@/components/common/ContainerBox';
import PrevNextPost, {
  PrevNextPostData,
} from '@/components/Posts/PrevNextPost';
import AutoHeightImageWrapper from '../common/Wrapper/AutoHeightImageWrapper';
import HasLikes from '../Bookmark/BookmarkButton';
import Comments from '../Comment/Comments';
import EditorReadOnly from '../Editor/ReadOnly';
import { deletePost } from '@/apis/posts';
import { getUser } from '@/apis/users';
import { Post } from '../common/Board/types';
import { useAuthStore, User } from '@/stores/useAuthStore';

interface CommDetailPageProps {
  postId: number;
  data: {
    previous: PrevNextPostData | null;
    next: PrevNextPostData | null;
    post: Post;
  };
}

const CommDetailPage = ({ postId, data }: CommDetailPageProps) => {
  const router = useRouter();
  const { user } = useAuthStore();
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const searchParams = useSearchParams();
  const page = searchParams.get('page');

  const path = usePathname().split('/');
  const pathname = path[3] ? path[2] : path[1];

  useEffect(() => {
    if (user) {
      (async () => {
        const userInfo = await getUser();
        setUserInfo(userInfo ?? null);
      })();
    }
  }, [user]);

  const handleDeletePost = async (id: number) => {
    const ok = window.confirm('이 게시물을 삭제하시겠습니까?');

    if (!data) return;

    if (ok) {
      const res = await deletePost(id);
      if (res.result === 'SUCCESS') {
        router.push(`/${pathname}`);
      }
    }
  };

  const handleBack = () => {
    const isCommunity = path[3] ? `/community/${pathname}` : `/${pathname}`;
    const pageParam = page ? `?page=${page}` : '';
    router.push(isCommunity + pageParam);
  };

  return (
    <ContainerBox>
      {/* title */}
      <div
        className='border-b border-grayColor-400
          flex gap-2 md:gap-4 justify-between items-center
          py-3'
      >
        <div className='p-2 cursor-pointer' onClick={handleBack}>
          <IoArrowBack size={18} />
        </div>

        <h2 className='text-lg font-bold flex-grow min-w-[120px] truncate'>
          {data.post.title}
        </h2>

        {(userInfo?.id === data.post.userId || userInfo?.isAdmin) && (
          <ul className='flex gap-2 text-gray-500 text-sm [&_li]:cursor-pointer'>
            <li
              onClick={() =>
                router.push(`/community/${pathname}/edit/${postId}`)
              }
            >
              편집
            </li>
            <li onClick={() => handleDeletePost(postId)}>삭제</li>
          </ul>
        )}
      </div>

      {/* post info */}
      <ul className='flex gap-4 pt-2 pb-6 justify-end text-sm text-gray-500'>
        <li className='flex flex-wrap gap-1 md:gap-2'>
          <span className='flex-grow lg:flex-grow-0 font-semibold'>작성자</span>
          <span>{data.post.displayName ?? data.post.user.displayName}</span>
        </li>
        <li className='flex flex-wrap gap-1 md:gap-2'>
          <span className='flex-grow lg:flex-grow-0 font-semibold'>
            등록일자
          </span>
          <span>{DateFormat(data.post.createdAt)}</span>
        </li>
        <li className='flex flex-wrap gap-1 md:gap-2'>
          <span className='flex-grow lg:flex-grow-0 font-semibold'>조회수</span>
          <span>{data.post.views}</span>
        </li>
        <li>
          <HasLikes postId={postId} />
        </li>
      </ul>

      <div className='w-full px-5 md:px-0 md:max-w-[1016px] mx-auto pb-[100px]'>
        {/* image */}
        <div className='pt-4 w-full'>
          {data.post.image
            ? data.post.image?.map((imageURL) => (
                <div
                  key={imageURL}
                  className='relative w-full md:max-w-[800px] mx-auto'
                >
                  <AutoHeightImageWrapper
                    src={imageURL}
                    alt={`${data.post.user.displayName} 업로드 이미지`}
                  />
                </div>
              ))
            : null}
        </div>

        {/* contents */}
        <div
          className='
          [&_.ql-toolbar]:hidden
          [&_.ql-hidden]:hidden
          [&_.ql-clipboard]:hidden
          [&_.ql-container.ql-snow]:border-none
          [&_.ql-container]:text-base
          [&_.ql-editor]:p-0
          [&_.ql-video-wrapper]:aspect-video
          [&_.ql-video]:block
          [&_.ql-video]:w-full
          [&_.ql-video]:h-full
          md:[&_.ql-video]:min-h-[500px]
          [&_.ql-video]:min-h-[300px]
          pt-4
        '
        >
          <EditorReadOnly contents={data.post.contents} />
        </div>
      </div>

      <Comments postId={postId} />

      <PrevNextPost pathname={pathname} prev={data.previous} next={data.next} />
    </ContainerBox>
  );
};

export default CommDetailPage;
