// @flow strict
import type { Middleware } from 'redux';
import type { State } from '@/shared/types/State';
import type { Actions } from '@/shared/types/Actions';

export type ApiMetaType = $Shape<{
  types: Array<string>,
  callAPI: () => Promise<Response>,
  shouldCallAPI: (State) => boolean,
}>;

export type ApiMiddlewareType = Middleware<State, Actions>;
