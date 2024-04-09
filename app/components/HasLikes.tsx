'use client';
import { hasLike } from '@/apis/like';
import { useEffect, useState } from 'react';
import { LiaHeartSolid, LiaHeart } from 'react-icons/lia';

interface HasLikesProps {
  pathname: string;
  userId?: string;
  postId: string;
}

const HasLikes = ({ pathname, userId, postId }: HasLikesProps) => {
  const [hasLikes, setHasLikes] = useState(false);
  console.log('🚀 ~ HasLikes ~ hasLikes:', hasLikes);

  useEffect(() => {
    const getLikeArr = async () => {
      if (!userId) return;
      const result = await hasLike({ pathname, userId, postId });
      console.log('🚀 ~ getLikeArr ~ result:', result);
      setHasLikes(result);
    };
    getLikeArr();
  }, [pathname, userId]);

  return hasLikes && userId ? (
    <LiaHeartSolid size={20} className='text-[#BF1E2E]' />
  ) : (
    <LiaHeart size={20} />
  );
};

export default HasLikes;
