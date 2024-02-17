import PostsLoading from '../Posts/PostsLoading';
import PostsNotFound from '../Posts/PostsNotFound';
import { doc, updateDoc } from 'firebase/firestore';
import { dbService } from '@/firebase';
import { useContext } from 'react';
import { PostContext } from '.';
import { deletePost } from '@/apis/posts';
import PostList from './PostList';

export const Bodys = ({
  isLoading,
  type = 'etc',
}: {
  isLoading: boolean;
  type?: 'etc' | 'community';
}) => {
  const { posts, editPosts, user, pathname } = useContext(PostContext);

  const handleDeletePost = (id: string) => {
    const ok = window.confirm('이 게시물을 삭제하시겠습니까?');

    const post = posts && posts.find((item) => item.id === id);
    if (!post) return;

    if (ok) {
      deletePost(post, user, pathname, id);
      const deletePosts = posts.filter((item) => item.id !== id);
      editPosts(deletePosts);
    }
  };

  const handleClickViewUp = async (id: string) => {
    const post = posts && posts.find((item) => item.id === id);

    if (post) {
      const newPostObj = { ...post, views: post.views + 1 };
      const docRef = doc(dbService, `${pathname}/${post.id}`);

      await updateDoc(docRef, newPostObj);
    }
  };

  return (
    <>
      {!isLoading ? (
        posts && posts.length !== 0 ? (
          posts.map((post) => {
            return (
              <PostList
                key={post.id}
                type={type}
                pathname={pathname}
                post={post}
                user={user}
                handleDeletePost={handleDeletePost}
                handleClickViewUp={handleClickViewUp}
              />
            );
          })
        ) : (
          /* 게시물 데이터가 없을 때 */
          <PostsNotFound />
        )
      ) : (
        /* 게시물 데이터 로딩 중 */
        <PostsLoading />
      )}
    </>
  );
};
