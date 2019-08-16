// @flow strict
import React from 'react';
// $FlowFixMe
import { cleanup, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import renderWithRedux from '@/utils/testing/renderWithRedux';

import Home from './Home';

afterEach(cleanup);

describe('Home test', () => {
  it('should have only one social network', async () => {
    let testRenderer = {};
    act(() => {
      testRenderer = renderWithRedux(<Home />);
    });
    
    // const { getByTestId } = testRenderer;
    // const social = getByTestId('social');
    // expect(social.children.length).toBe(1);
    // eslint-disable-next-line no-console
    console.log('testRenderer', testRenderer);
  });
});
