import type { ReactElement, ReactNode, PropsWithChildren, FC } from 'react';
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

interface WithQueryWrapperProps extends PropsWithChildren {
  queryClientConfig?: QueryClientConfig;
}

export const WithQueryWrapper: FC<WithQueryWrapperProps> = ({
  children,
  queryClientConfig = defaultQueryClientConfig,
}) => {
  const queryClient = new QueryClient(queryClientConfig);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default function renderWithQueryClient(
  ui: ReactElement | ReactNode,
  queryClientConfig: QueryClientConfig = defaultQueryClientConfig,
): RenderResult {
  return {
    ...render(<WithQueryWrapper queryClientConfig={queryClientConfig}>{ui}</WithQueryWrapper>),
  };
}
