'use client';
import PostDetail from '@/components/Posts/PostDetail';

interface DetailPageProps {
  params: { id: string };
}

const SingleLeafDetailPage = ({ params: { id } }: DetailPageProps) => {
  return <PostDetail postId={id} />;
};

export default SingleLeafDetailPage;
