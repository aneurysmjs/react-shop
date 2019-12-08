import React, { ComponentType, useEffect } from 'react';

import useAlien from './useAlien';

function withAlien<T>(Component: ComponentType, getModule): ComponentType | null {
  const alienResult = useAlien<ReturnType<getModule>>({
    getModule,
  });

  return alienResult ? <Component actions={alienResult.actions} /> : null;
}

export default withAlien;
