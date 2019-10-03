import { useState, useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Module = { default: any };
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const useLazy = (getModule: () => Promise<Module>, cond? = false): React.ReactElement | null => {
  const [AsyncModule, setAsyncModule] = useState(null);
  useEffect(() => {
    (async (): Promise<void> => {
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
