import PostFormat from '@/components/Posts/PostFormat';
import { PageParams } from '@/constant/type';

const BoardPage = async ({ params }: { params: PageParams }) => {
  const { menu } = await params;
  return <PostFormat pathname={menu} />;
};

export default BoardPage;
