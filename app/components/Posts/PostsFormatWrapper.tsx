'use client';
import React, { useEffect, useState } from 'react';
import { authState } from '@/recoil/atoms';
import getPosts from '@/utils/getPosts';
import { usePathname } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { DocumentData } from 'firebase/firestore';
import PostFormat from '@/components/Posts/PostFormat';

const PostsFormatWrapper = () => {
  const user = useRecoilValue(authState);

  const pathname = usePathname();

  const [posts, setPosts] = useState<DocumentData[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleUpdateFilter = (status: string) => {
    setSelectedCategory(status);
  };

  const handleUpdatePosts = (data: DocumentData[]) => {
    setPosts(data);
  };

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    /* setPosts(querySnapshot); */
    if (selectedCategory === 'all') {
      getPosts(pathname).then((response) => {
        response.sort(function (a: DocumentData, b: DocumentData) {
          return Number(b.createdAt) - Number(a.createdAt);
        });

        setPosts(response);

        setIsLoading(false);
      });
    }

    if (selectedCategory !== 'all') {
      getPosts(pathname).then((response) => {
        const filter = response.filter(
          (item) => item.status === selectedCategory
        );
        setPosts(filter.reverse());

        setIsLoading(false);
      });
    }
  }, [pathname, selectedCategory]);

  return (
    <PostFormat
      pathname={pathname}
      isLoading={isLoading}
      posts={posts}
      user={user}
      handleUpdatePosts={handleUpdatePosts}
      selectedCategory={selectedCategory}
      handleUpdateFilter={handleUpdateFilter}
    />
  );
};

export default PostsFormatWrapper;
