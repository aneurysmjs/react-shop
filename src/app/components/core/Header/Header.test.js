// @flow strict
import React from 'react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';
// $FlowFixMe
import { render } from '@testing-library/react';

import Header from './Header';

describe('Header', () => {
  it('tests header\'s basics', async () => {
    let testRenderer = {};

    await act(async () => {
      testRenderer = render(
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
