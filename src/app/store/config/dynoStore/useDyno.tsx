import { useState, useEffect, ReactElement } from 'react';

import { injectReducers } from '~/store/config/dynoStore';

type ReducerImport<P> = Promise<{ default: P }>;

function useDyno<P>(reducerImport: ReducerImport<P>): void {
  const [AsyncReducer, setAsyncReducer] = useState<null>(null);

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        const reducer = await reducerImport;
        injectReducers(reducer);
        setAsyncReducer(reducer);
      } catch (err) {
        throw new Error(`useDyno error: ${err}`);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useDyno;
