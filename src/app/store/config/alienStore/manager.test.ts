import { createStore, AnyAction } from 'redux';

import manager from './manager';

type CartType = {
  quantity: number;
};

type AlienState = {
  cart: CartType;
};

describe('manager', () => {
  it('should return an alienManager', () => {
    const alienManager = manager();
    expect(alienManager).toHaveProperty('getReducerMap');
    expect(alienManager).toHaveProperty('injectReducers');
    expect(alienManager).toHaveProperty('removeReducers');
    expect(alienManager).toHaveProperty('rootReducer');
    expect(alienManager).toHaveProperty('setDispatch');
  });

  describe('getReducerMap', () => {
    it('should return empty object if no reducers has been passed', () => {
      const { getReducerMap } = manager();

      const reducerMap = getReducerMap();
      expect(reducerMap).toStrictEqual({});
    });

    it('should return an initilized reducer', () => {
      const initialReducer = {
        initialState: (s = 'default state', action: AnyAction): string => {
          if (action.type === 'INIT') {
            return 'init value';
          }
          return s;
        },
      };
      const { getReducerMap } = manager(initialReducer);
      const reducerMap = getReducerMap();
      expect(reducerMap).toStrictEqual(initialReducer);
    });
  });

  describe('injectReducers', () => {
    it('should inject a new reducer', () => {
      const { getReducerMap, injectReducers } = manager();

      const initReducerMap = getReducerMap();

      expect(initReducerMap).toStrictEqual({});

      const reducer1 = (s = 'reducer1 state', action: AnyAction): string => {
        if (action.type === 'ACTION_1') {
          return 'reducer1 value';
        }
        return s;
      };

      injectReducers('reducer1', reducer1);

      const reducerMap = getReducerMap();

      expect(reducerMap).toStrictEqual({
        reducer1,
      });

      const reducer2 = (s = 'reducer2 state', action: AnyAction): string => {
        if (action.type === 'ACTION_2') {
          return 'reducer2 value';
        }
        return s;
      };

      injectReducers('reducer2', reducer2);

      const finalReducerMap = getReducerMap();

      expect(finalReducerMap).toStrictEqual({
        reducer1,
        reducer2,
      });
    });
  });

  describe('setDispatch', () => {
    it('should set a Redux dispatcher for internal use', () => {
      const store = createStore(() => {});
      const alienManager = manager();
      const setDispatchSpy = jest.spyOn(alienManager, 'setDispatch');

      alienManager.setDispatch(store.dispatch);
      expect(setDispatchSpy).toHaveBeenCalledWith(store.dispatch);
    });
  });
});
