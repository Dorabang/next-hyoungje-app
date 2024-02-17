import { Container } from '@mui/material';
import React from 'react';

const ContainerBox = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Container
      maxWidth='xl'
      sx={{
        padding: { xs: '24px 10px', xl: '24px 0' },
      }}
    >
      <div className={`${className}`}>{children}</div>
    </Container>
  );
};

export default ContainerBox;
