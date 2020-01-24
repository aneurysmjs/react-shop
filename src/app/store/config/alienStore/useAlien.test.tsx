/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { renderHook } from '@testing-library/react-hooks';
import { Store } from 'redux';

import alien from './alien';

import useAlien from './useAlien';

import {
  reduxModule,
  reduxModuleNoId,
  reduxModuleNoReducers,
  reduxModuleA,
  reduxModuleB,
} from './helpers/modules';
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
  type ReduxModuleAType = Promise<typeof reduxModuleA>;
  type ReduxModuleBType = Promise<typeof reduxModuleB>;

  it('should render "null" at first and then resolve each module', async () => {
    const alienModuleA = (): ReduxModuleAType => Promise.resolve(reduxModuleA);

    const alienModuleB = (): ReduxModuleBType => Promise.resolve(reduxModuleB);

    const { result, waitForNextUpdate } = renderHook(() => useAlien([alienModuleA, alienModuleB]), {
      wrapper,
    });

    expect(store.getState()).toEqual({});
    expect(result.current).toEqual(null);

    // THIS is the key to resolve the Promise
    await waitForNextUpdate();

    expect(store.getState()).toEqual({
      stateA: 'reducerA default state',
      stateB: 'reducerB default state',
    });

    expect(result.current).toHaveProperty('actions');
    // @ts-ignore - 'actions' is always part of the result
    expect(result.current.actions).toStrictEqual({
      ...reduxModuleA.actions,
      ...reduxModuleB.actions,
    });
  });

  it('should call cb when unmounting', async () => {
    const alienModule = (): ReduxModuleType => Promise.resolve(reduxModule);

    const cb = jest.fn();

    const { result, waitForNextUpdate, unmount } = renderHook(() => useAlien([alienModule], cb), {
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

  it('should throw when a redux module has no "id" or when is empty string', async () => {
    // @ts-ignore - "id" doesn't exist for testing purposes
    const alienModule = (): ReduxModuleType => Promise.resolve(reduxModuleNoId);

    const { result, waitForNextUpdate } = renderHook(() => useAlien([alienModule]), {
      wrapper,
    });

    await waitForNextUpdate();

    expect(() => {
      expect(result.current).not.toBe(undefined);
    }).toThrow(Error('useAlienModule Error: Redux Module has no id'));
  });

  it('should throw when wrong import path', async () => {
    const mockDispatch = jest.spyOn(store, 'dispatch');
    const alienModule = (): ReduxModuleType => import(WRONG_COMPONENT_PATH);

    const { result, waitForNextUpdate } = renderHook(() => useAlien([alienModule]), {
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

    const alienModule = (): ReduxModuleNoReducersType => Promise.resolve(reduxModuleNoReducers);

    const { result, waitForNextUpdate } = renderHook(() => useAlien([alienModule]), {
      wrapper,
    });

    await waitForNextUpdate();

    expect(() => {
      expect(result.current).not.toBe(undefined);
    }).toThrow(Error('useAlienModule Error: Redux Module has no reducers'));
  });
});
