'use client';
import { useEffect, useState } from 'react';
import ContainerBox from '@/components/ContainerBox';
import { useRecoilValue } from 'recoil';
import { authState } from '@/recoil/atoms';
import { IoArrowBack } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import DateFormat from '@/utils/DateFormat';
import ReactQuill from 'react-quill';
import GetImageURL from '@/utils/getImageURL';
import StatusOptions from '@/components/StatusOptions';
import HasLikes from '@/utils/HasLikes';
import { DocumentData } from 'firebase/firestore';
import PrevNextPost from '@/components/Posts/PrevNextPost';
import { deletePost } from '@/apis/posts';
import AutoHeightImageWrapper from '@/components/AutoHeightImageWrapper';
import getPost from '@/utils/getPost';

interface WildMarketDetailPageProps {
  params: { id: string };
}

const WildMarketDetailPage = ({
  params: { id },
}: WildMarketDetailPageProps) => {
  const [post, setPost] = useState<DocumentData | null>(null);

  const pathname = 'wild-market1';
  const user = useRecoilValue(authState);

  const router = useRouter();

  useEffect(() => {
    if (post === null) {
      getPost(pathname, id).then((response) => setPost(response[0]));
    }
  }, [id, post]);

  const [image, setImage] = useState<string[]>();

  const postImages = post && post?.image;

  const modules = {
    toolbar: { container: [] },
  };

  const handleDeletePost = (id: string) => {
    const ok = window.confirm('이 게시물을 삭제하시겠습니까?');

    if (!post) return;

    if (ok) {
      deletePost(post, user, pathname, id);
      router.push(`/${pathname}`);
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
        GetImageURL(`${pathname}/${post.creatorId}/post/${id}/image`, getImage),
      );
    }
  }, [postImages, post?.creatorId]);

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
          onClick={() => router.push(`/${pathname}`)}
        >
          <IoArrowBack size={18} />
        </div>

        <h2 className='text-lg font-bold flex-grow'>
          <span className='px-2'>{StatusOptions(post.status)}</span>
          {post?.title}
        </h2>

        {user?.uid === post.creatorId && (
          <ul className='flex gap-2 text-gray-500 text-sm [&_li]:cursor-pointer'>
            <li onClick={() => router.push(`/${pathname}/edit/${post.id}`)}>
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

      <div className='w-full px-5 md:px-0 md:w-[1016px] mx-auto'>
        <div className='w-full flex flex-wrap md:gap-4 justify-center'>
          <table
            className='w-full md:w-[500px]
        [&_tr]:flex [&_tr]:gap-2 [&_tr]:border-b [&_tr]:border-neutral-300
        [&_th]:w-[20%]
        sm:[&_th]:w-[15%] [&_th]:p-2
        [&_td]:w-[80%]
        sm:[&_td]:w-[85%] [&_td]:p-2
        '
          >
            <tbody>
              <tr>
                <th>종류</th>
                <td>{post.variant}</td>
              </tr>
              <tr>
                <th>연락처</th>
                <td>{post.phone}</td>
              </tr>
              <tr>
                <th>산지</th>
                <td>{post.place}</td>
              </tr>
              <tr>
                <th>산채일</th>
                <td>{DateFormat(new Date(post.date))}</td>
              </tr>
            </tbody>
          </table>

          <table
            className='w-full md:w-[500px]
              [&_tr]:flex [&_tr]:gap-2 [&_tr]:border-b [&_tr]:border-neutral-300
              [&_th]:w-[20%]
              sm:[&_th]:w-[15%] [&_th]:p-2
              [&_td]:w-[80%]
              sm:[&_td]:w-[85%] [&_td]:p-2
            '
          >
            <tbody>
              <tr>
                <th>가격</th>
                <td>{post.price}</td>
              </tr>
              <tr>
                <th>키</th>
                <td>{post.height}</td>
              </tr>
              <tr>
                <th>폭</th>
                <td>{post.width}</td>
              </tr>
              <tr>
                <th>촉수</th>
                <td>{post.amount}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* image */}
        <div className='pt-4 w-full'>
          {postImages &&
            image &&
            image.map((imageURL) => (
              <div
                key={imageURL}
                className='relative w-full md:max-w-[700px] mx-auto'
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

        <button
          className='flex flex-wrap gap-1 justify-center items-center
            mx-auto mt-8 px-2 py-2
            border border-[#ddd] rounded-sm'
        >
          <div className='w-full'>좋아요</div>
          {HasLikes(post?.like, user)}
          {post?.like?.length}
        </button>
      </div>

      <PrevNextPost pathname={pathname} post={post} />
    </ContainerBox>
  );
};

export default WildMarketDetailPage;
