'use client';
import PostDetail from '@/components/Posts/PostDetail';

interface DetailPageProps {
  params: { id: string };
}

const SingleLeafDetailPage = ({ params: { id } }: DetailPageProps) => {
  return <PostDetail id={id} />;
};

export default SingleLeafDetailPage;
