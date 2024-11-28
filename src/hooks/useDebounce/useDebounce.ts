import { useRef, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';

const useDebounce = <T>(callback: (val?: T) => void, delay = 300): ((val?: T) => void) => {
  const ref = useRef<(val?: T) => void>();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = (val?: T) => {
      ref.current?.(val);
    };

    return debounce(func, delay);
  }, [delay]);

  return debouncedCallback;
};

export default useDebounce;
