/* eslint-disable */
import { State } from '~/shared/types/State';
import { Actions } from '~/shared/types/Actions';

type ReducersType = Array<(State, Actions) => {}>;

const reduceReducers = (reducers: ReducersType) => (state: State, action: Actions) => (
  reducers.reduce((result, reducer) => (
    reducer(result, action)
  ), state)
);

export default reduceReducers;
