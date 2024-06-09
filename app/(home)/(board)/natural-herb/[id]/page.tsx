'use client';
import PostDetail from '@/components/Posts/PostDetail';

interface DetailPageProps {
  params: { id: string };
}

const NaturalHerbDetailPage = ({ params: { id } }: DetailPageProps) => {
  return <PostDetail postId={id} />;
};

export default NaturalHerbDetailPage;
