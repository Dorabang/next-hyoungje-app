'use client';
import React, { ReactNode } from 'react';
import {
  QueryClientProvider,
  QueryClient,
  isServer,
} from '@tanstack/react-query';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';

const makeQueryClient = () => {
  return new QueryClient({
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
};

let browserQueryClient: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
};

const Provider = ({ children }: { children: ReactNode }) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
    </QueryClientProvider>
  );
};

export default Provider;
