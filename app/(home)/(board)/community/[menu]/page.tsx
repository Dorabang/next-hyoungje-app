import PostFormat from '@/components/Posts/PostFormat';
import OkdongPage from '@/components/Community/okdong';

const BoardPage = ({ params: { menu } }: { params: { menu: string } }) => {
  if (menu === 'okdong') return <OkdongPage />;
  return <PostFormat pathname={menu} />;
};

export default BoardPage;
