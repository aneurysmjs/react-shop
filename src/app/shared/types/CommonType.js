// @flow strict

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

export type ActionType<P, M = {}> = {
  type: string,
  payload: P,
  meta?: M,
};
