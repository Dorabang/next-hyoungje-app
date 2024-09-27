'use client';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import React, { ReactNode } from 'react';

const queryClient = new QueryClient();

const QueryClientWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryClientWrapper;
