'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import ReactQuill from 'react-quill';
import { IoArrowBack } from 'react-icons/io5';
import { authState } from '@/recoil/atoms';

import { deletePost } from '@/apis/posts/posts';
import { updatedViews } from '@/apis/posts/updatedViews';
import { useGetPost } from '@/hooks/queries/usePosts';
import DateFormat from '@/utils/DateFormat';
import ContainerBox from '@/components/ContainerBox';
import PrevNextPost from '@/components/Posts/PrevNextPost';
import AutoHeightImageWrapper from '../AutoHeightImageWrapper';
import Loading from '../Loading';
import HasLikes from '../HasLikes';
import Comments from '../Comment/Comments';
import { useAdmin } from '@/hooks/queries/useUserInfo';
import { getPostImageURL } from '@/apis/images';

interface CommDetailPageProps {
  postId: string;
}

const CommDetailPage = ({ postId }: CommDetailPageProps) => {
  const router = useRouter();
  const user = useRecoilValue(authState);

  const path = usePathname().split('/');
  const pathname = path[2];
  const { data, isLoading } = useGetPost(pathname, postId);
  const { data: admin } = useAdmin(user?.uid);
  const [image, setImage] = useState<string[] | null>(null);

  useEffect(() => {
    const updatePostView = async () => {
      if (data) {
        await updatedViews(data.views, `${pathname}/${postId}`);
      }
    };
    updatePostView();
  }, [data, pathname, postId]);

  useEffect(() => {
    if (image === null && data) {
      const imgId = data.image;
      imgId?.forEach(async (img: string) => {
        const url = await getPostImageURL(pathname, data.creatorId, img);
        setImage((prev) =>
          prev !== null
            ? prev.includes(url)
              ? [...prev]
              : [...prev, url]
            : [url],
        );
      });
    }
  }, [image, data, pathname]);

  const modules = {
    toolbar: { container: [] },
  };

  const handleDeletePost = (id: string) => {
    const ok = window.confirm('이 게시물을 삭제하시겠습니까?');

    if (!data) return;

    if (ok) {
      deletePost(data, pathname, id);
      router.push(`/community/${pathname}`);
    }
  };

  if (isLoading) return <Loading />;

  if (!data)
    return (
      <ContainerBox className='py-20 text-center'>
        삭제된 게시물이거나 찾을 수 없는 게시물입니다.
      </ContainerBox>
    );

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
          onClick={() => router.push(`/community/${pathname}`)}
        >
          <IoArrowBack size={18} />
        </div>

        <h2 className='text-lg font-bold flex-grow'>{data.title}</h2>

        {(user?.uid === data.creatorId || admin) && (
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
        <li>
          <span className='pr-2 font-semibold'>작성자</span>
          {data.creatorName}
        </li>
        <li>
          <span className='pr-2 font-semibold'>등록일자</span>
          {DateFormat(data.createdAt)}
        </li>
        <li>
          <span className='pr-2 font-semibold'>조회수</span>
          {data.views + 1}
        </li>
        <li>
          <HasLikes postId={postId} userId={user?.uid} pathname={pathname} />
        </li>
      </ul>

      <div className='w-full px-5 md:px-0 md:w-[1016px] mx-auto pb-[100px]'>
        {/* image */}
        <div className='pt-4 w-full'>
          {data.image
            ? image?.map((imageURL) => (
                <div
                  key={imageURL}
                  className='relative w-full md:max-w-[800px] mx-auto'
                >
                  <AutoHeightImageWrapper
                    src={imageURL}
                    alt={`${data.creatorName} 업로드 이미지`}
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
          <ReactQuill defaultValue={data.contents} modules={modules} readOnly />
        </div>
      </div>

      <Comments pathname={`${pathname}/${postId}`} user={user} />

      <PrevNextPost pathname={pathname} post={data} />
    </ContainerBox>
  );
};

export default CommDetailPage;
