import { cleanup, render, RenderResult } from '@testing-library/react';

import renderFromAlien from '~/shared/utils/testing/renderFromAlien';
import Home from './index';

afterEach(cleanup);

let testRenderer = {} as RenderResult;

beforeEach(async () => {
  const { result, wrapper } = await renderFromAlien(Home);
  const HomeComponent = result.current;

  testRenderer = render(HomeComponent, { wrapper });
});

describe.skip('Home', () => {
  it('should display products', async () => {
    const { queryAllByTestId } = testRenderer;
    const productCards = queryAllByTestId('product-card-item');

    expect(productCards.length).toBe(3);
  });
});
