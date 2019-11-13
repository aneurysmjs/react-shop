import { AnyAction } from 'redux';

import alien from './alien';

type CartType = {
  quantity: number;
};

type AlienState = {
  cart: CartType;
};

const preloadedState: AlienState = {
  cart: {
    quantity: 30,
  },
};

describe('alienStore', () => {
  it('should return a redux store', () => {
    const store = alien();

    expect(store).toHaveProperty('dispatch');
    expect(store).toHaveProperty('getState');
    expect(store).toHaveProperty('replaceReducer');
    expect(store).toHaveProperty('subscribe');
  });
  it('should return a store with no state', () => {
    const store = alien();

    const state = store.getState();

    expect(state).toStrictEqual({});
  });

  it('should return a store with state derived from a reducer', () => {
    const initialReducer = {
      initialState: (s = 'default state', action: AnyAction): string => {
        if (action.type === 'INIT') {
          return 'init value';
        }
        return s;
      },
    };
    const store = alien<typeof initialReducer>(initialReducer);

    const state = store.getState();

    expect(state).toStrictEqual({
      initialState: 'default state',
    });
  });

  it('should return a store with preloaded state', () => {
    const reducers = {
      cart: (state = {}): {} => state,
    };
    const store = alien(reducers, preloadedState);

    const state = store.getState();

    expect(state).toStrictEqual({
      cart: {
        quantity: 30,
      },
    });
  });
});
