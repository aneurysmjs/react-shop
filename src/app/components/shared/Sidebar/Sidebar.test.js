// @flow strict
import React from 'react';
// $FlowFixMe
import { render } from '@testing-library/react';

import Sidebar from './Sidebar';

describe('Sidebar', () => {
  it('should have component\'s name as className', () => {
    const { container } = render(<Sidebar />);
    const div = container.firstChild;
    expect(div.className).toEqual('sidebar');
  });
});
