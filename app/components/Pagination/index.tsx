import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface PaginationProp {
  totalPosts: number;
  limit: number;
  page: number;
  setPage: (page: number) => void;
}
const Pagination = ({ totalPosts, limit, page, setPage }: PaginationProp) => {
  const numPages =
    totalPosts % limit === 0
      ? totalPosts / limit
      : Math.floor(totalPosts / limit) + 1;

  return (
    <div className='w-full flex justify-center pt-[80px] pb-[100px]'>
      <div className='flex gap-2 [&_button]:p-2'>
        <button
          onClick={() => setPage(page === 1 ? page : page - 1)}
          className={`text-grayColor-300 ${
            page === 1 ? 'cursor-default' : 'hover:text-black'
          }`}
        >
          <div>
            <IoIosArrowBack size={16} />
          </div>
        </button>
        {Array.from(Array(numPages), (_, idx) => idx + 1).map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={`text-gray-500 ${
              page === i + 1
                ? 'font-semibold text-black'
                : 'text-sm hover:text-black'
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setPage(numPages === page ? numPages : page + 1)}
          className={`text-grayColor-300 transition-colors ${
            page === numPages ? 'cursor-default' : 'hover:text-black'
          }`}
        >
          <div>
            <IoIosArrowForward size={16} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
