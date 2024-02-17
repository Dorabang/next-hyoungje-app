"use client";
import React, { useEffect, useState } from "react";
import { routes } from "@/constant/Routes";
import Link from "next/link";

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
    name: livingVegetable.depth1[0].name,
    path: livingVegetable.depth1[0].path,
  },
  {
    name: livingVegetable.depth1[1].name,
    path: livingVegetable.depth1[1].path,
  },
  { name: generalMarketplace.name, path: generalMarketplace.path },
  { name: naturalHerbs.name, path: naturalHerbs.path },
  {
    name: singleLeaf.name,
    path: singleLeaf.path,
  },
  {
    name: community.name,
    path: community.path,
  },
  {
    name: community.depth1[0].name,
    path: community.depth1[0].path,
  },
  {
    name: community.depth1[1].name,
    path: community.depth1[1].path,
  },
  {
    name: community.depth1[2].name,
    path: community.depth1[2].path,
  },
  {
    name: community.depth1[3].name,
    path: community.depth1[3].path,
  },
  {
    name: community.depth1[4].name,
    path: community.depth1[4].path,
  },
  {
    name: community.depth1[5].name,
    path: community.depth1[5].path,
  },
];

const Breadcrumbs = ({ pathname }: { pathname: string }) => {
  /**
   * @pathname 을 props로 받아와 route에서 동일한 path를 필터링
   *
   * @return pathname과 동일한 path를 routes에서 찾아 breadcrumbs를 반환
   */

  const [currentPage, setCurrentPage] = useState<pagesType>();

  useEffect(() => {
    const findPage = pages.filter((page) => page.path.includes(pathname));

    findPage && setCurrentPage(findPage[0]);
  }, [pathname]);

  return (
    <ul className="flex gap-2 py-2 text-gray-500 text-sm">
      <li className="hover:underline">
        <Link href="/">Home</Link>
      </li>
      <li className="cursor-default">{">"}</li>
      <li className="hover:underline">
        <Link href={currentPage?.path ? currentPage?.path : "/"}>
          {currentPage?.name}
        </Link>
      </li>
    </ul>
  );
};

export default Breadcrumbs;
