import type { ReactElement, ReactNode } from 'react';
import { QueryClient, QueryClientProvider, type QueryClientConfig } from '@tanstack/react-query';

import { render, type RenderResult } from '@testing-library/react';

const defaultQueryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      // ✅ turns retries off
      retry: false,
    },
  },
};

export default function renderWithQueryClient(
  ui: ReactElement | ReactNode,
  queryClientConfig: QueryClientConfig = defaultQueryClientConfig,
): RenderResult {
  const queryClient = new QueryClient(queryClientConfig);

  return {
    ...render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>),
  };
}
