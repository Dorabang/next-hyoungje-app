import CommDetailPage from '@/components/Community/CommDetail';

interface CommunityDetailPageProps {
  params: { id: string };
}

const BoastDetailPage = ({ params: { id } }: CommunityDetailPageProps) => {
  return <CommDetailPage id={id} />;
};

export default BoastDetailPage;
