import React, { ReactElement, ComponentType } from 'react';

import useAlien, { AlienResult, AlienModule } from './useAlien';

interface WithAlienProps {
  actions: AlienResult['actions'];
}

function WithAlien<P extends object>(
  Component: ComponentType<P>,
  alienModule: AlienModule,
): ReactElement<P & WithAlienProps> | null {
  const alienResult = useAlien(alienModule);

  if (alienResult) {
    return <Component {...(alienResult as P)} />;
  }

  return null;
}

export default WithAlien;
