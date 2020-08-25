/* eslint-disable no-undef, no-underscore-dangle, @typescript-eslint/no-explicit-any */
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PUBLIC_URL: string;
  }
  /**
   * @desc augment existing NodeJS.Global type definition
   * @link https://stackoverflow.com/questions/40743131/how-to-prevent-property-does-not-exist-on-type-global-with-jsdom-and-t
   *
   * @desc Image for Global scope
   * @link https://stackoverflow.com/questions/25203906/typescript-new-image-from-global-scope
   */
  interface Global {
    Image: {
      prototype: HTMLImageElement;
    };
  }
}

declare interface NodeModule {
  hot: {
    accept(
      dependencies?: Array<string> | string,
      callback?: (updatedDependencies?: Array<string | number>) => void,
    ): void;
  };
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;

  const src: string;
  export default src;
}

declare module '*.module.css' {
  const css: { [key: string]: string };
  export default css;
}

declare module '*.css' {
  export default any;
}

declare const __BROWSER__: boolean;
declare const __SERVER__: boolean;

interface Window {
  browserHistory: any;
  store: any;
  __PRELOADED_STATE__: any;
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
}

declare module 'express-manifest-helpers';
