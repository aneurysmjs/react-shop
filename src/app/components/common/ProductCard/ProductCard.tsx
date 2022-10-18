import React, { FunctionComponent } from 'react';

import './ProductCard.scss';

type PropsType = {
  hasOverlay: boolean;
  hasHover?: boolean;
  width: string;
};

const ProductCart: FunctionComponent<PropsType> = ({
  hasOverlay = false,
  width = '29rem',
}: PropsType) => {
  return (
    <figure
      className={hasOverlay ? 'product-card--overlay' : 'product-card'}
      style={{
        width,
        margin: '0 auto',
      }}
    >
      {hasOverlay ? <div data-testid="overlay" className="product-card__overlay" /> : null}
      {/* <ImgLoader src={product.image} /> */}
      <figcaption
        className={hasOverlay ? 'product-card__description--overlay' : 'product-card__description'}
      >
        {/* {product.name} */}
      </figcaption>
    </figure>
  );
};

export default ProductCart;
