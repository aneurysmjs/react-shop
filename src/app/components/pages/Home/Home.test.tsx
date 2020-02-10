import React from 'react';
import { act } from 'react-dom/test-utils';

import renderWithRedux from '~/shared/utils/testing/renderWithRedux';

import Home from './Home';

describe.skip('Home', () => {
  it('should display products', async () => {
    let testRenderer = {};

    await act(async () => {
      testRenderer = renderWithRedux(<Home />);
    });

    const { queryAllByTestId } = testRenderer;
    const productCards = queryAllByTestId('product-card-item');

    expect(productCards.length).toBe(3);
  });
});
