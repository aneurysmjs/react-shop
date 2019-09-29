// @flow strict
import type { State } from '@/shared/types/State';

export type Response<D> = {
  response: {
    data: D
  }
};

export type ResponseError = {
  error: {
    message: string
  }
};

export type ApiMetaType = $Shape<{
  types: Array<string>,
  callAPI: () => Promise<*>,
  shouldCallAPI: (State) => boolean,
}>;

export type ActionType<P, M = {}> = {
  type: string,
  payload: P,
  meta?: M,
};
