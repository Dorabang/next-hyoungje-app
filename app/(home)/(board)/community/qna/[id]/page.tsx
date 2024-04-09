import CommDetailPage from '@/components/Community/CommDetail';

interface QnADetailPageProps {
  params: { id: string };
}

const QnADetailPage = ({ params: { id } }: QnADetailPageProps) => {
  return <CommDetailPage id={id} />;
};

export default QnADetailPage;
