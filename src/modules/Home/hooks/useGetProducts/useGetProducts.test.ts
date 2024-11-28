import { describe, expect, it, vi, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';

import { WithQueryWrapper } from '@/utils/testUtils/renderWithQueryClient';
import podcastMockData from '@/modules/home/services/productsService/productsMockData';

import useGetProducts from './useGetProducts';

const { mockGetProducts } = vi.hoisted(() => ({
  mockGetProducts: vi.fn(),
}));

vi.mock('@/modules/Home/services/productsService', () => ({
  getProducts: mockGetProducts,
}));

describe('useGetProducts', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return a podcast list', async () => {
    mockGetProducts.mockResolvedValue(podcastMockData);

    const { result } = renderHook(() => useGetProducts(), {
      wrapper: WithQueryWrapper,
    });

    expect(mockGetProducts).toHaveBeenCalled();
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.data).toStrictEqual(podcastMockData);
      expect(result.current.isLoading).toBe(false);
    });
  });
});
