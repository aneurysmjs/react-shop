// @flow strict
import footer from './footer';

describe('footer reducer', () => {
  const expectedState = {
    social: [
      {
        icon: 'instagram',
        id: '0',
        link: 'https://instagram.com',
      },
    ],
  };

  it('should return initial state', () => {
    // eslint-disable-next-line no-unused-vars
    const initialState = footer(undefined, { type: '' });

    expect(initialState).toStrictEqual(expectedState);
  });
});
