'use client';
import useRedirect from '@/hooks/useRedirect';
import PostsFormatWrapper from '@/components/Posts/PostsFormatWrapper';

const SingleLeafPage = () => {
  useRedirect();

  return <PostsFormatWrapper />;
};

export default SingleLeafPage;
