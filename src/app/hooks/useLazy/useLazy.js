// @flow strict
import { useState, useEffect } from 'react';

const useLazy = (
  getModule: () => Promise<*>,
  cond?: boolean = false,
) => {
  const [AsyncModule, setAsyncModule] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        if (!cond) {
          return;
        }
        const module = await getModule();
        setAsyncModule(() => module.default);
      } catch (err) {
        throw new Error(`LazyComponent error: ${err}`);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cond]);

  return AsyncModule;
};

export default useLazy;
