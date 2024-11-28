import { describe, vi, expect, it } from 'vitest';
import { render, fireEvent } from '@testing-library/react';

import Switch from './Switch';

describe('Switch', () => {
  it('should call "clickOutsideSpy" when element is clicked ouside', () => {
    let isOn = false;

    const toggleSpy = vi.fn(() => {
      isOn = !isOn;
    });

    const { getByTestId, rerender } = render(<Switch toggle={toggleSpy} isOn={isOn} />);

    const button = getByTestId('toggle');

    fireEvent.click(button);

    rerender(<Switch toggle={toggleSpy} isOn={isOn} />);

    expect(isOn).toBe(true);

    fireEvent.click(button);

    rerender(<Switch toggle={toggleSpy} isOn={isOn} />);

    expect(isOn).toBe(false);
  });
});
