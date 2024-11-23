'use client';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import React, { ReactNode } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      retry: 3,
      retryDelay: (attemptNumber) => attemptNumber * 1000,
      gcTime: 5 * 60 * 1000, // 5 minutes
      refetchInterval: 10 + 60 * 1000, // 10 minutes
    },
  },
});

const QueryClientWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryClientWrapper;
