import { BsArrowUpRight } from 'react-icons/bs';

const Skeleton = () => {
  return (
    <div className='min-h-[200px] flex flex-col gap-8 bg-grayColor-300 rounded-md px-5 py-4 w-[calc((100%-20px)/2)] md:w-[calc((100%-40px)/3)] xl:w-[calc((100%-80px)/5)]'>
      <div className='flex justify-between'>
        <div className='w-16 h-16 rounded-full overflow-hidden relative bg-grayColor-200 animate-pulse' />
        <div>
          <span className='p-2 inline-block'>
            <BsArrowUpRight className='text-grayColor-100' />
          </span>
        </div>
      </div>

      <div className='flex flex-col gap-3'>
        <div className='w-20 h-4 bg-grayColor-200 animate-pulse' />
        <div className={`h-8 w-full bg-grayColor-200 animate-pulse`} />
      </div>
    </div>
  );
};

export default Skeleton;
