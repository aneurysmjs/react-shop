/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { ReactNode, ComponentType } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { Store } from 'redux';
import { Provider } from 'react-redux';

import alien from './alien';

import useAlien from './useAlien';

import { reduxModule } from './helpers/modules';

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
  type ReduxModuleType = Promise<typeof reduxModule>;

  it('should render "null" at first and then resolve the module', async () => {
    const alienModule = {
      getModule: (): ReduxModuleType => Promise.resolve(reduxModule),
    };
    const { result, waitForNextUpdate } = renderHook(() => useAlien(alienModule), {
      wrapper,
    });

    expect(store.getState()).toEqual({});
    expect(result.current).toEqual(null);

    // THIS is the key to resolve the Promise
    await waitForNextUpdate();

    expect(store.getState()).toEqual({
      dummy: {
        name: 'some random name',
      },
    });

    expect(result.current).toHaveProperty('actions');
    // @ts-ignore - 'actions' is always part of the result
    expect(result.current.actions).toStrictEqual(reduxModule.actions);
  });

  it('should throw', async () => {
    const mockDispatch = jest.spyOn(store, 'dispatch');
    const alienModule = {
      getModule: (): ReduxModuleType => import(WRONG_COMPONENT_PATH),
    };

    const { result, waitForNextUpdate } = renderHook(() => useAlien(alienModule), {
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
