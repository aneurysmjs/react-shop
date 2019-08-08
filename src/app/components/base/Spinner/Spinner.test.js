// @flow strict
import React from 'react';
// $FlowFixMe
import { render } from '@testing-library/react';

import Spinner from './Spinner';

describe('Spinner', () => {
  it('tests something', () => {
    const { container } = render(<Spinner />);
    const spinner = container.firstChild;
    expect(spinner.className).toEqual('spinner');
  });
});
