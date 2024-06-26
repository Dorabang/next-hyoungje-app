import CommDetailPage from '@/components/Community/CommDetail';

interface NoticeDetailPageProps {
  params: { id: string };
}

const NoticeDetailPage = ({ params: { id } }: NoticeDetailPageProps) => {
  return <CommDetailPage postId={id} />;
};

export default NoticeDetailPage;
