import { AnyAction } from 'redux';

import { reducer1 } from './reducers';

export const reduxModule = {
  id: 'test-module',
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
  id: 'redux-module-no-reducers',
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
