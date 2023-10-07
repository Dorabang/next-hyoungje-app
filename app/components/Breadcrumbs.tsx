'use client';
import React, { useEffect, useState } from 'react';
import { routes } from '@/components/Nav/Constants';
import Link from 'next/link';

const {
  livingVegetable,
  generalMarketplace,
  naturalHerbs,
  singleLeaf,
  community,
} = routes;

interface pagesType {
  name: string;
  path: string;
}
[];

interface pagesTypes extends Array<pagesType> {}

const pages: pagesTypes = [
  {
    name: livingVegetable.name,
    path: livingVegetable.path,
  },
  { name: generalMarketplace.name, path: generalMarketplace.path },
  { name: naturalHerbs.name, path: naturalHerbs.path },
  {
    name: singleLeaf.name,
    path: singleLeaf.path,
  },
  { name: community.name, path: community.path },
];

const Breadcrumbs = ({ pathname }: { pathname: string }) => {
  /**
   * @pathname 을 props로 받아와 route에서 동일한 path를 필터링
   *
   * @return pathname과 동일한 path를 routes에서 찾아 breadcrumbs를 반환
   */

  const [currentPage, setCurrentPage] = useState<pagesType>();

  useEffect(() => {
    const findPage = pages.filter((page: pagesType) => page.path === pathname);

    findPage && setCurrentPage(findPage[0]);
  }, [pathname]);

  return (
    <ul className='flex gap-2 py-2 text-gray-500 text-sm'>
      <li className='hover:underline'>
        <Link href='/'>Home</Link>
      </li>
      <li className='cursor-default'>{'>'}</li>
      <li className='hover:underline'>
        <Link href={currentPage?.path ? currentPage?.path : '/'}>
          {currentPage?.name}
        </Link>
      </li>
    </ul>
  );
};

export default Breadcrumbs;
