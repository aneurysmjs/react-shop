// @flow strict

import footerData from './footerData';

import type { FooterType } from '@/store/types/FooterType';

describe('footerData action', () => {
  it('should return the corresponding \'footer\' object', () => {
    const social = [{ id: '0', icon: 'instagram', link: 'https://instagram.com' }];
    const contact = {
      phone: '89189258147',
      email: 'me@shop.com',
    };
    const expectedData: FooterType = { type: 'FOOTER_DATA', footer: { social, contact } };
    expect(footerData({ social, contact })).toEqual(expectedData);
  });
});
