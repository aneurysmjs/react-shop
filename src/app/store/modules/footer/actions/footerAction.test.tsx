/* eslint-disable */

import footerAction from './footerAction';

describe('footer action', () => {
  it('should return the corresponding \'footer\' object', () => {
    const social = [{ id: '0', icon: 'instagram', link: 'https://instagram.com' }];
    const contact = {
      phone: '89189258147',
      email: 'me@shop.com',
    };
    const payload = { footer: { social, contact } };
    const expectedData = { type: 'FOOTER_DATA', payload };
    expect(footerAction(payload)).toEqual(expectedData);
  });
});
