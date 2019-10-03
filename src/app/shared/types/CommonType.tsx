/* eslint-disable */

export type Response<D> = {
  response: {
    data: D
  }
};

export type ResponseError = { message: string; } | null

export type ActionType<P, M = {}> = {
  type: string,
  payload: P,
  meta?: M,
};
