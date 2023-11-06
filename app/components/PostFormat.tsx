import Breadcrumbs from '@/components/Breadcrumbs';
import ContainerBox from './ContainerBox';
import Link from 'next/link';
import { DocumentData } from 'firebase/firestore';
import StatusOptions from './StatusOptions';
import DateFormat from '@/utils/DateFormat';
import PostsNotFound from './PostsNotFound';
import PostsLoading from './PostsLoading';
import { User } from 'firebase/auth';
import DeletePost from '@/utils/deletePost';
import FilterOption from './FilterOption';
import { useRouter } from 'next/navigation';
import { AiOutlineFileImage } from 'react-icons/ai';

interface PostFormatProps {
  pathname: string;
  isLoading: boolean;
  posts: DocumentData[] | null;
  user: User | null;
  handleUpdatePosts: (data: DocumentData[]) => void;
  selectedCategory: string;
  handleUpdateFilter: (status: string) => void;
}

const PostFormat = ({
  pathname,
  isLoading,
  posts,
  user,
  handleUpdatePosts,
  selectedCategory,
  handleUpdateFilter,
}: PostFormatProps) => {
  const router = useRouter();

  const handleDeletePost = (id: string) => {
    const ok = window.confirm('이 게시물을 삭제하시겠습니까?');

    const post = posts && posts.find((item) => item.id === id);
    if (!post) return;

    if (ok) {
      DeletePost(post, user, pathname, id);
      const deletePosts = posts.filter((item) => item.id !== id);
      handleUpdatePosts(deletePosts);
    }
  };

  return (
    <ContainerBox>
      <div className='text-sm'>
        <div className='flex justify-between'>
          <Breadcrumbs pathname={pathname} />
        </div>

        <FilterOption
          selectedCategory={selectedCategory}
          handleUpdateFilter={handleUpdateFilter}
          pathname={pathname}
        />

        <ul className='w-full border-b border-neutral-500'>
          <li className='border-b border-t border-neutral-500 flex text-center font-bold [&_>_div]:py-2'>
            <div className='w-[6%]'>종류</div>
            <div className='w-[10%]'>분류</div>
            <div className='flex-grow text-left'>제목</div>
            <div className='w-[6%]'>산지</div>
            <div className='w-[6%]'>가격</div>
            <div className='w-[10%]'>작성자</div>
            <div className='w-[6%]'>등록 일자</div>
            <div className='w-[6%]'>조회수</div>
          </li>
          {!isLoading ? (
            posts && posts.length !== 0 ? (
              posts.map(
                ({
                  id,
                  variant,
                  status,
                  title,
                  creatorId,
                  creatorName,
                  createdAt,
                  views,
                  place,
                  price,
                  image,
                }: DocumentData) => {
                  return (
                    <li
                      key={id}
                      className='flex items-center border-b border-neutral-300 text-center text-gray-700 [&_>_div]:py-3'
                    >
                      <div className='w-[6%]'>
                        {variant.length > 5
                          ? variant.substring(0, 5) + '...'
                          : variant}
                      </div>
                      <div className='w-[10%]'>{StatusOptions(status)}</div>
                      <div className='flex-grow flex justify-between items-center'>
                        <Link
                          href={`/wild-market1/${id}`}
                          className='flex items-center'
                        >
                          {image?.length !== 0 && (
                            <AiOutlineFileImage className='mr-2' />
                          )}
                          {title}{' '}
                        </Link>
                        {user && user.uid === creatorId && (
                          <div className='text-gray-400 text-xs flex [&_span]:px-1 ml-4'>
                            <span
                              className='hover:text-gray-700 cursor-pointer'
                              onClick={() =>
                                router.push(`${pathname}/edit/${id}`)
                              }
                            >
                              편집
                            </span>
                            <span>/</span>
                            <span
                              className='hover:text-gray-700 cursor-pointer'
                              onClick={() => handleDeletePost(id)}
                            >
                              삭제
                            </span>
                          </div>
                        )}
                      </div>
                      <div className='w-[6%]'>{place}</div>
                      <div className='w-[6%]'>{price}</div>
                      <div className='w-[10%]'>
                        {creatorName.length > 8
                          ? creatorName.substring(0, 8) + '...'
                          : creatorName}
                      </div>
                      <div className='w-[6%]'>{DateFormat(createdAt)}</div>
                      <div className='w-[6%]'>{views}</div>
                    </li>
                  );
                }
              )
            ) : (
              /* 게시물 데이터가 없을 때 */
              <PostsNotFound />
            )
          ) : (
            /* 게시물 데이터 로딩 중 */
            <PostsLoading />
          )}
        </ul>
      </div>
    </ContainerBox>
  );
};

export default PostFormat;
