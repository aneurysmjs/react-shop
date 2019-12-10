import React, { ReactElement } from 'react';

import useAlien, { ReduxModule, AlienResult } from './useAlien';

interface WithAlienProps {
  actions: AlienResult['actions'];
}

function withAlien<T extends WithAlienProps>(
  Component: () => ReactElement<T>,
  getModule: () => Promise<ReduxModule>,
): ReactElement | null {
  const alienResult = useAlien({
    getModule,
  });

  return alienResult ? <Component actions={alienResult.actions} /> : null;
}

export default withAlien;
