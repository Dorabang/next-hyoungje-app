'use client';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { User, authState } from '@/recoil/atoms';
import { IoArrowBack } from 'react-icons/io5';
import { usePathname, useRouter } from 'next/navigation';

import { usePost } from '@/hooks/queries/usePosts';
import DateFormat from '@/utils/DateFormat';
import ContainerBox from '@/components/ContainerBox';
import statusOptions from '@/components/StatusOptions';
import PrevNextPost, {
  PrevNextPostData,
} from '@/components/Posts/PrevNextPost';
import Comments from '../Comment/Comments';
import AutoHeightImageWrapper from '@/components/AutoHeightImageWrapper';
import Loading from '../Loading';
import HasLikes from '../HasLikes';
import EditorReadOnly from '../Editor/ReadOnly';
import { getUser } from '@/apis/users';
import { Post } from '../Board/types';

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
  const auth = useRecoilValue(authState);
  const [user, setUser] = useState<User | null>(null);

  const path = usePathname().split('/');
  const pathname = path[3] ? path[2] : path[1];

  useEffect(() => {
    if (auth) {
      (async () => {
        const user = await getUser();
        setUser(user ?? null);
      })();
    }
  }, []);

  const handleDeletePost = (id: number) => {
    const ok = window.confirm('이 게시물을 삭제하시겠습니까?');

    if (!data) return;

    if (ok) {
      // deletePost(data, pathname, id);
      router.push(`/${pathname}`);
    }
  };

  return (
    <ContainerBox>
      {/* title */}
      <div
        className='border-b border-grayColor-400
          flex gap-4 justify-between items-center
          py-3'
      >
        <div
          className='p-2 cursor-pointer'
          onClick={() =>
            router.push(path[3] ? `/community/${path[3]}` : `/${pathname}`)
          }
        >
          <IoArrowBack size={18} />
        </div>

        <h2 className='text-lg font-bold flex-grow'>
          <span className='px-2'>{statusOptions(data.post.status)}</span>
          {data.post.title}
        </h2>

        {(user?.id === data.post.userId || user?.isAdmin) && (
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
          {data.post.user.displayName}
        </li>
        <li>
          <span className='pr-2 font-semibold'>등록일자</span>
          {DateFormat(data.post.createdAt)}
        </li>
        <li>
          <span className='pr-2 font-semibold'>조회수</span>
          {data.post.views}
        </li>
        <li>
          {/* <HasLikes postId={postId} userId={user?.id} pathname={pathname} /> */}
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

      <PrevNextPost pathname={pathname} prev={data.previous} next={data.next} />
    </ContainerBox>
  );
};

export default PostDetail;
