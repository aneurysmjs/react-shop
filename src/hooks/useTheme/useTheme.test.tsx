import { describe, it, expect } from 'vitest';
import { act } from 'react';
import { renderHook } from '@testing-library/react';

import useTheme from './useTheme';

import '@/utils/testUtils/mockMatchMedia';

describe('useTheme', () => {
  it('should toggle between "dark" and "light" classes', () => {
    const { result } = renderHook(() => useTheme());

    const [themeV1, toggleTheme] = result.current;

    expect(themeV1).toBe('light');
    expect(document.documentElement.classList.value).toBe('light');

    act(() => {
      toggleTheme();
    });

    const [themeV2] = result.current;

    expect(themeV2).toBe('dark');
    expect(document.documentElement.classList.value).toBe('dark');

    act(() => {
      toggleTheme();
    });

    const [themeV3] = result.current;

    expect(themeV3).toBe('light');
    expect(document.documentElement.classList.value).toBe('light');
  });
});
