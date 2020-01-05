import { AnyAction } from 'redux';

// eslint-disable-next-line import/prefer-default-export
export const reduxModule = {
  reducers: {
    dummy: (
      state: { name: string } = { name: 'some random name' },
      action: AnyAction,
    ): typeof state => {
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
