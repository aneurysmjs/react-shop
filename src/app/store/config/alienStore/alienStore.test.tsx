/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { ReactElement } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { AnyAction } from 'redux';
import alienStore, {
  createStore,
  getReducerMap,
  injectReducers,
  reloadStore,
  useAlienModule,
  withStoreModule,
} from './alienStore';

const WRONG_COMPONENT_PATH = './some/wrong/component/path';

describe('alienStore', () => {
  it('should have main methods', () => {
    expect(alienStore).toHaveProperty('createStore');
    expect(alienStore).toHaveProperty('getReducerMap');
    expect(alienStore).toHaveProperty('injectReducers');
    expect(alienStore).toHaveProperty('reloadStore');
    expect(alienStore).toHaveProperty('useAlienModule');
    expect(alienStore).toHaveProperty('withStoreModule');
  });

  describe('create store', () => {
    it('should create store with an default reducer', () => {
      const store = createStore(undefined);
      expect(store.getState()).toEqual({ defaultState: 'default state value' });
    });

    it('should create store with an initial reducer', () => {
      const initialReducer = {
        init: (s = 'default state', action: AnyAction): string => {
          if (action.type === 'INIT') {
            return 'init value';
          }
          return s;
        },
      };
      const store = createStore(initialReducer);
      store.dispatch({
        type: 'INIT',
      });
      expect(store.getState()).toEqual({ init: 'init value' });
    });

    it('should trigger store\'s "dispatch" when reloading the store', () => {
      const store = createStore(undefined);
      const mockDispatch = jest.spyOn(store, 'dispatch');
      reloadStore();
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({ type: '@@ALIEN_STORE/RELOAD' });
    });
  });

  describe('getReducerMap', () => {
    it('should return the current reducers which is just the default', () => {
      const initialReducer = {
        defaultState: (): string => 'default state value',
      };
      createStore(undefined);
      const currentReducers = getReducerMap();
      /**
       * @desc since Object equality fails when object contains a function
       *
       * this spec fails:
       * it("can't compare functions", () => {
       *   expect(() => {}).toEqual(() => {});
       * });
       *
       * Because functions are compared via reference equality
       * it('does reference equality', ()  => {
       *   const fn = function() {};
       *   expect(fn).toEqual(fn);
       * });
       *
       */
      // so just compare by their keys at least
      expect(Object.keys(currentReducers)).toEqual(Object.keys(initialReducer));
    });
    it('should return the current reducers also when they are given', () => {
      const initialReducers = {
        reducer1: (): string => 'reducer1 value',
        reducer2: (): string => 'reducer1 value',
      };
      createStore(initialReducers);
      const currentReducers = getReducerMap();
      expect(Object.keys(currentReducers)).toEqual(Object.keys(initialReducers));
    });
  });
  describe('injectReducers', () => {
    it('should add reducer and reload the store', () => {
      const store = createStore(undefined);
      const reducer = { OTHER_REDUCER: (): {} => ({}) };
      const mockDispatch = jest.spyOn(store, 'dispatch');
      injectReducers(reducer);
      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({ type: '@@ALIEN_STORE/RELOAD' });
    });

    it('should not add an already existing reducer', () => {
      const store = createStore(undefined);
      const reducer = { defaultState: (): string => 'default state value' };
      const mockDispatch = jest.spyOn(store, 'dispatch');
      injectReducers(reducer);
      expect(mockDispatch).toHaveBeenCalledTimes(0);
      expect(mockDispatch).not.toHaveBeenCalledWith({ type: '@@ALIEN_STORE/RELOAD' });
    });
  });

  describe('test "withStoreModule"', () => {
    it('should add reducer and reload the store', async () => {
      const Example = (): ReactElement => <div>some component</div>;
      const component = Promise.resolve({ default: Example });
      const reducer = Promise.resolve({ default: { INIT_REDUCER: (): {} => ({}) } });
      const store = createStore(undefined);
      const mockDispatch = jest.spyOn(store, 'dispatch');
      const module = await withStoreModule(component, reducer);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({ type: '@@ALIEN_STORE/RELOAD' });
      expect(module).toEqual({ default: Example });
    });

    it('should throw if there is an error', async () => {
      expect.assertions(3);
      const store = createStore(undefined);
      const mockDispatch = jest.spyOn(store, 'dispatch');
      const errorMessage =
        // eslint-disable-next-line quotes
        `Cannot find module '${WRONG_COMPONENT_PATH}' from 'alienStore.test.tsx'`;

      /* eslint-disable import/no-unresolved */
      try {
        await withStoreModule(
          // @ts-ignore
          import(WRONG_COMPONENT_PATH),
          // @ts-ignore
          import('./some/wrong/reducer/path'),
        );
      } catch (error) {
        expect(error.message).toMatch(errorMessage);
      }
      /* eslint-enable import/no-unresolved */

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: '@@ALIEN_STORE/ERROR',
        payload: errorMessage,
      });
    });
  });

  /**
   * @link https://stackoverflow.com/questions/56085458/testing-custom-hook-with-react-hooks-testing-library-throws-an-error
   */
  describe('test "useAlienModule"', () => {
    const alienModuleMock = {
      reducers: {
        dummy: (state: { name: string }, action: AnyAction): typeof state => {
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

    type AlienModuleType = Promise<{ default: typeof alienModuleMock }>;

    it('should render "null" at first and then resolve the module', async () => {
      const store = createStore(undefined);
      const mockDispatch = jest.spyOn(store, 'dispatch');
      const importAlienModule = (): AlienModuleType =>
        Promise.resolve({ default: alienModuleMock });
      const { result, waitForNextUpdate } = renderHook(() => useAlienModule(importAlienModule));

      expect(mockDispatch).toHaveBeenCalledTimes(0);
      expect(result.current).toEqual(null);

      // THIS is the key to resolve the Promise
      await waitForNextUpdate();

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({ type: '@@ALIEN_STORE/RELOAD' });
      expect(result.current).toEqual({ default: alienModuleMock });
    });

    it('should throw', async () => {
      const store = createStore(undefined);
      const mockDispatch = jest.spyOn(store, 'dispatch');
      // @ts-ignore
      const importAlienModule = (): AlienModuleType => import(WRONG_COMPONENT_PATH); // eslint-disable-line import/no-unresolved

      const { result, waitForNextUpdate } = renderHook(() => useAlienModule(importAlienModule));

      expect(mockDispatch).toHaveBeenCalledTimes(0);

      await waitForNextUpdate();

      expect(() => {
        expect(result.current).not.toBe(undefined);
      }).toThrow(
        Error(
          `useAlienModule Error: Cannot find module '${WRONG_COMPONENT_PATH}' from 'alienStore.test.tsx'`,
        ),
      );
    });
  });
});
