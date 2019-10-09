import React, { useState, useEffect, ReactElement, ElementType } from 'react';

type GetModule = () => Promise<{ default: () => ReactElement }>;

type PropsType = {
  getModule: GetModule;
  children?: ElementType;
};

const LazyComponent = ({ getModule, ...rest }: PropsType): ReactElement | null => {
  const [AsyncModule, setAsyncModule] = useState<(() => ReactElement) | null>(null);

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        const module = await getModule();
        setAsyncModule(() => module.default);
      } catch (err) {
        throw new Error(`LazyComponent error: ${err}`);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (AsyncModule) {
    return <AsyncModule {...rest} />;
  }

  return null;
};

export default LazyComponent;
