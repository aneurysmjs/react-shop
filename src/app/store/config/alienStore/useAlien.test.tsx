/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { renderHook } from '@testing-library/react-hooks';
import { Store } from 'redux';
import path from 'path';

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

  it('should render empty array "[]" at first and then resolve each module', async () => {
    const alienModuleA = (): ReduxModuleAType => Promise.resolve(reduxModuleA);

    const alienModuleB = (): ReduxModuleBType => Promise.resolve(reduxModuleB);

    const reduxModules = [alienModuleA, alienModuleB];

    const { result, waitForNextUpdate } = renderHook(() => useAlien(reduxModules), {
      wrapper,
    });

    expect(store.getState()).toEqual({});
    expect(result.current).toEqual([]);

    // THIS is the key to resolve the Promise
    await waitForNextUpdate();

    expect(store.getState()).toEqual({
      stateA: 'reducerA default state',
      stateB: 'reducerB default state',
    });

    expect(result.current).toHaveLength(2);
    expect(result.current).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'reduxModuleA',
          actions: { ...reduxModuleA.actions },
          selectors: { ...reduxModuleA.selectors },
        }),
        expect.objectContaining({
          id: 'reduxModuleB',
          actions: { ...reduxModuleB.actions },
          selectors: { ...reduxModuleB.selectors },
        }),
      ]),
    );
  });

  it('should call cb when unmounting', async () => {
    const alienModule = (): ReduxModuleType => Promise.resolve(reduxModule);

    const reduxModules = [alienModule];
    const cb = jest.fn();

    const { result, waitForNextUpdate, unmount } = renderHook(() => useAlien(reduxModules, cb), {
      wrapper,
    });

    expect(store.getState()).toEqual({});
    expect(result.current).toEqual([]);

    // THIS is the key to resolve the Promise
    await waitForNextUpdate();

    expect(store.getState()).toEqual({
      state1: 'reducer1 default state',
    });

    expect(result.current).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: reduxModule.id,
          actions: { ...reduxModule.actions },
        }),
      ]),
    );

    unmount();

    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('should throw when a redux module has no "id" or when is empty string', async () => {
    // @ts-ignore - "id" doesn't exist for testing purposes
    const reduxModules = [(): ReduxModuleType => Promise.resolve(reduxModuleNoId)];

    const { result, waitForNextUpdate } = renderHook(() => useAlien(reduxModules), {
      wrapper,
    });

    await waitForNextUpdate();

    expect(() => {
      expect(result.current).not.toBe(undefined);
    }).toThrow(Error('useAlienModule Error: Redux Module has no id'));
  });

  it('should throw when wrong import path', async () => {
    const mockDispatch = jest.spyOn(store, 'dispatch');
    const reduxModules = [(): ReduxModuleType => import(WRONG_COMPONENT_PATH)];

    const { result, waitForNextUpdate } = renderHook(() => useAlien(reduxModules), {
      wrapper,
    });

    expect(mockDispatch).toHaveBeenCalledTimes(0);

    await waitForNextUpdate();

    /**
     * taken from here @link https://stackoverflow.com/a/34696465/5378393
     */
    const relativePath = path.relative(process.cwd(), __dirname);

    expect(() => {
      expect(result.current).not.toBe(undefined);
    }).toThrow(
      /**
       * from Jest 26.0.0 - [jest-resolve] Show relative path from root dir for module not found errors (#9963)
       * @link https://github.com/facebook/jest/pull/9963
       */
      Error(
        `useAlienModule Error: Cannot find module '${WRONG_COMPONENT_PATH}' from '${relativePath}/useAlien.test.tsx'`,
      ),
    );
  });

  it('should throw when redux module has no reducers', async () => {
    type ReduxModuleNoReducersType = Promise<typeof reduxModuleNoReducers>;

    const reduxModules = [(): ReduxModuleNoReducersType => Promise.resolve(reduxModuleNoReducers)];

    const { result, waitForNextUpdate } = renderHook(() => useAlien(reduxModules), {
      wrapper,
    });

    await waitForNextUpdate();

    expect(() => {
      expect(result.current).not.toBe(undefined);
    }).toThrow(Error('useAlienModule Error: Redux Module has no reducers'));
  });
});
