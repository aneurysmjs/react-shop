/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { ReactNode, ComponentType } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { AnyAction, Store } from 'redux';
import { Provider } from 'react-redux';

import alien from './alien';

import useAlien from './useAlien';

const WRONG_COMPONENT_PATH = './some/wrong/component/path';

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

/**
 * @link https://stackoverflow.com/questions/56085458/testing-custom-hook-with-react-hooks-testing-library-throws-an-error
 */
describe('useAlien', () => {
  const alienModuleMock = {
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

  type AlienModuleType = Promise<typeof alienModuleMock>;

  it('should render "null" at first and then resolve the module', async () => {
    const importAlienModule = {
      getReducers: (): AlienModuleType => Promise.resolve(alienModuleMock),
    };
    const { result, waitForNextUpdate } = renderHook(() => useAlien(importAlienModule), {
      wrapper,
    });

    expect(store.getState()).toEqual({});
    expect(result.current).toEqual(null);

    // THIS is the key to resolve the Promise
    await waitForNextUpdate();

    expect(store.getState()).toEqual({
      dummy: {
        name: 'stupid',
      },
    });

    expect(result.current).toHaveProperty('actions');
    // @ts-ignore - 'actions' is always part of the result
    expect(result.current.actions).toStrictEqual(alienModuleMock.actions);
  });

  it('should throw', async () => {
    const mockDispatch = jest.spyOn(store, 'dispatch');
    const importAlienModule = {
      getReducers: (): AlienModuleType => import(WRONG_COMPONENT_PATH),
      actions: {
        dummyAction: (): AnyAction => ({
          type: 'DUMMY_ACTION',
          payload: {
            name: 'Джеро',
          },
        }),
      },
    };

    const { result, waitForNextUpdate } = renderHook(() => useAlien(importAlienModule), {
      wrapper,
    });

    expect(mockDispatch).toHaveBeenCalledTimes(0);

    await waitForNextUpdate();

    expect(() => {
      expect(result.current).not.toBe(undefined);
    }).toThrow(
      Error(
        `useAlienModule Error: Cannot find module '${WRONG_COMPONENT_PATH}' from 'useAlien.test.tsx'`,
      ),
    );
  });
});
