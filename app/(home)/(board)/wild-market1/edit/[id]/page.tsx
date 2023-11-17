'use client';
import Edit from '@/components/Edit';
import getPosts from '@/utils/getPosts';
import { DocumentData } from 'firebase/firestore';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const DetailEditPage = ({ params: { id } }: { params: { id: string } }) => {
  // const pathname = 'wild-market1';
  const pathname = usePathname().trim().split('/');

  const [posts, setPosts] = useState<DocumentData[]>([]);

  const post = posts.find((item) => item.id === id);

  useEffect(() => {
    if (posts.length === 0) {
      getPosts(pathname[1]).then((response) => setPosts(response));
    }
  }, [posts.length, pathname]);

  if (!post) return;

  return <Edit post={post} pathname={pathname[1]} />;
};

export default DetailEditPage;
