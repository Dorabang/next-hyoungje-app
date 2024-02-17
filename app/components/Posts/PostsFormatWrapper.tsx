'use client';
import React, { useEffect, useState } from 'react';
import { authState } from '@/recoil/atoms';
import { getPosts } from '@/apis/posts';
import { usePathname } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { DocumentData } from 'firebase/firestore';
import PostFormat from '@/components/Posts/PostFormat';
import getAdmin from '@/utils/getAdmin';

const PostsFormatWrapper = () => {
  const user = useRecoilValue(authState);

  const [admin, setAdmin] = useState<DocumentData | null>(null);
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
    if (!admin) {
      getAdmin().then((response) => {
        setAdmin(response[0].user);
      });
    }
  }, [admin]);

  useEffect(() => {
    /* setPosts(querySnapshot); */
    if (selectedCategory === 'all') {
      getPosts(pathname).then((response) => {
        response && setPosts(response);

        setIsLoading(false);
      });
    }

    if (selectedCategory !== 'all') {
      getPosts(pathname).then((response) => {
        if (!response) return;
        const filter = response.filter(
          (item) => item.status === selectedCategory,
        );
        setPosts(filter);

        setIsLoading(false);
      });
    }
  }, [pathname, selectedCategory]);

  return <PostFormat />;
};

export default PostsFormatWrapper;
