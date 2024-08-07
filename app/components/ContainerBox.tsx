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
        padding: '24px 20px',
        width: '100%',
        height: '100%',
      }}
    >
      <div className={`pb-[80px] ${className}`}>{children}</div>
    </Container>
  );
};

export default ContainerBox;
