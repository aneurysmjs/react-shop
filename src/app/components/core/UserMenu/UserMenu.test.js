// @flow strict
import React from 'react';
import { act } from 'react-dom/test-utils';
// $FlowFixMe
import { fireEvent, render } from '@testing-library/react';

import UserMenu from './UserMenu';

describe('UserMenu', () => {
  it('should call \'onClick\' prop', async () => {
    const mockOnClick = jest.fn();
    let testRenderer = {};
    await act(async () => {
      testRenderer = render(<UserMenu onClick={mockOnClick} />);
    });
    const { queryByRole } = testRenderer;
    const button = queryByRole('button');
    fireEvent.click(button);
    expect(mockOnClick.mock.calls.length).toBe(1);
  });
});
