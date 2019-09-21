// @flow strict
import type { State } from '@/store/types/State';
import type { Actions } from '@/store/types/Actions';

type ReducersType = Array<($Shape<State>, Actions) => {}>;

const reduceReducers = (reducers: ReducersType) => (state: State, action: Actions) => (
  reducers.reduce((result, reducer) => (
    reducer(result, action)
  ), state)
);

export default reduceReducers;
