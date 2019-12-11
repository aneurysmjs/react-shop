import React, { ReactElement, ReactNode, ComponentType } from 'react';
import { Store, AnyAction } from 'redux';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';

import alien from './alien';

import withAlien from './withAlien';

let store = {} as Store;

beforeEach(() => {
  store = alien();
});

type WrapperProps = {
  children?: ReactNode;
};

// eslint-disable-next-line react/prop-types
const wrapper: ComponentType<WrapperProps> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

describe('test "withAlien"', () => {
  const reduxModule = {
    reducers: {
      dummy: (state: { name: string } = { name: 'stupid' }, action: AnyAction): typeof state => {
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
  it('should resolve and alien module and add actions to the Component', async () => {
    const Example = (): ReactElement => <div>some component</div>;

    const getModule = (): Promise<typeof reduxModule> => Promise.resolve(reduxModule);

    const { result, waitForNextUpdate } = renderHook(() => withAlien(Example, getModule), {
      wrapper,
    });

    expect(result.current.props).toStrictEqual({});

    await waitForNextUpdate();

    expect(result.current.props.actions).toStrictEqual(reduxModule.actions);
  });
});
