'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type Props = {
  children: React.ReactNode;
};

const TanStackProvider = ({ children }: Props) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 10 * 1000, // ✅ 10 seconds
            gcTime: 5 * 60 * 1000, // ✅ 5 minutes (formerly cacheTime)
            retry: 1, // ✅ Limit retries
            refetchOnWindowFocus: false, // ✅ Don't refetch on window focus
            refetchOnMount: false, // ✅ Don't refetch on mount
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default TanStackProvider;
