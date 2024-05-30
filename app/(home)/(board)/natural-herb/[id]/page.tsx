'use client';
import PostDetail from '@/components/Posts/PostDetail';

interface DetailPageProps {
  params: { id: string };
}

const NaturalHerbDetailPage = ({ params: { id } }: DetailPageProps) => {
  return <PostDetail id={id} />;
};

export default NaturalHerbDetailPage;
