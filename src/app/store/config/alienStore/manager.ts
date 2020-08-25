import { AnyAction, combineReducers, Dispatch, Reducer } from 'redux';

import { FullStoreShape, ReducerMapper } from './types/alienStore';

// eslint-disable-next-line @typescript-eslint/ban-types
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

  // eslint-disable-next-line @typescript-eslint/ban-types
  const fallback = (): {} => ({});

  let dispatch: AlienDispatch = null;

  const reducerMap: ReducerMap = initialReducers ? { ...initialReducers } : {};
  // TODO: fix this for proper typing and intellisense
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
    // TODO: fix this for proper typing and intellisense
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
    // TODO: fix this for proper typing and intellisense
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
