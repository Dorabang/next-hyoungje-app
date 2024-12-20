import Link from 'next/link';
import { AiOutlineFileImage, AiOutlinePlus } from 'react-icons/ai';

import { noto_serif_kr } from '../common/NotoSerif';
import DateFormat from '@/utils/DateFormat';
import PostsLoading from '../Posts/PostsLoading';
import PostsNotFound from '../Posts/PostsNotFound';
import { Post } from '../common/Board/types';

const BoardForm = ({
  data,
  title,
  path,
  isLoading,
}: {
  data: Post[];
  title: string;
  path: string;
  isLoading: boolean;
}) => {
  return (
    <>
      <div className='flex justify-between'>
        <h3 className={`font-bold ${noto_serif_kr.className} text-2xl pb-6`}>
          <Link href={path} className='hover:underline active:underline'>
            {title}
          </Link>
        </h3>
        <Link href={path}>
          <AiOutlinePlus
            size={28}
            className='text-grayColor-300 hover:text-grayColor-500 transition-colors'
          />
        </Link>
      </div>

      <ul className='w-full border-b border-grayColor-500 mb-16 text-sm'>
        <li className='border-b border-t border-grayColor-500 flex gap-2 text-center font-bold [&_>_div]:py-2 text-grayColor-400'>
          <div className='w-[6%]'>번호</div>
          <div className='w-[15%] md:w-[10%]'>작성자</div>
          <div className='flex-grow text-left'>제목</div>
          <div className='w-[20%] md:w-[10%]'>등록일</div>
          <div className='w-[15%] md:w-[10%]'>조회수</div>
        </li>
        {!isLoading ? (
          data.length !== 0 ? (
            data.map(
              ({
                title,
                image,
                postId,
                user,
                documentNumber,
                createdAt,
                views,
                displayName,
              }) => (
                <li
                  key={postId}
                  className='flex gap-2 items-center border-b border-grayColor-300 text-center text-gray-700 [&_>_div]:py-3 [&_>_div]:truncate'
                >
                  <div className='w-[6%]'>{documentNumber}</div>
                  <div className='w-[15%] md:w-[10%]'>
                    {displayName ?? user.displayName}
                  </div>
                  <div className='flex-grow h-full flex justify-between items-center'>
                    <Link
                      href={`${path}/${postId}`}
                      className='flex w-full h-full items-center whitespace-nowrap hover:underline active:underline'
                    >
                      {image && image?.length !== 0 && <AiOutlineFileImage />}
                      <div className='flex-grow block h-full text-left min-h-[16px]'>
                        {title}
                      </div>
                    </Link>
                  </div>
                  <div className='w-[20%] md:w-[10%]'>
                    {DateFormat(createdAt)}
                  </div>
                  <div className='w-[15%] md:w-[10%]'>{views}</div>
                </li>
              ),
            )
          ) : (
            <PostsNotFound />
          )
        ) : (
          <PostsLoading />
        )}
      </ul>
    </>
  );
};

export default BoardForm;
