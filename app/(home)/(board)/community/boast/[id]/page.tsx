import CommDetailPage from '@/components/Community/CommDetail';
import Loading from '@/components/Loading';
import { Suspense } from 'react';

interface CommunityDetailPageProps {
  params: { id: string };
}

const BoastDetailPage = ({ params: { id } }: CommunityDetailPageProps) => {
  return (
    <Suspense fallback={<Loading />}>
      <CommDetailPage postId={id} />
    </Suspense>
  );
};

export default BoastDetailPage;
