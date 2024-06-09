'use client';
import PostDetail from '@/components/Posts/PostDetail';

interface WildMarketDetailPageProps {
  params: { id: string };
}

const WildMarketDetailPage = ({
  params: { id },
}: WildMarketDetailPageProps) => {
  return <PostDetail postId={id} />;
};

export default WildMarketDetailPage;
