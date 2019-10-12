/* eslint-disable import/no-named-as-default-member */
import { createStore as createReduxStore } from 'redux';
import dynoStore, { createStore, reloadStore, injectReducers } from './dynoStore';

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
});
