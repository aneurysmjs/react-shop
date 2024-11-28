import { describe, test, it, expect } from 'vitest';
import { screen } from '@testing-library/react';

import withUserSetup from '@/utils/testUtils/withUserSetup';
import LangsDropdown from './LangsDropdown';

describe('LangsDropdown', () => {
  test(`dropdown's toggle should default to "en" as textContent`, () => {
    withUserSetup(<LangsDropdown />);

    const dropdownToggle = screen.getByTestId('dropdown-toggle');

    expect(dropdownToggle.textContent).toContain('en');
  });

  it('should display dropdown when toggle', async () => {
    const { user } = withUserSetup(<LangsDropdown />);

    const dropdownToggle = screen.getByTestId('dropdown-toggle');

    const itemsEmpty = screen.queryAllByTestId('dropdown-item');

    expect(itemsEmpty).toHaveLength(0);

    // act
    await user.click(dropdownToggle);

    const itemsOpened = screen.queryAllByTestId('dropdown-item').map((i) => i.textContent);

    expect(itemsOpened).toHaveLength(2);

    expect(itemsOpened).toMatchInlineSnapshot(`
      [
        "ru",
        "es",
      ]
    `);

    // act
    await user.click(dropdownToggle);

    const itemsClosed = screen.queryAllByTestId('dropdown-item');

    expect(itemsClosed).toHaveLength(0);

    // act
    await user.click(dropdownToggle);

    expect(screen.queryAllByTestId('dropdown-item')).toHaveLength(2);
  });

  test('dropdown menu should set language', async () => {
    const { user } = withUserSetup(<LangsDropdown />);

    const dropdownToggle = screen.getByTestId('dropdown-toggle');

    expect(dropdownToggle.textContent).toContain('en');
    expect(screen.queryAllByTestId('dropdown-item')).toHaveLength(0);

    // act- open dropdown
    await user.click(dropdownToggle);

    const dropdownEn = screen.queryAllByTestId('dropdown-item');

    expect(dropdownEn.map((i) => i.textContent)).not.toContain('en');
    expect(dropdownEn).toHaveLength(2);

    const buttonRU = screen.getByText('ru');

    // act- set lang to ru
    await user.click(buttonRU);

    expect(buttonRU.textContent).toContain('ru');
    expect(screen.queryAllByTestId('dropdown-item')).toHaveLength(0);

    // act - open dropdown
    await user.click(screen.getByTestId('dropdown-toggle'));

    const dropdownRu = screen.queryAllByTestId('dropdown-item');

    expect(dropdownRu.map((i) => i.textContent)).not.toContain('ru');
    expect(dropdownRu).toHaveLength(2);

    const buttonES = screen.getByText('es');

    // act - set lang to es
    await user.click(buttonES);

    expect(buttonES.textContent).toContain('es');
    expect(screen.queryAllByTestId('dropdown-item')).toHaveLength(0);

    // act - open dropdown
    await user.click(screen.getByTestId('dropdown-toggle'));

    const dropdownEs = screen.queryAllByTestId('dropdown-item');

    expect(dropdownEs.map((i) => i.textContent)).not.toContain('es');
    expect(dropdownEs).toHaveLength(2);
  });
});
