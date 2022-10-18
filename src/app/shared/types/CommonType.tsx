export interface Response<D> {
  response: {
    data: D;
  };
}

export type ErrorMessage = { message: string } | null;

export type ResponseAndError<T> = Response<T> & { error: Error };
