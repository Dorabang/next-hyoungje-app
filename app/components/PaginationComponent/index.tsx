import { Stack } from '@mui/material';
import Pagination from '@mui/material/Pagination';

interface PaginationProp {
  totalPosts: number;
  limit: number;
  page: number;
  setPage: (page: number) => void;
}

const PaginationComponets = ({
  totalPosts,
  limit,
  page,
  setPage,
}: PaginationProp) => {
  const numPages =
    totalPosts % limit === 0
      ? totalPosts / limit
      : Math.floor(totalPosts / limit) + 1;

  const handlePageUpDown = (e: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };
  return (
    <Stack
      direction={'row'}
      justifyContent={'center'}
      sx={{ padding: '40px 0' }}
    >
      <Pagination page={page} count={numPages} onChange={handlePageUpDown} />
    </Stack>
  );
};

export default PaginationComponets;
