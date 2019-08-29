// @flow strict
import cart from './cart';

describe('cart reducer', () => {
  const expectedState = {
    quantity: 0,
  };

  it('should return initial state', () => {
    const initialState = cart(undefined, { type: '', quantity: 0 });

    expect(initialState).toStrictEqual(expectedState);
  });
});
