import React, { ReactElement, ComponentType } from 'react';

import useAlien, { ReduxModule, AlienResult } from './useAlien';

interface WithAlienProps {
  actions: AlienResult['actions'];
}

function withAlien<P extends object>(
  Component: ComponentType<P>,
  getModule: () => Promise<ReduxModule>,
): ReactElement<P & WithAlienProps> | null {
  // it complains just beacause the function doesn't start with Capital case
  // so it thinks it not a React component
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const alienResult = useAlien({
    getModule,
  });

  return <Component {...((alienResult && alienResult) as P)} />;
}

export default withAlien;
