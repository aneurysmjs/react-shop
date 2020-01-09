import { AnyAction } from 'redux';

import { reducer1 } from './reducers';

export const reduxModule = {
  reducers: {
    state1: reducer1,
  },
  actions: {
    dummyAction: (): AnyAction => ({
      type: 'DUMMY_ACTION',
      payload: {
        name: 'Джеро',
      },
    }),
  },
};

export const reduxModuleNoReducers = {
  reducers: {},
  actions: {
    dummyAction: (): AnyAction => ({
      type: 'DUMMY_ACTION',
      payload: {
        name: 'Джеро',
      },
    }),
  },
};
