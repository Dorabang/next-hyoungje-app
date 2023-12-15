import CommDetailPage from '@/components/Community/CommDetail';

interface WildMarketDetailPageProps {
  params: { id: string };
}

const WildMarketDetailPage = ({
  params: { id },
}: WildMarketDetailPageProps) => {
  return <CommDetailPage id={id} />;
};

export default WildMarketDetailPage;
