import { Container } from '@mui/material';
import React from 'react';

const ContainerBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container
      maxWidth='xl'
      sx={{
        padding: { xs: '24px 10px', xl: '24px 0' },
      }}
    >
      {children}
    </Container>
  );
};

export default ContainerBox;
