// @flow strict
import React from 'react';
import { shallow } from 'enzyme';

import ProductCard from './ProductCard';
import type { ProductType } from './ProductCard';

describe('ProductCard', () => {
  const product: ProductType = {
    '_id':	'5cc2def690118411e1311e92',
    name: 'Nike Air Jordan',
    image: 'https://static.street-beat.ru/upload/resize_cache/iblock/d69/450_450_1/d699afc7b3428f2f51c2f2de6665b506.jpg',
    imageHovered: 'https://static.street-beat.ru/upload/resize_cache/iblock/fd4/450_450_1/fd4bc310bdf1e7abfc063712bcf54da7.jpg',
    description: 'loorem ipsum solor it samet neque porro',
    price: 8700,
    stock: 4,
    shop: 'Cool Shop',
    user: '5cc2ddd390118411e1311e90',
  };

  it('should have "width", "hasOverlay", and "hasHover" with default values', () => {
    const wrap = shallow(<ProductCard product={product}/>);
    expect(wrap.instance().props.width).toEqual('29rem');
    expect(wrap.instance().props.hasHover).toEqual(false);
    expect(wrap.instance().props.hasOverlay).toEqual(false);
  });
});
