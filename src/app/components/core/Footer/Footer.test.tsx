import { cleanup, render, RenderResult, act } from '@testing-library/react';

import renderFromAlien from '~/shared/utils/testing/renderFromAlien';
import Footer from './index';

afterEach(cleanup);

let testRenderer = {} as RenderResult;

beforeEach(async () => {
  const { result, wrapper } = await renderFromAlien(Footer);
  const FooterComponent = result.current;

  await act(async () => {
    testRenderer = render(FooterComponent, { wrapper });
  });
});

describe('Footer test', () => {
  it('should have only one social network', async () => {
    const { getByTestId } = testRenderer;
    const social = getByTestId('social');
    expect(social.children.length).toBe(1);
  });

  it('should copyright text properly', async () => {
    const { getByTestId } = testRenderer;
    const copyright = getByTestId('copyright');
    expect(copyright.textContent).toBe('Copyright © 2020. All Rights Reserved');
  });
});
