'use client';
import ContainerBox from '@/components/ContainerBox';
import { authState } from '@/recoil/atoms';
import getPosts from '@/utils/getPosts';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import DateFormat from '@/utils/DateFormat';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import StatusOptions from '@/components/StatusOptions';
import Breadcrumbs from '@/components/Breadcrumbs';
import DeletePost from '@/utils/deletePost';
import PostsLoading from '@/components/PostsLoading';
import PostsNotFound from '@/components/PostsNotFound';
import { DocumentData } from 'firebase/firestore';
import PostFormat from '@/components/PostFormat';

export interface postsProps {
  id: string;
  title: string;
  status: string;
  variant: string;
  phone: string;
  place: string;
  contents: string;
  date: string;
  price: string;
  height: string;
  width: string;
  amount: string;
  image?: string[];
  like: string[];
  comment: {
    creatorId: string;
    like: string[];
    recomment: { creatorId: string; contents: string }[];
  }[];
  views: number;
  creatorName: string;
  creatorId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

const Living1Page = () => {
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

  const [page, setPage] = useState(1);
  const limit = 15;
  const offset = (page - 1) * limit;

  const postsData = (posts: DocumentData[]) => {
    if (posts) {
      let result = posts.slice(offset, offset + limit);
      return result;
    }
  };

  useEffect(() => {
    /* setPosts(querySnapshot); */
    if (selectedCategory === 'all') {
      getPosts(pathname).then((response) => {
        response.sort(function (a: DocumentData, b: DocumentData) {
          return Number(a.createdAt) - Number(b.createdAt);
        });

        setPosts(response.reverse());

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

export default Living1Page;
