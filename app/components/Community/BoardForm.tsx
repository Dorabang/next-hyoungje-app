import Link from 'next/link';
import { DocumentData } from 'firebase/firestore';
import { AiOutlinePlus } from 'react-icons/ai';

const BoardForm = ({
  data,
  title,
  path,
}: {
  data: DocumentData[];
  title: string;
  path: string;
}) => {
  return (
    <>
      {/*  */}
      <div className='flex justify-between'>
        <h3 className='font-semibold'>{title}</h3>
        <Link href={path}>
          <AiOutlinePlus
            size={24}
            className='text-grayColor-300 hover:text-grayColor-500 transition-colors'
          />
        </Link>
      </div>

      {data &&
        data.map((item) => (
          <div key={item.id} className='w-full'>
            {item.title}
          </div>
        ))}
    </>
  );
};

export default BoardForm;
