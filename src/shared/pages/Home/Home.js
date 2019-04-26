import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getProducts as getProductsAction } from '@/store/actions';

import ProductCard from '@/components/shared/ProductCard/ProductCard';

import './Home.scss';

type PropsType = {
  setSelectedProduct: string,
  getProducts: (string) => Array<Object>,
};

class Home extends Component<{}> {

  componentDidMount() {
    const { products, getProducts } = this.props;
    if (!products.length) {
      getProducts(`/products`);
    }
  }

  render () {

    const { products } = this.props;

    return (
      <div className='Home d-flex flex-column align-items-center justify-content-center'>
        <h1>Shop</h1>
        <form className="text-center col-md-4">
          <div className="form-group">
            { products.map(product => (<ProductCard product={product} />))}
          </div>
        </form>
        {/* <Link to="products">
          <button type="button" className="btn btn-primary">
            All products
          </button>
        </Link> */}
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
