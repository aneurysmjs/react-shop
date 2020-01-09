/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { renderHook } from '@testing-library/react-hooks';
import { Store } from 'redux';

import alien from './alien';

import useAlien from './useAlien';

import { reduxModule, reduxModuleNoReducers } from './helpers/modules';
import { withProvider, WrapperType } from './helpers/withProvider';

const WRONG_COMPONENT_PATH = './some/wrong/component/path';

let store = {} as Store;

let wrapper: WrapperType;

beforeEach(() => {
  store = alien();
  wrapper = withProvider(store);
});

/**
 * @link https://stackoverflow.com/questions/56085458/testing-custom-hook-with-react-hooks-testing-library-throws-an-error
 */
describe('useAlien', () => {
  type ReduxModuleType = Promise<typeof reduxModule>;

  it('should render "null" at first and then resolve the module', async () => {
    const alienModule = {
      id: 'some-alien-module',
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
      state1: 'reducer1 default state',
    });

    expect(result.current).toHaveProperty('actions');
    // @ts-ignore - 'actions' is always part of the result
    expect(result.current.actions).toStrictEqual(reduxModule.actions);
  });

  it('should call cb when unmounting', async () => {
    const alienModule = {
      id: 'some-alien-module',
      getModule: (): ReduxModuleType => Promise.resolve(reduxModule),
    };

    const cb = jest.fn();

    const { result, waitForNextUpdate, unmount } = renderHook(() => useAlien(alienModule, cb), {
      wrapper,
    });

    expect(store.getState()).toEqual({});
    expect(result.current).toEqual(null);

    // THIS is the key to resolve the Promise
    await waitForNextUpdate();

    expect(store.getState()).toEqual({
      state1: 'reducer1 default state',
    });

    expect(result.current).toHaveProperty('actions');
    // @ts-ignore - 'actions' is always part of the result
    expect(result.current.actions).toStrictEqual(reduxModule.actions);

    unmount();

    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('should throw when alien module has no "id"', async () => {
    const alienModule = {
      getModule: (): ReduxModuleType => Promise.resolve(reduxModule),
    };

    // @ts-ignore - "id" doesn't exist for testing purposes
    const { result } = renderHook(() => useAlien(alienModule), {
      wrapper,
    });

    // here there's no need to resolve the promise cuz it doesn't even get to be called
    // await waitForNextUpdate();

    expect(() => {
      expect(result.current).not.toBe(undefined);
    }).toThrow(Error('useAlienModule Error: Alien Module has no id'));
  });

  it('should throw when wrong import path', async () => {
    const mockDispatch = jest.spyOn(store, 'dispatch');
    const alienModule = {
      id: 'some-alien-module',
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

  it('should throw when redux module has no reducers', async () => {
    type ReduxModuleNoReducersType = Promise<typeof reduxModuleNoReducers>;

    const alienModule = {
      id: 'some-alien-module',
      getModule: (): ReduxModuleNoReducersType => Promise.resolve(reduxModuleNoReducers),
    };

    const { result, waitForNextUpdate } = renderHook(() => useAlien(alienModule), {
      wrapper,
    });

    await waitForNextUpdate();

    expect(() => {
      expect(result.current).not.toBe(undefined);
    }).toThrow(Error('useAlienModule Error: Redux Module has no reducers'));
  });
});
