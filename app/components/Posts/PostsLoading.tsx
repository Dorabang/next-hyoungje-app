const PostsLoading = () => {
  return (
    <li className='py-3 h-52 flex justify-center items-center'>
      <p className='text-neutral-500 flex gap-2 items-center'>
        <span
          className='inline-block
            border-[3px] border-[#ddd] border-l-[#333]
            rounded-full w-[20px] h-[20px] animate-spin'
        ></span>
        Loading...
      </p>
    </li>
  );
};

export default PostsLoading;
