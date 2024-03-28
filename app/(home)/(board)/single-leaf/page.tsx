'use client';
import PostFormat from '@/components/Posts/PostFormat';
import useRedirect from '@/hooks/useRedirect';

const SingleLeafPage = () => {
  useRedirect();

  return <PostFormat />;
};

export default SingleLeafPage;
