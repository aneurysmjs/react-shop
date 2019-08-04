// @flow strict
import React, { useState, useEffect } from 'react';
import type { Node } from 'react';

type PropsType = {
  getModule: () => Promise<*>,
  children?: Node,
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

export const useLazy = (
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
