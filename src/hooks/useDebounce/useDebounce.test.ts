import { expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';

import useDebounce from './useDebounce';

vi.useFakeTimers();

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should debounce the callback function', () => {
    const callback = vi.fn();
    const delay = 500;

    const { result } = renderHook(() => useDebounce(callback, delay));

    // Call the debounced callback multiple times
    result.current();
    result.current();
    result.current();

    // Fast-forward the timers so that the debounced callback should have been called
    vi.runAllTimers();

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
