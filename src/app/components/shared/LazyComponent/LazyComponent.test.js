// @flow strict
import React from 'react';
// $FlowFixMe
import { render } from '@testing-library/react';

import LazyComponent from './LazyComponent';

const Example = () => <div> Some Component </div>;

describe('LazyComponent', () => {
  it('should have component\'s name as className', () => {
    const { container } = render(
      <LazyComponent getModule={() => Promise.resolve({ default: Example })} />,
    );
    const div = container.firstChild;
    expect(div).toEqual(null);
  });
});
