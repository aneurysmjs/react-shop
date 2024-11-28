import { describe, it, vi, expect } from 'vitest';
import { FC, useRef } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import useClickOutside from './useClickOutside';

interface Props {
  onClick: () => void;
}

const ClickOutside: FC<Props> = ({ onClick }) => {
  const ref = useRef<HTMLButtonElement | null>(null);

  useClickOutside(ref, onClick);

  return <button ref={ref}>Click me</button>;
};

/**
 * @see https://webman.pro/blog/how-to-detect-and-test-click-outside-in-react/
 */
describe('useClickOutside', () => {
  it('should call onClick() when clicking outside', () => {
    const onClick = vi.fn();
    render(<ClickOutside onClick={onClick} />);

    fireEvent.mouseDown(document.body);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should NOT call onClick() when clicking inside', () => {
    const onClick = vi.fn();
    render(<ClickOutside onClick={onClick} />);

    fireEvent.mouseDown(screen.getByText('Click me'));

    expect(onClick).not.toHaveBeenCalled();
  });
});
