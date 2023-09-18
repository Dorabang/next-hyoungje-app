import { Container } from '@mui/material';
import React from 'react';

const ContainerBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container
      maxWidth='xl'
      sx={{
        padding: '24px 0',
      }}
    >
      {children}
    </Container>
  );
};

export default ContainerBox;
