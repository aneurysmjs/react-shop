import { AnyAction } from 'redux';

export const initialReducer = {
  someState: (s = 'default state', action: AnyAction): string => {
    if (action.type === 'INIT') {
      return 'init value';
    }
    return s;
  },
};

export const reducer1 = (s = 'reducer1 default state', action: AnyAction): string => {
  if (action.type === 'ACTION_1') {
    return 'reducer1 value';
  }
  return s;
};

export const reducer2 = (s = 'reducer2 default state', action: AnyAction): string => {
  if (action.type === 'ACTION_2') {
    return 'reducer2 value';
  }
  return s;
};

export const reducerA = (s = 'reducerA default state', action: AnyAction): string => {
  if (action.type === 'ACTION_A') {
    return 'reducerA value';
  }
  return s;
};

export const reducerB = (s = 'reducerB default state', action: AnyAction): string => {
  if (action.type === 'ACTION_B') {
    return 'reducerB value';
  }
  return s;
};
