import React, { ReactElement, ComponentType, ReactNode } from 'react';

import useAlien, { ReduxModule, AlienResult } from './useAlien';

interface WithAlienProps {
  children?: ReactNode;
  actions: AlienResult['actions'];
}

function WithAlien<P extends object>(
  Component: ComponentType<P>,
  getModule: () => Promise<ReduxModule>,
): ReactElement<P & WithAlienProps> | null {
  // it complains just beacause the function doesn't start with Capital case
  // so it thinks it not a React component
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const alienResult = useAlien({
    getModule,
  });

  if (alienResult) {
    return <Component {...(alienResult as P)} />;
  }

  return null;
  // return <Component {...((alienResult && alienResult) as P)} />;
  // return typeof props.children === 'function' ? props.children() : props.children;
}

export default WithAlien;
