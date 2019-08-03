// @flow strict
import React from 'react';
// $FlowFixMe
import { render } from '@testing-library/react';

import LazyComponent from './LazyComponent';

describe('LazyComponent', () => {
  it('should have component\'s name as className', () => {
    const { container } = render(<LazyComponent />);
    const div = container.firstChild;
    expect(div.className).toEqual('lazy');
  });
});
