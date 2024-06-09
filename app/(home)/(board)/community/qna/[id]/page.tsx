import CommDetailPage from '@/components/Community/CommDetail';

interface QnADetailPageProps {
  params: { id: string };
}

const QnADetailPage = ({ params: { id } }: QnADetailPageProps) => {
  return <CommDetailPage postId={id} />;
};

export default QnADetailPage;
