import React, { ReactElement, ComponentType } from 'react';

import useAlien, { AlienResult, ReduxModule } from './useAlien';

interface WithAlienProps {
  modules: Array<AlienResult>;
}
// TODO: fix this for proper typing and intellisense
// eslint-disable-next-line @typescript-eslint/ban-types
function WithAlien<P extends object>(
  Component: ComponentType<P>,
  reduxModules: Array<() => Promise<ReduxModule<P>>>,
): ReactElement<P & WithAlienProps> | null {
  const alienResult = useAlien(reduxModules);

  if (alienResult.length > 0) {
    return <Component {...({ modules: alienResult } as P)} />;
  }

  return null;
}

export default WithAlien;
