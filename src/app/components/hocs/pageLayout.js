// @flow strict
import type { AbstractComponent } from 'react';

function pageLayout<Config: {}>(
  Component: AbstractComponent<Config>
): AbstractComponent<Config> {
  return Component;
}

export default pageLayout;
