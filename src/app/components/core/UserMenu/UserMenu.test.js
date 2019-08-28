import React from 'react';
import { act } from 'react-dom/test-utils';
// $FlowFixMe
import { fireEvent } from '@testing-library/react';

import renderWithRedux from '@/utils/testing/renderWithRedux';

import UserMenu from './UserMenu';

describe('UserMenu', () => {
  it('should toggle <Sidebar /> when clicking icon', async () => {
    let testRenderer = {};

    await act(async () => {
      testRenderer = renderWithRedux(<UserMenu />);
    });

    const { queryByRole, queryByTestId } = testRenderer;
    const button = queryByRole('button');
    const sidebar = queryByTestId('sidebar');

    expect(sidebar).toBe(null);

    await act(async () => {
      fireEvent.click(button);
    });

    const sidebarOpened = queryByTestId('sidebar');

    expect(sidebarOpened).not.toBe(null);

    await act(async () => {
      fireEvent.click(button);
    });

    const sidebarClosed = queryByTestId('sidebar');

    expect(sidebarClosed).toBe(null);
  });

  it('should display cart\'s quantity', async () => {
    let testRenderer = {};

    await act(async () => {
      testRenderer = renderWithRedux(<UserMenu />);
    });

    const { queryByRole } = testRenderer;
    const button = queryByRole('button');

    expect(button.textContent).toBe('(0)');
  });
});
