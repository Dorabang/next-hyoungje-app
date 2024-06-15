'use client';
import getUser from '@/apis/getUser';
import { updatedLike } from '@/apis/like';
import useHasLikes from '@/hooks/queries/useHasLikes';
import { DocumentData } from 'firebase/firestore';
import { LiaHeartSolid, LiaHeart } from 'react-icons/lia';

interface HasLikesProps {
  userId?: string;
  pathname: string;
  postId: string;
}

const HasLikes = ({ userId = undefined, postId, pathname }: HasLikesProps) => {
  const { data, refetch } = useHasLikes({ pathname, postId });

  const handleUpdatedLikes = async () => {
    if (!userId || !data) return;

    const hasLike = data?.filter((id: string) => id === userId).length > 0;

    const bookmark = (await getUser(userId))?.like;

    const updatedBookmarkList = bookmark
      ? bookmark.filter((post: string) => post.includes(postId)).length > 0
        ? [...bookmark.filter((item: string) => !item.includes(postId))]
        : [...bookmark, `${pathname}/${postId}`]
      : [`${pathname}/${postId}`];

    const updatedLikeList: DocumentData = hasLike
      ? [...data.filter((id: string) => id !== userId)]
      : data?.length !== 0
        ? [...data, userId]
        : [userId];

    const likeData = {
      updateData: updatedLikeList,
      postId: postId,
      pathname: pathname,
      userId: userId,
      updateBookmark: updatedBookmarkList,
    };

    const result = await updatedLike(likeData);
    if (result) return refetch();
  };

  return (
    <button
      onClick={() => handleUpdatedLikes()}
      className={`flex gap-2 items-center ${userId ? 'cursor-pointer' : 'cursor-default'}`}
    >
      {data?.filter((item: string) => item === userId).length > 0 ? (
        <LiaHeartSolid size={20} className='text-[#BF1E2E]' />
      ) : (
        <LiaHeart size={20} />
      )}
      {data?.length}
    </button>
  );
};

export default HasLikes;
