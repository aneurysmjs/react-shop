import { describe, expect, it } from 'vitest';
import { screen, waitFor } from '@testing-library/react';

import renderWithQueryClient from '@/utils/testUtils/renderWithQueryClient';
import Home from './Home';

describe('Home', () => {
  it.skip('should render products', async () => {
    renderWithQueryClient(<Home />);

    await waitFor(() => {
      const products = screen.getAllByTestId('product-item');

      expect(products).toHaveLength(3);
    });
  });
});
