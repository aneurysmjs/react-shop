import { FOOTER_DATA } from '~/store/modules/footer/types/actionTypes';

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
    const initialState = footer(undefined, { type: FOOTER_DATA, payload: { social } });

    expect(initialState).toStrictEqual(expectedState);
  });
});
