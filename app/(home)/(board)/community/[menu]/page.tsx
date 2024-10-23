import PostFormat from '@/components/Posts/PostFormat';
import OkdongPage from '@/components/Community/okdong';
import { PageParams } from '@/constant/type';

const BoardPage = async ({ params }: { params: PageParams }) => {
  const { menu } = await params;
  if (menu === 'okdong') return <OkdongPage />;
  return <PostFormat pathname={menu} />;
};

export default BoardPage;
