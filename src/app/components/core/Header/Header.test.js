// @flow strict
import React from 'react';
// $FlowFixMe
import { render } from '@testing-library/react';

import Header from './Header';

describe('Header', () => {
  it('tests something', () => {
    const { container } = render(<Header />);
    const header = container.firstChild;
    expect(header.className).toEqual('header');
  });
});
