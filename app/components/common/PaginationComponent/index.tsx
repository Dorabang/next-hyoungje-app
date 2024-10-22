import { Stack } from '@mui/material';
import Pagination from '@mui/material/Pagination';

interface PaginationProp {
  totalPages: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  handlePageUpDown?: (page: number) => void;
}

const PaginationComponets = ({
  totalPages,
  page,
  setPage,
  handlePageUpDown,
}: PaginationProp) => {
  const onChange = (_: React.ChangeEvent<unknown>, page: number) => {
    handlePageUpDown && handlePageUpDown(page);
    setPage(page);
  };
  return (
    <Stack
      direction={'row'}
      justifyContent={'center'}
      sx={{ padding: '40px 0' }}
    >
      <Pagination page={page} count={totalPages} onChange={onChange} />
    </Stack>
  );
};

export default PaginationComponets;
