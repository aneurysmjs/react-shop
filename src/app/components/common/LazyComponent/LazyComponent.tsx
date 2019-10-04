import React, { useState, useEffect } from 'react';

type PropsType = {
  getModule: () => Promise<any>;
  children?: any;
};

const LazyComponent = ({ getModule, ...rest }: PropsType) => {
  const [AsyncModule, setAsyncModule] = useState(null);

  useEffect(() => {
    (async () => {
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
