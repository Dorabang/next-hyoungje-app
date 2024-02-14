import { routes } from "@/constant/Routes";

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
  members?: boolean;
  depth: { name?: string; path?: string }[];
}

interface pagesTypes extends Array<pagesType> {}

export const PagesRoutes: pagesTypes = [
  {
    name: livingVegetable.name,
    path: livingVegetable.path,
    depth: livingVegetable.depth1,
  },
  { name: generalMarketplace.name, path: generalMarketplace.path, depth: [] },
  { name: naturalHerbs.name, path: naturalHerbs.path, depth: [] },
  {
    name: singleLeaf.name,
    path: singleLeaf.path,
    members: singleLeaf.members,
    depth: [],
  },
  { name: community.name, path: community.path, depth: community.depth1 },
];
