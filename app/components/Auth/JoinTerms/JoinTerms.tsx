import AgreeTerms from './AgreeTerms';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

const JoinTerms = () => {
  return (
    <Box
      sx={{
        height: 300,
        backgroundColor: '#f8f8f8',
        border: '1px solid #e8e8e8',
        color: '#222',
        overflowY: 'scroll',
        padding: '20px 40px',
        marginTop: '50px',
      }}
    >
      <Typography component={'div'}>
        <AgreeTerms />
      </Typography>
    </Box>
  );
};

export default JoinTerms;
