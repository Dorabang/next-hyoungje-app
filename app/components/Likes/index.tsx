import { hasLike } from '@/apis/like';
import useHasLikes from '@/hooks/queries/useHasLikes';
import { useEffect, useState } from 'react';
import { LiaHeartSolid, LiaHeart } from 'react-icons/lia';

interface LikesProps {
  pathname: string;
  userId: string | null;
  postId: string;
  amount: number;
}

const Likes = ({ pathname, postId, userId, amount }: LikesProps) => {
  const { data } = useHasLikes({ pathname, userId, postId });

  return (
    <button
      onClick={() => handleUpdatedLikes()}
      className='flex gap-2 items-center'
    >
      {data && userId ? (
        <>
          <LiaHeartSolid size={20} className='text-[#BF1E2E]' /> {amount}
        </>
      ) : (
        <>
          <LiaHeart size={20} /> {amount}
        </>
      )}
    </button>
  );
};

export default Likes;
