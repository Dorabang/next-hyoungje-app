'use client';
import Edit from '@/components/Edit';
import { usePathname } from 'next/navigation';
import { useGetPost } from '@/hooks/queries/usePosts';

const DetailEditPage = ({ params: { id } }: { params: { id: string } }) => {
  const pathname = usePathname().trim().split('/')[1];
  const { data } = useGetPost(pathname, id);

  if (!data) return;

  return <Edit post={data} pathname={pathname} />;
};

export default DetailEditPage;
