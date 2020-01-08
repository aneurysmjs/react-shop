import { AnyAction } from 'redux';

interface DummyState {
  name: string;
}

const defaultState = { name: 'some default name' };
// eslint-disable-next-line import/prefer-default-export
export const reduxModule = {
  id: 'test-module',
  reducers: {
    dummy: (state: DummyState = defaultState, action: AnyAction): typeof state => {
      switch (action.type) {
        case 'DUMMY_ACTION':
          return {
            name: action.name,
          };
        default:
          return state;
      }
    },
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
