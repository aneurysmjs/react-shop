/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { combineReducers, Reducer, AnyAction, Dispatch } from 'redux';

// get the return value if T is a function
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Unpack<T> = T extends (...args: any[]) => infer R ? R : any;

// mapped the types of the reducers to produce state's shape type
type FullStoreShape<T> = {
  [K in keyof T]?: T[K] extends Function ? Unpack<T[K]> : never;
};

type ReducerMapper<U> = Partial<{ [K in keyof Partial<U>]: Reducer<U[K]> }>;

export interface AlienManager<R = {}> {
  getReducerMap: () => ReducerMapper<FullStoreShape<R>>;
  injectReducers: (key: string, reducer: Reducer) => Reducer | void;
  removeReducers: (key: string) => void;
  rootReducer: Reducer;
  setDispatch: (storeDispatch: Dispatch<AnyAction>) => void;
}

type AlienDispatch = Dispatch<AnyAction> | null;

export default function manager<State>(initialReducers?: State): AlienManager<State> {
  type StoreShape = FullStoreShape<State>;

  type ReducerMap = ReducerMapper<StoreShape>;

  const fallback = (): {} => ({});

  let dispatch: AlienDispatch = null;

  const reducerMap: ReducerMap = initialReducers ? { ...initialReducers } : {};
  // @ts-ignore "combineReducers" doesn't have that overload match
  let combinedReducer = initialReducers ? combineReducers(reducerMap) : fallback;

  let keysToRemove: Array<string> = [];

  function setDispatch(storeDispatch: Dispatch<AnyAction>): void {
    dispatch = storeDispatch;
  }

  function getReducerMap(): ReducerMap {
    return reducerMap;
  }

  function injectReducers(key: string, reducer: Reducer): Reducer | void {
    if (!key || reducerMap[key]) {
      return;
    }

    reducerMap[key] = reducer;
    // @ts-ignore "combineReducers" doesn't have that overload match
    combinedReducer = combineReducers(reducerMap);
    if (dispatch) {
      dispatch({ type: '@@ALIEN_STORE/RELOAD' });
    }
  }

  function removeReducers(key: string): void {
    if (!key || !reducerMap[key]) {
      return;
    }

    delete reducerMap[key];

    keysToRemove.push(key);
    // @ts-ignore "combineReducers" doesn't have that overload match
    combinedReducer = combineReducers(reducerMap);
  }

  // this is what we give to create the Redux store
  function rootReducer(state: StoreShape, action: AnyAction): Reducer {
    let tempState = state;
    if (keysToRemove.length > 0) {
      tempState = { ...state };
      // eslint-disable-next-line no-restricted-syntax
      for (const key of keysToRemove) {
        delete tempState[key];
      }
      keysToRemove = [];
    }

    // Delegate to the combined reducer
    return combinedReducer(state, action);
  }

  return {
    getReducerMap,
    injectReducers,
    removeReducers,
    rootReducer,
    setDispatch,
  };
}