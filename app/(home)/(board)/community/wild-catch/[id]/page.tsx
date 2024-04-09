import CommDetailPage from '@/components/Community/CommDetail';

interface WildCatchDetailPageProps {
  params: { id: string };
}

const WildCatchDetailPage = ({ params: { id } }: WildCatchDetailPageProps) => {
  return <CommDetailPage id={id} />;
};

export default WildCatchDetailPage;
