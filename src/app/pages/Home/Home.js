// @flow strict
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// $FlowFixMe
import { connect } from 'react-redux';

import type { ProductsType } from '@/store/types/ProductsType';

import { fetchProducts as fetchProductsAction } from '@/store/actions';

import ProductCard from '@/components/shared/ProductCard/ProductCard';

import './Home.scss';

type PropsType = {
  products: ProductsType,
  fetchProducts(string): void
};

class Home extends Component<PropsType> {
  componentDidMount() {
    const { products, fetchProducts } = this.props;
    if (!products.length) {
      fetchProducts(`/products`);
    }
  }

  render() {
    const { products } = this.props;

    return (
      <div className="home">
        <h2 className="home__title">Shop</h2>
        <div className="home__wrapper">
          <div className="row">
            { products.map(product => (
              <div
                // eslint-disable-next-line no-underscore-dangle
                key={product._id}
                className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3"
              >
                <ProductCard
                  width="20rem"
                  product={product}
                />
              </div>))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products,
});

const mapDispatchToProps = {
  fetchProducts: fetchProductsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
