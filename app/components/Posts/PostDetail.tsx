'use client';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { useRecoilValue } from 'recoil';
import { authState } from '@/recoil/atoms';
import { IoArrowBack } from 'react-icons/io5';
import { usePathname, useRouter } from 'next/navigation';

import { deletePost } from '@/apis/posts';
import { updatedViews } from '@/apis/updatedViews';
import getAdmin from '@/apis/getAdmin';
import { getImageURL } from '@/apis/images';
import { useGetPost } from '@/hooks/queries/usePosts';
import DateFormat from '@/utils/DateFormat';
import ContainerBox from '@/components/ContainerBox';
import statusOptions from '@/components/StatusOptions';
import PrevNextPost from '@/components/Posts/PrevNextPost';
import Comments from '../Comment/Comments';
import AutoHeightImageWrapper from '@/components/AutoHeightImageWrapper';
import Loading from '../Loading';
import HasLikes from '../HasLikes';

interface DetailPageProps {
  postId: string;
}

const PostDetail = ({ postId }: DetailPageProps) => {
  const router = useRouter();
  const user = useRecoilValue(authState);

  const [admin, setAdmin] = useState<boolean>(false);

  const path = usePathname().split('/');
  const pathname = path[3] ? path[2] : path[1];
  console.log('🚀 ~ PostDetail ~ pathname:', pathname.includes('single-leaf'));
  const { data, isLoading } = useGetPost(pathname, postId);
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
        const url = await getImageURL(pathname, data.creatorId, img);
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
      deletePost(data, user, pathname, id);
      router.push(`/${pathname}`);
    }
  };

  useEffect(() => {
    if (!admin) {
      const getAdminData = async () => {
        if (user) {
          const response = await getAdmin(user.uid);
          response && setAdmin(response);
        }
      };
      getAdminData();
    }
  }, [admin, user]);

  if (isLoading)
    return (
      <ContainerBox className='py-20'>
        <Loading />
      </ContainerBox>
    );

  if (!data)
    return (
      <ContainerBox className='py-20'>
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
          onClick={() =>
            router.push(path[3] ? `/${path[2]}/${path[3]}` : `/${pathname}`)
          }
        >
          <IoArrowBack size={18} />
        </div>

        <h2 className='text-lg font-bold flex-grow'>
          <span className='px-2'>{statusOptions(data.status)}</span>
          {data?.title}
        </h2>

        {(user?.uid === data.creatorId || admin) && (
          <ul className='flex gap-2 text-gray-500 text-sm [&_li]:cursor-pointer'>
            <li
              onClick={() =>
                router.push(
                  path[3]
                    ? `/community/${path[2]}/edit/${data.id}`
                    : `/${pathname}/edit/${data.id}`,
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

      <div className='w-full px-5 md:px-0 md:w-[1016px] mx-auto'>
        <div className='w-full flex flex-wrap md:gap-4 justify-center'>
          <table
            className='w-full md:w-[500px]
        [&_tr]:flex [&_tr]:gap-2 [&_tr]:border-b [&_tr]:border-neutral-300
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
                <td>{data.variant}</td>
              </tr>
              <tr>
                <th>연락처</th>
                <td>{data.phone}</td>
              </tr>
              <tr>
                <th>산지</th>
                <td>{data.place}</td>
              </tr>
              {!pathname.includes('market') ? null : (
                <tr>
                  <th>산채일</th>
                  <td>{DateFormat(data.date)}</td>
                </tr>
              )}
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
                <td>{data.price}</td>
              </tr>
              {!pathname.includes('market') && (
                <tr>
                  <th>산채일</th>
                  <td>{DateFormat(data.date)}</td>
                </tr>
              )}
              {pathname.includes('market') && (
                <>
                  <tr>
                    <th>키</th>
                    <td>{data.height}</td>
                  </tr>
                  <tr>
                    <th>폭</th>
                    <td>{data.width}</td>
                  </tr>
                </>
              )}
              <tr>
                <th>촉수</th>
                <td>{data.amount}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* image */}
        <div className='pt-8 w-full'>
          {data.image
            ? image?.map((imageURL: string) => (
                <div
                  key={imageURL}
                  className='relative w-full md:max-w-[700px] mx-auto'
                >
                  <AutoHeightImageWrapper
                    src={imageURL}
                    alt={`${data.creatorName} 업로드 이미지`}
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
          <ReactQuill defaultValue={data.contents} modules={modules} readOnly />
        </div>
      </div>

      <Comments pathname={`${pathname}/${postId}`} user={user} />

      <PrevNextPost pathname={pathname} post={data} />
    </ContainerBox>
  );
};

export default PostDetail;
