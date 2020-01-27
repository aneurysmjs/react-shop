import React, { ReactElement, ComponentType } from 'react';

import useAlien, { AlienResult, ReduxModule } from './useAlien';

interface WithAlienProps {
  modules: Array<AlienResult>;
}

function WithAlien<P extends object>(
  Component: ComponentType<P>,
  reduxModules: Array<() => Promise<ReduxModule<P>>>,
): ReactElement<P & WithAlienProps> | null {
  const alienResult = useAlien(reduxModules);

  if (alienResult) {
    // return <Component {(alienResult as P)} />;
    return <Component modules={alienResult as P} />;
  }

  return null;
}

export default WithAlien;
