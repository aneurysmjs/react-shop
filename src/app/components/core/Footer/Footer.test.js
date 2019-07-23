// @flow strict
import React from 'react';
// $FlowFixMe
import { cleanup } from '@testing-library/react';

import renderWithRedux from '@/utils/testing/renderWithRedux';

import Footer from './Footer';

afterEach(cleanup);

describe('Footer test', () => {
  it('should have only one social network', () => {
    // eslint-disable-next-line no-unused-vars
    const { getByTestId } = renderWithRedux(<Footer />);
    const social = getByTestId('social');
    expect(social.children.length).toBe(1);
  });

  it('should copyright text properly', () => {
    const { getByTestId } = renderWithRedux(<Footer />);
    const copyright = getByTestId('copyright');
    expect(copyright.textContent).toBe('Copyright © 2019. All Rights Reserved');
  });
});
