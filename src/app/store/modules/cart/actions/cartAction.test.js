// @flow strict

import cartAction from './cartAction';

describe('cartAction action', () => {
  it('should return the quantity', () => {
    const quantity = 0;
    const expectedData = { type: 'CART_DATA', cart: { quantity } };
    expect(cartAction({ quantity })).toEqual(expectedData);
  });
});
