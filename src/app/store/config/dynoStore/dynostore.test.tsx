/* eslint-disable @typescript-eslint/ban-ts-ignore, import/no-named-as-default-member */
import React, { ReactElement } from 'react';
import { createStore as createReduxStore } from 'redux';
import dynoStore, { createStore, reloadStore, injectReducers, withStoreModule } from './dynoStore';

describe('Dyno Store', () => {
  it('should have main methods', () => {
    expect(dynoStore).toHaveProperty('createStore');
    expect(dynoStore).toHaveProperty('reloadStore');
    expect(dynoStore).toHaveProperty('injectReducers');
    expect(dynoStore).toHaveProperty('withStoreModule');
  });

  it('should create and return a Redux store', () => {
    const reduxStore = createReduxStore(() => ({}));
    const store = createStore();
    expect(JSON.stringify(store, null)).toEqual(JSON.stringify(reduxStore, null));
  });

  it('should trigger store\'s "dispatch" when reloading the store', () => {
    const store = createStore();
    const mockDispatch = jest.spyOn(store, 'dispatch');
    reloadStore();
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({ type: '@@DYNO_STORE/RELOAD' });
  });

  it('should add reducer and reload the store', () => {
    const store = createStore();
    const reducer = { INIT_DYNO_STATE: (): {} => ({}) };
    const mockDispatch = jest.spyOn(store, 'dispatch');
    injectReducers(reducer);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({ type: '@@DYNO_STORE/RELOAD' });
  });

  describe('test "withStoreModule"', () => {
    it('should add reducer and reload the store', async () => {
      const Example = (): ReactElement => <div>some component</div>;
      const component = Promise.resolve({ default: Example });
      const reducer = Promise.resolve({ default: { INIT_DYNO_STATE: (): {} => ({}) } });
      const store = createStore();
      const mockDispatch = jest.spyOn(store, 'dispatch');
      const module = await withStoreModule(component, reducer);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({ type: '@@DYNO_STORE/RELOAD' });
      expect(module).toEqual({ default: Example });
    });

    it('should throw if there is an error', async () => {
      expect.assertions(3);
      const store = createStore();
      const mockDispatch = jest.spyOn(store, 'dispatch');
      const errorMessage =
        // eslint-disable-next-line quotes
        "Cannot find module './some/wrong/component/path' from 'dynoStore.test.tsx'";

      /* eslint-disable import/no-unresolved */
      try {
        await withStoreModule(
          // @ts-ignore
          import('./some/wrong/component/path'),
          // @ts-ignore
          import('./some/wrong/reducer/path'),
        );
      } catch (error) {
        expect(error.message).toMatch(errorMessage);
      }
      /* eslint-enable import/no-unresolved */

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({
        type: '@@DYNO_STORE/ERROR',
        payload: errorMessage,
      });
    });
  });
});
