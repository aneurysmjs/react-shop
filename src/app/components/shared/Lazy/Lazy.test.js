// @flow strict
import React from 'react';
// $FlowFixMe
import { render } from '@testing-library/react';

import Lazy from './Lazy';

describe('Lazy', () => {
  it('should have component\'s name as className', () => {
    const { container } = render(<Lazy />);
    const div = container.firstChild;
    expect(div.className).toEqual('lazy');
  });
});