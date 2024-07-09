import { Suspense } from 'react';
import CommDetailPage from '@/components/Community/CommDetail';
import Loading from '@/components/Loading';

interface NoticeDetailPageProps {
  params: { id: string };
}

const NoticeDetailPage = ({ params: { id } }: NoticeDetailPageProps) => {
  return (
    <Suspense fallback={<Loading />}>
      <CommDetailPage postId={id} />
    </Suspense>
  );
};

export default NoticeDetailPage;
