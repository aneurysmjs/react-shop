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

export type Base<T> = {
  isLoading: boolean,
  error: ?{
    message: string
  },
  payload: T,
};
