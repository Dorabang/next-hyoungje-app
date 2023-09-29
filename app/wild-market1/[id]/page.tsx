'use client';
import getPosts from '@/utils/getPosts';
import { useEffect, useState } from 'react';
import { postProps } from '../page';
import ContainerBox from '@/components/ContainerBox';
import { useRecoilValue } from 'recoil';
import { authState } from '@/recoil/atoms';
import { IoArrowBack } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import DateFormat from '@/utils/DateFormat';
import Image from 'next/image';

interface WildMarketDetailPageProps {
  params: { id: string };
}

const WildMarketDetailPage = ({
  params: { id },
}: WildMarketDetailPageProps) => {
  const [posts, setPosts] = useState<postProps[]>([]);
  const pathname = 'wild-market1';
  const user = useRecoilValue(authState);

  const router = useRouter();

  const post = posts.find((item) => item.id === id);

  useEffect(() => {
    /* setPosts(querySnapshot); */
    if (posts.length === 0) {
      getPosts(pathname).then((response) => setPosts(response));
    }
  }, [posts, pathname]);

  console.log('imageArr', post?.data.image);

  if (!post) return;

  return (
    <ContainerBox>
      {/* title */}
      <div className='border-b border-neutral-500 flex gap-2 justify-between items-center py-3'>
        <div className='p-2 cursor-pointer' onClick={() => router.back()}>
          <IoArrowBack size={18} />
        </div>

        <h2 className='text-lg font-bold flex-grow'>{post?.data.title}</h2>

        {user?.uid === post.data.creatorId && (
          <ul className='flex gap-2 text-gray-500 text-sm'>
            <li>수정</li>
            <li>삭제</li>
          </ul>
        )}
      </div>

      {/* post info */}
      <ul className='flex gap-4 py-2 justify-end text-sm text-gray-500'>
        <li>
          <span className='pr-2 font-semibold'>작성자</span>
          {post.data.creatorName}
        </li>
        <li>
          <span className='pr-2 font-semibold'>등록일자</span>
          {DateFormat(post.data.createdAt)}
        </li>
        <li>
          <span className='pr-2 font-semibold'>조회수</span>
          {post.data.views}
        </li>
      </ul>

      <div className='w-full flex flex-wrap gap-4 justify-center'>
        <table
          className='w-full md:w-[500px]
        [&_tr]:flex [&_tr]:gap-2 [&_tr]:border-b [&_tr]:border-neutral-300
        [&_th]:w-[15%] [&_th]:p-2
        [&_td]:w-[85%] [&_td]:p-2
        '
        >
          <tr>
            <th>종류</th>
            <td>{post.data.variant}</td>
          </tr>
          <tr>
            <th>연락처</th>
            <td>{post.data.phone}</td>
          </tr>
          <tr>
            <th>산지</th>
            <td>{post.data.place}</td>
          </tr>
          <tr>
            <th>산채일</th>
            <td>{DateFormat(new Date(post.data.date))}</td>
          </tr>
        </table>

        <table
          className='w-full md:w-[500px]
        [&_tr]:flex [&_tr]:gap-2 [&_tr]:border-b [&_tr]:border-neutral-300
        [&_th]:w-[15%] [&_th]:p-2
        [&_td]:w-[85%] [&_td]:p-2
        '
        >
          <tr>
            <th>가격</th>
            <td>{post.data.price}</td>
          </tr>
          <tr>
            <th>키</th>
            <td>{post.data.height}</td>
          </tr>
          <tr>
            <th>폭</th>
            <td>{post.data.width}</td>
          </tr>
          <tr>
            <th>촉수</th>
            <td>{post.data.amount}</td>
          </tr>
        </table>

        {/* image */}
        {post.data.image?.length > 0 &&
          post.data.image.map((image) => (
            <div key={image + 'key'} className='relative w-[400px]'>
              <Image
                src={image}
                alt={`${post.data.creatorName} 업로드 이미지`}
                fill
              />
            </div>
          ))}
      </div>
    </ContainerBox>
  );
};

export default WildMarketDetailPage;
