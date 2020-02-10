import cartAction from './cartAction';

describe('cartAction action', () => {
  it('should return cart object', () => {
    const quantity = 0;
    const payload = { cart: { quantity } };
    const expectedData = { type: 'CART_DATA', payload };
    expect(cartAction(payload)).toEqual(expectedData);
  });
});
