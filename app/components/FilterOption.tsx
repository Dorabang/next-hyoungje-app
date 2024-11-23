import Link from 'next/link';
import { HiOutlinePencilSquare } from 'react-icons/hi2';

import { Status } from './StatusOptions';
import { User } from '@/stores/useAuthStore';

interface FilterOptionProps {
  user: User | null;
  selectedCategory: string;
  handleUpdateFilter: (status: Status) => void;
  pathname: string;
  type: 'community' | 'etc';
}

const FilterOption = ({
  user,
  selectedCategory,
  handleUpdateFilter,
  pathname,
  type,
}: FilterOptionProps) => {
  const filters: { key: Status; value: string }[] = [
    { key: 'all', value: '전체' },
    { key: 'sale', value: '판매 중' },
    { key: 'sold-out', value: '판매 완료' },
    { key: 'reservation', value: '예약 중' },
  ];
  const applyFilterRoutes = [
    'wild-market1',
    'wild-market2',
    'general-market',
    'natural-herb',
  ];

  const adminFilterRoutes = ['notice'];

  const isMarketRoute =
    applyFilterRoutes.filter((route) => route === pathname).length > 0;

  return (
    <ul
      className='flex justify-end items-center gap-4 pt-10 pb-5
      text-gray-500 text-sm'
    >
      {isMarketRoute &&
        filters.map((filter) => (
          <li
            key={filter.key}
            className={`cursor-pointer hover:text-gray-700 hover:font-medium hover:underline
          ${selectedCategory === filter.key ? 'text-gray-700' : ''}
          ${selectedCategory === filter.key ? 'font-medium' : ''}
          ${selectedCategory === filter.key ? 'underline' : ''}
          `}
            onClick={() => handleUpdateFilter(filter.key)}
          >
            {filter.value}
          </li>
        ))}
      {user &&
        adminFilterRoutes.filter((route) => route === pathname).length <= 0 && (
          <>
            {applyFilterRoutes.filter((route) => route === pathname).length >
              0 &&
              user && <li className='cursor-default'>|</li>}
            <li>
              <Link
                href={`${type === 'community' ? '/community' : ''}/edit/${pathname}`}
                className='text-grayColor-500 hover:text-grayColor-800 flex items-center transition-colors'
              >
                <HiOutlinePencilSquare size={18} className='mr-1' />
                글쓰기
              </Link>
            </li>
          </>
        )}
      {user &&
        adminFilterRoutes.filter((route) => route === pathname).length > 0 &&
        user.isAdmin && (
          <li>
            <Link
              href={`${type === 'community' ? '/community' : ''}/edit/${pathname}`}
              className='text-grayColor-500 hover:text-grayColor-800 flex items-center transition-colors'
            >
              <HiOutlinePencilSquare size={18} className='mr-1' />
              글쓰기
            </Link>
          </li>
        )}
    </ul>
  );
};

export default FilterOption;
