import { Middleware } from 'redux';
import { State } from '~/store/State';

export type ApiMetaType<T = Response> = {
  types: Array<string>;
  callAPI(): Promise<T>;
  shouldCallAPI: (s: State) => boolean;
};

export type ApiMiddlewareType = Middleware;
