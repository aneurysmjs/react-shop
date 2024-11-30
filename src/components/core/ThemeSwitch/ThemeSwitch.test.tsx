import type { ReactElement, ReactNode } from 'react';
import { render, screen, fireEvent, type RenderResult } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import ThemeProvider from '@/providers/ThemeProvider';

import ThemeSwitch from './ThemeSwitch';

function renderWithThemeProvider(ui: ReactElement | ReactNode): RenderResult {
  return {
    ...render(
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {ui}
      </ThemeProvider>,
    ),
  };
}

describe('ThemeSwitch', () => {
  it('renders theme switch with theme as "system"', () => {
    renderWithThemeProvider(<ThemeSwitch />);

    const button = screen.getByRole('switch');

    expect(button).not.toBeChecked();
  });

  it('toggles theme between light and dark modes', () => {
    renderWithThemeProvider(<ThemeSwitch />);

    const button = screen.getByRole('switch');

    expect(button).not.toBeChecked(); // system

    fireEvent.click(button);

    expect(button).toBeChecked(); // dark

    fireEvent.click(button);

    expect(button).not.toBeChecked(); // light
  });
});
