import PostFormat from '@/components/Posts/PostFormat';

const BoardPage = ({ params: { menu } }: { params: { menu: string } }) => {
  return <PostFormat pathname={menu} />;
};

export default BoardPage;
