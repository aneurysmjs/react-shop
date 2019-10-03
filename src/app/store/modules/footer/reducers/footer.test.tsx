/* eslint-disable */
import footer from './footer';

describe('footer reducer', () => {
  const social = [
    {
      icon: 'instagram',
      id: '0',
      link: 'https://instagram.com',
    },
  ];

  const expectedState = {
    social,
  };

  it('should return initial state', () => {
    // eslint-disable-next-line no-unused-vars
    const initialState = footer(undefined, { type: '', payload: { social } });

    expect(initialState).toStrictEqual(expectedState);
  });
});
