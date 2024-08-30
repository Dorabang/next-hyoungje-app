'use client';
import { LiaHeartSolid, LiaHeart } from 'react-icons/lia';

import { addBookmark, removeBookmark } from '@/apis/bookmark';
import { useBookmarkByPost } from '@/hooks/queries/useBookmark';

interface BtnBookmarkProps {
  postId: number;
}

const BookmarkButton = ({ postId }: BtnBookmarkProps) => {
  const { data, refetch } = useBookmarkByPost(postId);

  const handleUpdatedLikes = async () => {
    if (data?.isBookmarked === undefined) return;

    if (data.isBookmarked) {
      const res = await removeBookmark(postId);
      if (res.result === 'SUCCESS') {
        refetch();
      }
    } else {
      const res = await addBookmark(postId);
      if (res.result === 'SUCCESS') {
        refetch();
      }
    }
  };

  return (
    <button
      onClick={() => handleUpdatedLikes()}
      className={`flex gap-2 items-center ${data?.isBookmarked ? 'cursor-pointer' : 'cursor-default'}`}
    >
      {data?.isBookmarked ? (
        <LiaHeartSolid size={20} className='text-[#BF1E2E]' />
      ) : (
        <LiaHeart size={20} />
      )}
      {data?.data.length}
    </button>
  );
};

export default BookmarkButton;
