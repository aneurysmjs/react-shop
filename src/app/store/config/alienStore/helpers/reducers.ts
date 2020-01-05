import { AnyAction } from 'redux';

export const initialReducer = {
  state: (s = 'default state', action: AnyAction): string => {
    if (action.type === 'INIT') {
      return 'init value';
    }
    return s;
  },
};

export const reducer1 = (s = 'reducer1 state', action: AnyAction): string => {
  if (action.type === 'ACTION_1') {
    return 'reducer1 value';
  }
  return s;
};

export const reducer2 = (s = 'reducer2 state', action: AnyAction): string => {
  if (action.type === 'ACTION_2') {
    return 'reducer2 value';
  }
  return s;
};
