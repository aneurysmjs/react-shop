// @flow strict
import React, { Component } from 'react';

import './ProductCard.scss';

type PropsType = {
  product: {
    _id: string,
    name: string,
    image: string,
    imageHovered: string,
    description: string,
    price: number,
    stock: number,
    shop: string,
  },
  hasOverlay: boolean,
  hasHover: boolean,
  width: string,
};

class ProductCart extends Component<PropsType> {

  static defaultProps = {
    width: '29rem'
  };

  handleClick = () => {

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
        <img
          src={product.image}
          alt={product.name}
          onClick="handleClick"
          className="img-fluid product-card__image"
        />
        <img
          data-hovered
          src={product.imageHovered}
          alt={product.name}
          onClick="handleClick"
          className="img-fluid product-card__image--hovered"
        />
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
