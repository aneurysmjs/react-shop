// @flow strict
import React, { Component } from 'react';

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
        class={hasOverlay ? 'product-card--overlay' : 'product-card'}
        style={{
          width,
          margin: '0 auto',
        }}
      >
        <div
          v-if="hasOverlay"
          class="product-card__overlay"
        />
        <img
          src={product.image}
          alt={product.name}
          onClick="handleClick"
          class="img-fluid product-card__image"
        />
        <figcaption
          class={hasOverlay ? 'product-card__description--overlay' : 'product-card__description'}
        >
          { product.name }
        </figcaption>
      </figure>
    );
  }

}

export default ProductCart;
