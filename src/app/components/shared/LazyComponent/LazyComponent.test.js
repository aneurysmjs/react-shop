// @flow strict
import React from 'react';
import { act } from 'react-dom/test-utils';
// $FlowFixMe
import { render } from '@testing-library/react';

import LazyComponent from './LazyComponent';

const Example = () => <div>Some Component</div>;

describe('LazyComponent', () => {
  it('should have component\'s name as className', async () => {
    let testRenderer = {};

    await act(async () => {
      testRenderer = render(
        <LazyComponent getModule={() => Promise.resolve({ default: Example })} />,
      );
    });
    const { container } = testRenderer;
    const div = container.firstChild;

    expect(div.textContent).toEqual('Some Component');
  });
});
