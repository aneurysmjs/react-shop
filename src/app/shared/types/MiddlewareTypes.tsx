import { Middleware } from 'redux';

export type ApiMetaType = {
  types: Array<string>;
  callAPI: () => Promise<Response>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  shouldCallAPI: (s: any) => boolean;
};

export type ApiMiddlewareType = Middleware;
