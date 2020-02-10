import { Middleware } from 'redux';
import { State } from '~/shared/types/State';

export type ApiMetaType<T = Response> = {
  types: Array<string>;
  callAPI(): Promise<T>;
  shouldCallAPI: (s: State) => boolean;
};

export type ApiMiddlewareType = Middleware;
