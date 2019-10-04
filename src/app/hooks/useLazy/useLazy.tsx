import { useState, useEffect } from 'react';

/**
 * @link https://stackoverflow.com/questions/52112948/whats-the-return-type-of-a-dynamic-import
 */
type DynamicImport = () => Promise<{ default: React.ComponentType<{}> | React.ElementType }>;

const useLazy = (getModule: DynamicImport, cond = false): React.ReactElement | null => {
  const [AsyncModule, setAsyncModule] = useState(null);
  useEffect(() => {
    (async (): Promise<void> => {
      try {
        if (!cond) {
          return;
        }
        const module = await getModule();
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
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
