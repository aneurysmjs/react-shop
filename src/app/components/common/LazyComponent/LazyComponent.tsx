import React, { useState, useEffect } from 'react';

type GetModule = () => Promise<{ default: () => React.ReactElement }>;

type PropsType = {
  getModule: GetModule;
  children?: React.ElementType;
};

const LazyComponent = ({ getModule, ...rest }: PropsType): React.ReactElement | null => {
  const [AsyncModule, setAsyncModule] = useState<(() => React.ReactElement) | null>(null);

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
