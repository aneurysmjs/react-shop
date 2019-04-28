// @flow strict
import React from 'react';
import { shallow } from 'enzyme';

import Footer from './Footer';

describe('Footer test', () => {
  const wrap = shallow(
    <Footer name='Groot' />
  );

  it('tests something', () => {
    shallow(<Footer />);

    expect(wrap.text()).toEqual('Copyright © 2019. All Rights Reserved');
  });
});
