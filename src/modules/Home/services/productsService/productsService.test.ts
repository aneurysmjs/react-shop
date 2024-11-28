import { expect, it, vi, describe, afterEach, type Mocked } from 'vitest';

import api from '@/services/api';

import podcastMockData from './productsMockData';
import { getProducts } from './productsService';

vi.mock('@/services/api');

const mockApi = api as Mocked<typeof api>;

describe('productsService', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('getProducts', () => {
    it('resolves products data', async () => {
      mockApi.get.mockResolvedValue(podcastMockData);
      const response = await getProducts();

      expect(response).toStrictEqual(podcastMockData);
    });

    it('rejects due bad request', async () => {
      const networkError = new Error('Network Error');
      mockApi.get.mockRejectedValue(networkError);

      await expect(getProducts()).rejects.toStrictEqual(networkError);
    });
  });
});
