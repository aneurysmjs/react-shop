import { Reducer } from 'redux';

// get the return value if T is a function
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Unpack<T> = T extends (...args: any[]) => infer R ? R : any;

// mapped the types of the reducers to produce state's shape type
export type FullStoreShape<T> = {
  [K in keyof T]?: T[K] extends Function ? Unpack<T[K]> : never;
};

export type ReducerMapper<U> = Partial<{ [K in keyof Partial<U>]: Reducer<U[K]> }>;
