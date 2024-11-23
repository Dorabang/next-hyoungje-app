'use client';
import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import PrevNextPost from '@/components/Posts/PrevNextPost';
import Comments from '../Comment/Comments';
import EditorReadOnly from '../Editor/ReadOnly';
import { DetailHeader } from '../Posts/PostDetail/DetailHeader';
import { postQueryOptions } from '@/constant/queryOptions/postQueryOptions';
import DetailSkeleton from '../Posts/PostDetail/DetailSkeleton';
import { DetailImage } from '../Posts/PostDetail/DetailImage';

interface CommDetailPageProps {
  postId: number;
}

const CommDetailPage = ({ postId }: CommDetailPageProps) => {
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

      <div className='w-full px-5 md:px-0 md:max-w-[1016px] mx-auto pb-[100px]'>
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
          pt-4
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

export default CommDetailPage;
