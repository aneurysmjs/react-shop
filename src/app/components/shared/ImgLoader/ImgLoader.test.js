// @flow strict

import React from 'react';
import { shallow } from 'enzyme';

import ImgLoader from './ImgLoader';

describe('ImgLoader', () => {
  it('tests something', () => {
    const src = 'https://static.street-beat.ru/upload/resize_cache/iblock/d69/450_450_1/d699afc7b3428f2f51c2f2de6665b506.jpg';
    shallow(<ImgLoader src={src} />);
  });
});
