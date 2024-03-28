'use client';
import React, { useEffect, useState } from 'react';
import { authState } from '@/recoil/atoms';
import { getPosts } from '@/apis/posts';
import { usePathname } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { DocumentData } from 'firebase/firestore';
import getAdmin from '@/apis/getAdmin';
import CommFormat from '@/components/Community/CommFormat';

const CommWrapper = () => {
  const user = useRecoilValue(authState);

  const [admin, setAdmin] = useState<DocumentData | null>(null);
  const pathname = usePathname().trim().split('/');

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
      getPosts(`/${pathname[2]}`).then((response) => {
        response &&
          response.sort(function (a: DocumentData, b: DocumentData) {
            return Number(b.createdAt) - Number(a.createdAt);
          });

        response && setPosts(response);

        setIsLoading(false);
      });
    }

    if (selectedCategory !== 'all') {
      getPosts(`/${pathname[2]}`).then((response) => {
        if (!response) return;
        const filter = response.filter(
          (item) => item.status === selectedCategory,
        );
        setPosts(filter.reverse());

        setIsLoading(false);
      });
    }
  }, [pathname, selectedCategory]);

  return (
    <CommFormat
      pathname={`/${pathname[2]}`}
      isLoading={isLoading}
      posts={posts}
      user={user}
      admin={admin}
      handleUpdatePosts={handleUpdatePosts}
      selectedCategory={selectedCategory}
      handleUpdateFilter={handleUpdateFilter}
    />
  );
};

export default CommWrapper;
