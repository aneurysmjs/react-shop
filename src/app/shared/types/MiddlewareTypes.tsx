/* eslint-disable */
import { Middleware } from 'redux';
import { State } from '~/shared/types/State';
import { Actions } from '~/shared/types/Actions';

export type ApiMetaType = {
  types: Array<string>,
  callAPI: () => Promise<Response>,
  shouldCallAPI: (State) => boolean,
};

export type ApiMiddlewareType = Middleware<State, Actions>;
