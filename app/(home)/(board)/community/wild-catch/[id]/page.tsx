import CommDetailPage from '@/components/Community/CommDetail';

interface WildCatchDetailPageProps {
  params: { id: string };
}

const WildCatchDetailPage = ({ params: { id } }: WildCatchDetailPageProps) => {
  return <CommDetailPage postId={id} />;
};

export default WildCatchDetailPage;
