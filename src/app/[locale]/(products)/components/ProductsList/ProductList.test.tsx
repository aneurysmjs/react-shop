import { screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import ProductsList from './ProductsList';
import { products } from '@/app/[locale]/(products)//services/productsMockData';
import renderWithIntlProvider from '@/utils/testing/renderWithIntlProvider';

const { mockGetProducts } = vi.hoisted(() => ({
  mockGetProducts: vi.fn(),
}));

vi.mock('@/app/[locale]/(products)/services/productsService', () => ({
  getProducts: mockGetProducts,
}));

describe('ProductsList component', () => {
  it('renders data from API call', async () => {
    mockGetProducts.mockResolvedValue({ data: products });

    const ui = await ProductsList({});

    renderWithIntlProvider(ui);

    const productCards = screen.getAllByLabelText('product card');

    expect(productCards).toHaveLength(3);
  });
});
