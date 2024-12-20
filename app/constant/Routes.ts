export const livingVegetable = [
  { link: '/wild-market1', name: '산채품장터1' },
  { link: '/wild-market2', name: '산채품장터2' },
];

export const community = [
  { link: '/community/okdong', name: '난원소개' },
  { link: '/community/notice', name: '공지사항' },
  { link: '/community/qna', name: '문의사항' },
  { link: '/community/wild-catch', name: '산채기' },
  { link: '/community/boast', name: '난자랑' },
  { link: '/community/board', name: '자유게시판' },
];

export const routes = {
  home: { path: '/', name: '홈' },
  login: { path: '/login', name: '로그인' },
  join: { path: '/account', name: '회원가입' },
  livingVegetable: {
    path: '/wild-market1',
    name: '산채품장터',
    depth1: [
      { path: '/wild-market1', name: '산채품장터1' },
      { path: '/wild-market2', name: '산채품장터2' },
    ],
  },
  generalMarketplace: {
    path: '/general-market',
    name: '일반장터',
  },
  naturalHerbs: { path: '/natural-herb', name: '자연산약초' },
  singleLeaf: { path: '/single-leaf', name: '단엽산채기', members: true },
  community: {
    path: '/community',
    name: '커뮤니티',
    depth1: [
      { path: '/community/okdong', name: '난원소개' },
      { path: '/community/notice', name: '공지사항' },
      { path: '/community/qna', name: '문의사항' },
      { path: '/community/wild-catch', name: '산채기' },
      { path: '/community/boast', name: '난자랑' },
      { path: '/community/board', name: '자유게시판' },
    ],
  },
  bookmark: { path: '/bookmark', name: '즐겨찾기', members: true },
  myPage: { path: '/mypage', name: '마이페이지', members: true },
  writePage: { path: '/edit', name: '글쓰기', members: true },
};

export const allRoutes = [
  { link: '/wild-market1', name: '산채품장터1' },
  { link: '/wild-market2', name: '산채품장터2' },
  { link: '/general-market', name: '일반장터' },
  { link: '/natural-herb', name: '자연산약초' },
  { link: '/single-leaf', name: '단엽산채기' },
  { link: '/community/okdong', name: '난원소개' },
  { link: '/community/notice', name: '공지사항' },
  { link: '/community/qna', name: '문의사항' },
  { link: '/community/wild-catch', name: '산채기' },
  { link: '/community/boast', name: '난자랑' },
  { link: '/community/board', name: '자유게시판' },
];
