import { act, fireEvent, render, RenderResult } from '@testing-library/react';
import renderFromAlien from '~/shared/utils/testing/renderFromAlien';

import UserMenu from './index';

let testRenderer = {} as RenderResult;

// automatically unmount and cleanup DOM after the test is finished.
// afterEach(cleanup);

beforeEach(async () => {
  const { result, wrapper } = await renderFromAlien(UserMenu);
  const UserMenuComponent = result.current;

  // testRenderer = render(UserMenuComponent, { wrapper });
  await act(async () => {
    testRenderer = render(UserMenuComponent, { wrapper });
  });
});

describe('UserMenu', () => {
  it('should toggle <Sidebar /> when clicking icon', async () => {
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
    const { queryByRole } = testRenderer;
    const button = queryByRole('button') as HTMLButtonElement;

    expect(button.textContent).toBe('(0)');
  });
});
