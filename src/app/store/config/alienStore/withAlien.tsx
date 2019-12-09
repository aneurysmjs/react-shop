import React, { ReactElement } from 'react';

import useAlien, { ReduxModule, AlienResult } from './useAlien';

function withAlien<T>(
  Component: ReactElement<{ actions: AlienResult['actions'] }>,
  getModule: () => Promise<ReduxModule>,
): ReactElement | null {
  const alienResult = useAlien({
    getModule,
  });

  return alienResult ? <Component actions={alienResult.actions} /> : null;
}

export default withAlien;
