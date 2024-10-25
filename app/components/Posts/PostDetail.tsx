'use client';
import { Fragment, useEffect, useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import DateFormat from '@/utils/DateFormat';
import ContainerBox from '@/components/common/ContainerBox';
import statusOptions from '@/components/StatusOptions';
import PrevNextPost, {
  PrevNextPostData,
} from '@/components/Posts/PrevNextPost';
import Comments from '../Comment/Comments';
import AutoHeightImageWrapper from '@/components/common/Wrapper/AutoHeightImageWrapper';
import HasLikes from '../Bookmark/BookmarkButton';
import EditorReadOnly from '../Editor/ReadOnly';
import { getUser } from '@/apis/users';
import { deletePost } from '@/apis/posts';
import { Post } from '../common/Board/types';
import { useAuthStore, User } from '@/stores/useAuthStore';

interface DetailPageProps {
  postId: number;
  data: {
    previous: PrevNextPostData | null;
    next: PrevNextPostData | null;
    post: Post;
  };
}

const PostDetail = ({ postId, data }: DetailPageProps) => {
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
      {data && (
        <Fragment>
          {/* title */}
          <div
            className='border-b border-grayColor-400
          flex gap-4 justify-between items-center
          py-3'
          >
            <div className='p-2 cursor-pointer' onClick={handleBack}>
              <IoArrowBack size={18} />
            </div>

            <h2 className='text-lg font-bold flex-grow'>
              <span className='px-2'>{statusOptions(data.post.status)}</span>
              {data.post.title}
            </h2>

            {(userInfo?.id === data.post.userId || userInfo?.isAdmin) && (
              <ul className='flex gap-2 text-gray-500 text-sm [&_li]:cursor-pointer'>
                <li
                  onClick={() =>
                    router.push(
                      path[3]
                        ? `/community/${path[2]}/edit/${postId}`
                        : `/${pathname}/edit/${postId}`,
                    )
                  }
                  className='hover:text-gray-900'
                >
                  편집
                </li>
                <li
                  onClick={() => handleDeletePost(postId)}
                  className='hover:text-gray-900'
                >
                  삭제
                </li>
              </ul>
            )}
          </div>

          {/* post info */}
          <ul className='flex gap-4 pt-2 pb-6 justify-end items-center text-sm text-gray-500'>
            <li>
              <span className='pr-2 font-semibold'>작성자</span>
              <span>{data.post.displayName ?? data.post.user.displayName}</span>
            </li>
            <li>
              <span className='pr-2 font-semibold'>등록일자</span>
              <span>{DateFormat(data.post.createdAt)}</span>
            </li>
            <li>
              <span className='pr-2 font-semibold'>조회수</span>
              <span>{data.post.views}</span>
            </li>
            <li>
              <HasLikes postId={postId} />
            </li>
          </ul>

          <div className='w-full px-5 md:px-0 md:max-w-[1016px] mx-auto'>
            <div className='w-full flex flex-wrap gap-4 md:gap-0 justify-center'>
              <table
                className='w-full md:w-[500px]
        [&_tr]:flex [&_tr]:gap-2 [&_tr]:border-b [&_tr]:border-grayColor-300
        [&_th]:w-[20%]
        sm:[&_th]:w-[15%] [&_th]:p-2
        [&_td]:w-[80%]
        sm:[&_td]:w-[85%] [&_td]:p-2
        [&_tr]:truncate
        '
              >
                <tbody>
                  <tr>
                    <th>종류</th>
                    <td>{data.post.variant}</td>
                  </tr>
                  {pathname.includes('market') && (
                    <tr>
                      <th>연락처</th>
                      <td>{data.post.phone}</td>
                    </tr>
                  )}
                  <tr>
                    <th>산지</th>
                    <td>{data.post.place}</td>
                  </tr>

                  {data.post.date ? (
                    <tr>
                      <th>산채일</th>
                      <td>{DateFormat(data.post.date)}</td>
                    </tr>
                  ) : null}
                </tbody>
              </table>

              <table
                className='w-full md:w-[500px]
              [&_tr]:flex [&_tr]:gap-2 [&_tr]:border-b [&_tr]:border-grayColor-300
              [&_th]:w-[20%]
              sm:[&_th]:w-[15%] [&_th]:p-2
              [&_td]:w-[80%]
              sm:[&_td]:w-[85%] [&_td]:p-2
            '
              >
                <tbody>
                  <tr>
                    <th>가격</th>
                    <td>{data.post.price}</td>
                  </tr>
                  {pathname.includes('market') && (
                    <>
                      <tr>
                        <th>키</th>
                        <td>{data.post.height}</td>
                      </tr>
                      <tr>
                        <th>폭</th>
                        <td>{data.post.width}</td>
                      </tr>
                    </>
                  )}
                  {data.post.amount ? (
                    <tr>
                      <th>촉수</th>
                      <td>{data.post.amount}</td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>

            {/* image */}
            <div className='pt-8 w-full'>
              {data.post.image
                ? data.post.image?.map((imageURL: string, idx) => (
                    <div
                      key={imageURL}
                      className='relative w-full md:max-w-[500px] lg:max-w-[700px] min-h-[350px] mx-auto'
                    >
                      <AutoHeightImageWrapper
                        src={imageURL}
                        alt={`${data.post.user.displayName + idx} 업로드 이미지`}
                        priority
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
          pt-8
        '
            >
              <EditorReadOnly contents={data.post.contents} />
            </div>
          </div>

          <Comments postId={postId} />

          <PrevNextPost
            pathname={pathname}
            prev={data.previous}
            next={data.next}
          />
        </Fragment>
      )}
    </ContainerBox>
  );
};

export default PostDetail;
