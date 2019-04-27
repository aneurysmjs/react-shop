import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getProducts as getProductsAction } from '@/store/actions';

import ProductCard from '@/components/shared/ProductCard/ProductCard';

import './Home.scss';

type PropsType = {
  products: Array<Object>,
  getProducts: (string) => Array<Object>,
};

class Home extends Component<PropsType> {

  componentDidMount() {
    const { products, getProducts } = this.props;
    if (!products.length) {
      getProducts(`/products`);
    }
  }

  render () {

    const { products } = this.props;

    return (
      <div className="home">
        <h2 className="home__title">Shop</h2>
        <div className="home__wrapper">
          <div className="home__products">
            { products.map(product => (
              <div 
                key={product.id}
                className="home__product-card"
              >
                <ProductCard
                  width="20rem"
                  product={product}
                />
              </div>)
            )}
          </div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  products: state.products
});

const mapDispatchToProps = (dispatch) => ({
  getProducts(url) {
    dispatch(getProductsAction(url));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
