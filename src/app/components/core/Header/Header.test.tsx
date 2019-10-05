/* eslint-disable prettier/prettier */
import React from 'react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter as Router } from 'react-router-dom';

import renderWithRedux, { RenderWithRedux } from '~/shared/utils/testing/renderWithRedux';

import Header from './Header';

const headerCSS = 'd-flex vw-100 justify-content-between border-bottom bg-white';
describe('Header', () => {
  it('tests header\'s basics', async () => {
    let testRenderer = {} as RenderWithRedux;

    await act(async () => {
      testRenderer = renderWithRedux(
        <Router>
          <Header />
        </Router>,
      );
    });
    const { container } = testRenderer;
    const header = container.firstChild as HTMLElement;

    expect(header.className).toEqual(headerCSS);
  });
});
