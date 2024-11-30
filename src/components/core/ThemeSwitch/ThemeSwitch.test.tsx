import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import ThemeSwitch from './ThemeSwitch';

describe('ThemeSwitch', () => {
  it('renders theme switch', () => {
    render(<ThemeSwitch />);

    const button = screen.getByRole('switch');

    fireEvent.click(button);
  });
});
