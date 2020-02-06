import { Action as ReduxAction } from 'redux';

export interface Response<D> {
  response: {
    data: D;
  };
}

export type ErrorMessage = { message: string } | null;

export type ResponseAndError<T> = Response<T> & { error: Error };

export interface Action<P, M = {}> extends ReduxAction {
  payload: P;
  meta?: M;
}

export interface ActionCreator<P, M = {}> {
  (payload: P, meta?: M): Action<P, M>;
}
