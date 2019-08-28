// @flow strict
import React, { useEffect } from 'react';
// $FlowFixMe
import { useDispatch, useSelector } from 'react-redux';

import { fetchProducts } from '@/store/actions';
import { getProducts } from '@/store/reducers/products';
import type { ProductsType } from '@/store/types/ProductsType';

import ProductCard from '@/components/shared/ProductCard/ProductCard';

import './Home.scss';

const Home = () => {
  const dispatch = useDispatch();
  const products: ProductsType = useSelector(getProducts);

  useEffect(() => {
    dispatch(fetchProducts(`/products`));
  }, [dispatch]);

  return (
    <div className="home">
      <h2 className="home__title">Shop</h2>
      <div className="row">
        { products.length && products.map((product) => (
          <div
            // eslint-disable-next-line no-underscore-dangle
            key={product._id}
            className="col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3"
            data-testid="product-card-item"
          >
            <ProductCard
              width="20rem"
              product={product}
            />
          </div>))}
      </div>
    </div>
  );
};

export default Home;
