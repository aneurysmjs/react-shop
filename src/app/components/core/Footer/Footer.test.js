import React from 'react';
// $FlowFixMe
import { cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import renderWithRedux from '@/shared/utils/testing/renderWithRedux';

import Footer from './Footer';

afterEach(cleanup);

describe('Footer test', () => {
  it('should have only one social network', async () => {
    let testRenderer = {};
    await act(async () => {
      testRenderer = renderWithRedux(<Footer />);
    });
    const { getByTestId } = testRenderer;
    const social = getByTestId('social');
    expect(social.children.length).toBe(1);
  });

  it('should copyright text properly', async () => {
    let testRenderer = {};

    await act(async () => {
      testRenderer = renderWithRedux(<Footer />);
    });
    const { getByTestId } = testRenderer;
    const copyright = getByTestId('copyright');
    expect(copyright.textContent).toBe('Copyright © 2019. All Rights Reserved');
  });
});
