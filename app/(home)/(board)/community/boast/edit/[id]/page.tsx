'use client';

import CommEdit from '@/components/Community/CommEdit';
import { useGetPost } from '@/hooks/queries/usePosts';
import { usePathname } from 'next/navigation';

const ModifyPostPage = ({ params: { id } }: { params: { id: string } }) => {
  const pathname = usePathname().split('/')[2];
  const { data } = useGetPost(pathname, id);

  if (!data) return;
  return <CommEdit post={data} pathname={pathname} />;
};

export default ModifyPostPage;
