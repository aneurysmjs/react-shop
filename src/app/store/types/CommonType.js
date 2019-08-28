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
