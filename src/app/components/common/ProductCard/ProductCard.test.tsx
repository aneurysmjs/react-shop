import React from 'react';

import { render, cleanup } from '@testing-library/react';

import ProductCard from './ProductCard';
import { ProductType } from '~/store/modules/products/types';

afterEach(cleanup);

describe('ProductCard', () => {
  const product: ProductType = {
    _id: '5cc2def690118411e1311e92',
    name: 'Nike Air Jordan',
    image:
      'https://static.street-beat.ru/upload/resize_cache/iblock/d69/450_450_1/d699afc7b3428f2f51c2f2de6665b506.jpg',
    imageHovered:
      'https://static.street-beat.ru/upload/resize_cache/iblock/fd4/450_450_1/fd4bc310bdf1e7abfc063712bcf54da7.jpg',
    description: 'loorem ipsum solor it samet neque porro',
    price: 8700,
    stock: 4,
    shop: 'Cool Shop',
  };

  // eslint-disable-next-line prettier/prettier
  it('should default classes without \'hasOverlay\'', () => {
    const { container, queryByTestId, getByText } = render(<ProductCard product={product} />);
    const overlay = queryByTestId('overlay');
    const figCaption = getByText(product.name);
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    expect(container.firstChild.className).toBe('product-card');
    expect(overlay).toBe(null);
    expect(figCaption.className).toBe('product-card__description');
  });

  it('should render overlay content', () => {
    // eslint-disable-next-line max-len
    const { container, queryByTestId, getByText } = render(
      <ProductCard product={product} hasOverlay />,
    );
    const overlay = queryByTestId('overlay') as NonNullable<HTMLElement>;
    const figCaption = getByText(product.name);
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    expect(container.firstChild.className).toEqual('product-card--overlay');
    expect(overlay.className).toBe('product-card__overlay');
    expect(figCaption.className).toBe('product-card__description--overlay');
  });
});
