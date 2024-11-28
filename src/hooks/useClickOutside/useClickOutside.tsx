import { useEffect, MutableRefObject } from 'react';

type Callback = (evt?: MouseEvent) => void;

/**
 *
 * @param ref Mutable ref.
 * @param onClickOutside Callback when clicking outside.
 *
 * @returns void
 */
export default function useClickOutside<T extends HTMLElement>(
  ref: MutableRefObject<null | T>,
  onClickOutside?: Callback,
) {
  /**
   * this is a bad implementation, click `outside` gets called when when clicking `inside`
   */
  // update cb on each render, so second useEffect has access to current value
  // useEffect(() => {
  //   callbackRef.current = callback;
  // });

  // useEffect(() => {
  //   const handleClick = (evt: MouseEvent) => {
  //     const node = evt.target as Node;
  //     if (ref.current && callbackRef.current && !ref.current.contains(node)) {
  //       callbackRef.current(evt);
  //     }
  //   };

  //   document.addEventListener('click', handleClick);

  //   return () => {
  //     document.removeEventListener('click', handleClick);
  //   };
  // }, [ref]); // no dependencies -> stable click listener

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const handleClickOutside = (evt: MouseEvent) => {
      if (onClickOutside && !ref.current?.contains(evt.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onClickOutside]);
}
