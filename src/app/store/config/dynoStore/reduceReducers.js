// @flow strict
import type { State } from '@/shared/types/State';
import type { Actions } from '@/shared/types/Actions';

type ReducersType = Array<(State, Actions) => {}>;

const reduceReducers = (reducers: ReducersType) => (state: State, action: Actions) => (
  reducers.reduce((result, reducer) => (
    reducer(result, action)
  ), state)
);

export default reduceReducers;
