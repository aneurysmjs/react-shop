import React from 'react';
import { act } from 'react-dom/test-utils';

import { fireEvent } from '@testing-library/react';

import renderWithRedux, { RenderWithRedux } from '~/shared/utils/testing/renderWithRedux';

import UserMenu from './UserMenu';

describe('UserMenu', () => {
  it('should toggle <Sidebar /> when clicking icon', async () => {
    let testRenderer = {} as RenderWithRedux;

    await act(async () => {
      testRenderer = renderWithRedux(<UserMenu />);
    });

    const { queryByRole, queryByTestId } = testRenderer;
    const button = queryByRole('button') as HTMLButtonElement;
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

  // eslint-disable-next-line prettier/prettier
  it('should display cart\'s quantity', async () => {
    let testRenderer = {} as RenderWithRedux;

    await act(async () => {
      testRenderer = renderWithRedux(<UserMenu />);
    });

    const { queryByRole } = testRenderer;
    const button = queryByRole('button') as HTMLButtonElement;

    expect(button.textContent).toBe('(0)');
  });
});
