import { Stack } from '@mui/material';
import Pagination from '@mui/material/Pagination';

interface PaginationProp {
  totalPages: number;
  page: number;
  setPage: (page: number) => void;
}

const PaginationComponets = ({ totalPages, page, setPage }: PaginationProp) => {
  const handlePageUpDown = (_: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };
  return (
    <Stack
      direction={'row'}
      justifyContent={'center'}
      sx={{ padding: '40px 0' }}
    >
      <Pagination page={page} count={totalPages} onChange={handlePageUpDown} />
    </Stack>
  );
};

export default PaginationComponets;
