'use client';
import { getPosts } from '@/apis/posts';
import { useEffect, useState } from 'react';
import ContainerBox from '@/components/ContainerBox';
import { useRecoilValue } from 'recoil';
import { authState } from '@/recoil/atoms';
import { IoArrowBack } from 'react-icons/io5';
import { usePathname, useRouter } from 'next/navigation';
import DateFormat from '@/utils/DateFormat';
import ReactQuill from 'react-quill';
import GetImageURL from '@/apis/getImageURL';
import { DocumentData } from 'firebase/firestore';
import PrevNextPost from '@/components/Posts/PrevNextPost';
import { deletePost } from '@/apis/posts';
import AutoHeightImageWrapper from '../AutoHeightImageWrapper';
import getPost from '@/apis/getPost';

interface CommDetailPageProps {
  id: string;
}

const CommDetailPage = ({ id }: CommDetailPageProps) => {
  const [post, setPost] = useState<DocumentData | null>(null);

  const pathname = usePathname().split('/');
  const user = useRecoilValue(authState);

  const router = useRouter();

  useEffect(() => {
    if (!post) {
      const getCurrentPost = async () => {
        const response = await getPost(pathname[2], id);
        console.log('🚀 ~ getCurrentPost ~ response:', response);
        setPost(response[0]);
      };
      getCurrentPost();
    }
  }, [post, id, pathname]);

  const [image, setImage] = useState<string[]>();

  const postImages = post?.image;

  const modules = {
    toolbar: { container: [] },
  };

  const handleDeletePost = (id: string) => {
    const ok = window.confirm('이 게시물을 삭제하시겠습니까?');

    if (!post) return;

    if (ok) {
      deletePost(post, user, pathname[2], id);
      router.push(`/${pathname[1]}/${pathname[2]}`);
    }
  };

  useEffect(() => {
    const getImage = (value: string) => {
      return setImage((prev) =>
        prev ? (!prev?.includes(value) ? [...prev, value] : prev) : [value],
      );
    };

    if (postImages && post.creatorId) {
      postImages.map((id: string) =>
        GetImageURL(
          `${pathname[2]}/${post.creatorId}/post/${id}/image`,
          getImage,
        ),
      );
    }
  }, [postImages, post?.creatorId, pathname]);

  if (!post) return;

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
          onClick={() => router.push(`/${pathname[1]}/${pathname[2]}`)}
        >
          <IoArrowBack size={18} />
        </div>

        <h2 className='text-lg font-bold flex-grow'>{post?.title}</h2>

        {user?.uid === post.creatorId && (
          <ul className='flex gap-2 text-gray-500 text-sm [&_li]:cursor-pointer'>
            <li
              onClick={() =>
                router.push(`/${pathname[1]}/${pathname[2]}/edit/${post.id}`)
              }
            >
              편집
            </li>
            <li onClick={() => handleDeletePost(id)}>삭제</li>
          </ul>
        )}
      </div>

      {/* post info */}
      <ul className='flex gap-4 pt-2 pb-6 justify-end text-sm text-gray-500'>
        <li>
          <span className='pr-2 font-semibold'>작성자</span>
          {post.creatorName}
        </li>
        <li>
          <span className='pr-2 font-semibold'>등록일자</span>
          {DateFormat(post.createdAt)}
        </li>
        <li>
          <span className='pr-2 font-semibold'>조회수</span>
          {post.views}
        </li>
      </ul>

      <div className='w-full px-5 md:px-0 md:w-[1016px] mx-auto pb-[100px]'>
        {/* image */}
        <div className='pt-4 w-full'>
          {postImages &&
            image &&
            image.map((imageURL) => (
              <div
                key={imageURL}
                className='relative w-full md:max-w-[800px] mx-auto'
              >
                <AutoHeightImageWrapper
                  src={imageURL}
                  alt={`${post.creatorName} 업로드 이미지`}
                />
              </div>
            ))}
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
          pt-4
        '
        >
          <ReactQuill defaultValue={post.contents} modules={modules} readOnly />
        </div>
      </div>

      <PrevNextPost pathname={`${pathname[1]}/${pathname[2]}`} post={post} />
    </ContainerBox>
  );
};

export default CommDetailPage;
