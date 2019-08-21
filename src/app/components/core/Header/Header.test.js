// @flow strict
import React from 'react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';

import renderWithRedux from '@/utils/testing/renderWithRedux';

import Header from './Header';

describe('Header', () => {
  it('tests header\'s basics', async () => {
    let testRenderer = {};

    await act(async () => {
      testRenderer = renderWithRedux(
        <Router>
          <Header />
        </Router>,
      );
    });
    const { container } = testRenderer;
    const header = container.firstChild;
    expect(header.className).toEqual('header');
  });
});
