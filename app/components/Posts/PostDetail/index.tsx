'use client';
import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import DateFormat from '@/utils/DateFormat';
import PrevNextPost from '@/components/Posts/PrevNextPost';
import Comments from '../../Comment/Comments';
import EditorReadOnly from '../../Editor/ReadOnly';
import { postQueryOptions } from '@/constant/queryOptions/postQueryOptions';
import { DetailHeader } from './DetailHeader';
import { DetailImage } from './DetailImage';
import DetailSkeleton from './DetailSkeleton';

interface PostDetailProps {
  postId: number;
}

const PostDetail = ({ postId }: PostDetailProps) => {
  const { data, isLoading } = useQuery(postQueryOptions.getPost(postId));

  const path = usePathname().split('/');
  const pathname = path[3] ? path[2] : path[1];

  if (isLoading) return <DetailSkeleton />;

  if (!data)
    return (
      <p className='py-20'>삭제된 게시물이거나 찾을 수 없는 게시물입니다.</p>
    );

  return (
    <Fragment>
      <DetailHeader postId={postId} data={data} />

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
        <DetailImage data={data} />

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
    </Fragment>
  );
};

export default PostDetail;
