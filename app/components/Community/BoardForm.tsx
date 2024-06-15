import Link from 'next/link';
import { DocumentData } from 'firebase/firestore';
import { AiOutlineFileImage, AiOutlinePlus } from 'react-icons/ai';
import { noto_serif_kr } from '../NotoSerif';
import DateFormat from '@/utils/DateFormat';
import PostsLoading from '../Posts/PostsLoading';
import PostsNotFound from '../Posts/PostsNotFound';

const BoardForm = ({
  data,
  title,
  path,
  isLoading,
}: {
  data: DocumentData[];
  title: string;
  path: string;
  isLoading: boolean;
}) => {
  return (
    <>
      <div className='flex justify-between'>
        <h3 className={`font-bold ${noto_serif_kr.className} text-2xl pb-6`}>
          {title}
        </h3>
        <Link href={path}>
          <AiOutlinePlus
            size={28}
            className='text-grayColor-300 hover:text-grayColor-500 transition-colors'
          />
        </Link>
      </div>

      <ul className='w-full border-b border-neutral-500 mb-16 text-sm'>
        <li className='border-b border-t border-neutral-500 flex gap-2 text-center font-bold [&_>_div]:py-2 text-grayColor-400'>
          <div className='w-[6%]'>번호</div>
          <div className='w-[15%]'>작성자</div>
          <div className='flex-grow text-left'>제목</div>
          <div className='w-[20%] md:w-[10%]'>등록일</div>
          <div className='w-[15%] md:w-[10%]'>조회수</div>
        </li>
        {!isLoading ? (
          data.length !== 0 ? (
            data.map(
              ({ id, num, creatorName, title, createdAt, views, image }) => (
                <li
                  key={id}
                  className='flex gap-2 items-center border-b border-neutral-300 text-center text-gray-700 [&_>_div]:py-3 [&_>_div]:truncate'
                >
                  <div className='w-[6%]'>{num}</div>
                  <div className='w-[15%]'>{creatorName}</div>
                  <div className='flex-grow text-left'>
                    <Link
                      href={`${path}/${id}`}
                      className='flex gap-2 items-center'
                    >
                      {image && image?.length !== 0 && <AiOutlineFileImage />}
                      {title}
                    </Link>
                  </div>
                  <div className='w-[20%]'>{DateFormat(createdAt)}</div>
                  <div className='w-[15%]'>{views}</div>
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
