// @flow strict
import React, { Component } from 'react';

import ImgLoader from '@/components/shared/ImgLoader/ImgLoader';
// import spinner from '@/components/shared/ImgLoader/ImgLoader';

import './ProductCard.scss';

export type ProductType = {
  _id: string,
  name: string,
  image: string,
  imageHovered: string,
  description: string,
  price: number,
  stock: number,
  shop: string,
};

type PropsType = {
  product: ProductType,
  hasOverlay: boolean,
  hasHover: boolean,
  width: string,
};

class ProductCart extends Component<PropsType> {

  static defaultProps = {
    width: '29rem',
    hasOverlay: false,
    hasHover: false,
  };

  handleClick = (): ProductType => {
    const { product } = this.props;
    return product;
  };
  
  render() {
    const {
      product,
      hasOverlay,
      width,
    } = this.props;

    return (
      <figure
        className={hasOverlay ? 'product-card--overlay' : 'product-card'}
        style={{
          width,
          margin: '0 auto',
        }}
      >
        {hasOverlay ? <div className="product-card__overlay" /> : null }
        <ImgLoader src={product.image} />
        <figcaption
          className={hasOverlay ? 'product-card__description--overlay' : 'product-card__description'}
        >
          { product.name }
        </figcaption>
      </figure>
    );
  }

}

export default ProductCart;
