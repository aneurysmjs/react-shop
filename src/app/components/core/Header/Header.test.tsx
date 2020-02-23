import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act, cleanup, render, RenderResult } from '@testing-library/react';
import alien from '~/store/config/alienStore/alien';
import { withProvider } from '~/store/config/alienStore/helpers/withProvider';
import { State } from '~/store/State';

import Header from './Header';

const store = alien<State>();

const Wrapper = withProvider(store);

const headerCSS = 'd-flex vw-100 justify-content-between border-bottom bg-white';

afterEach(cleanup);

let testRenderer = {} as RenderResult;

beforeEach(async () => {
  await act(async () => {
    testRenderer = render(
      <Wrapper>
        <Router>
          <Header />
        </Router>
      </Wrapper>,
    );
  });
});

describe('Header', () => {
  it(`tests header's basics`, async () => {
    const { container } = testRenderer;
    const header = container.firstChild as HTMLElement;

    expect(header.className).toEqual(headerCSS);
  });
});
